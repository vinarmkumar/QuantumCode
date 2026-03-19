const Contest = require('../models/contest');
const Problem = require('../models/problem');
const User = require('../models/user');
const axios = require('axios');
const { getLanguageById, submitBatch, submitToken } = require('../utils/judge0');

// Generate random room code
const generateRoomCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
};

// Create a new contest room
const createContestRoom = async (req, res) => {
    try {
        const userId = req.result._id;
        const user = await User.findById(userId);

        // Generate unique room code
        let roomCode;
        let isDuplicate = true;
        while (isDuplicate) {
            roomCode = generateRoomCode();
            const existing = await Contest.findOne({ roomCode });
            isDuplicate = !!existing;
        }

        // Get random problem
        const problems = await Problem.find().skip(Math.floor(Math.random() * await Problem.countDocuments()));
        const problem = problems[0] || await Problem.findOne();

        if (!problem) {
            return res.status(404).json({ success: false, message: 'No problems available' });
        }

        const contest = new Contest({
            roomCode,
            player1: {
                userId,
                username: user.firstname + ' ' + user.lastname
            },
            problem: problem._id,
            problemTitle: problem.title,
            difficulty: problem.difficulty,
            status: 'waiting'
        });

        await contest.save();

        res.json({
            success: true,
            roomCode,
            contest: {
                roomCode: contest.roomCode,
                timeLimit: contest.timeLimit,
                problem,
                player1: contest.player1,
                status: contest.status
            }
        });
    } catch (err) {
        console.error('Error creating contest room:', err);
        res.status(500).json({ success: false, message: 'Error creating room', error: err.message });
    }
};

// Join contest room
const joinContestRoom = async (req, res) => {
    try {
        const { roomCode } = req.body;
        const userId = req.result._id;
        const user = await User.findById(userId);

        const contest = await Contest.findOne({ roomCode });

        if (!contest) {
            return res.status(404).json({ success: false, message: 'Room not found' });
        }

        if (contest.status !== 'waiting') {
            return res.status(400).json({ success: false, message: 'Contest already started or completed' });
        }

        if (contest.player2?.userId) {
            return res.status(400).json({ success: false, message: 'Room is full' });
        }

        // Update player2
        contest.player2 = {
            userId,
            username: user.firstname + ' ' + user.lastname
        };
        contest.status = 'active';
        contest.timeStarted = new Date();

        await contest.save();

        const populatedContest = await Contest.findById(contest._id).populate('problem');

        res.json({
            success: true,
            message: 'Joined successfully',
            contest: {
                roomCode: populatedContest.roomCode,
                timeLimit: populatedContest.timeLimit,
                timeStarted: populatedContest.timeStarted,
                problem: populatedContest.problem,
                player1: populatedContest.player1,
                player2: populatedContest.player2,
                status: populatedContest.status
            }
        });
    } catch (err) {
        console.error('Error joining room:', err);
        res.status(500).json({ success: false, message: 'Error joining room', error: err.message });
    }
};

// Get contest by room code
const getContestByRoomCode = async (req, res) => {
    try {
        const { roomCode } = req.params;
        const contest = await Contest.findOne({ roomCode }).populate('problem');

        if (!contest) {
            return res.status(404).json({ success: false, message: 'Room not found' });
        }

        res.json({
            success: true,
            contest
        });
    } catch (err) {
        console.error('Error fetching contest:', err);
        res.status(500).json({ success: false, message: 'Error fetching contest', error: err.message });
    }
};

// Submit code
const submitCode = async (req, res) => {
    try {
        const { roomCode, playerId, code, language } = req.body;
        const userId = req.result._id;

        const contest = await Contest.findOne({ roomCode });

        if (!contest) {
            return res.status(404).json({ success: false, message: 'Contest not found' });
        }

        // Determine which player
        const isPlayer1 = contest.player1.userId.toString() === userId.toString();
        if (!isPlayer1 && (!contest.player2 || contest.player2.userId.toString() !== userId.toString())) {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }

        const playerKey = isPlayer1 ? 'player1' : 'player2';
        contest[playerKey].code = code;
        contest[playerKey].language = language;
        contest[playerKey].isSubmitted = true;
        contest[playerKey].submittedAt = new Date();

        await contest.save();

        res.json({
            success: true,
            message: 'Code submitted',
            contest
        });
    } catch (err) {
        console.error('Error submitting code:', err);
        res.status(500).json({ success: false, message: 'Error submitting code', error: err.message });
    }
};

// End contest and determine winner
const endContest = async (req, res) => {
    try {
        const { roomCode } = req.params;
        const userId = req.result._id;

        const contest = await Contest.findOne({ roomCode });

        if (!contest) {
            return res.status(404).json({ success: false, message: 'Contest not found' });
        }

        contest.status = 'completed';
        contest.timeEnded = new Date();

        // Determine winner based on who submitted first
        if (contest.player1.isSubmitted && !contest.player2.isSubmitted) {
            contest.winner = 'player1';
            contest.winnerUserId = contest.player1.userId;
            contest.player1.points = 50;
        } else if (contest.player2.isSubmitted && !contest.player1.isSubmitted) {
            contest.winner = 'player2';
            contest.winnerUserId = contest.player2.userId;
            contest.player2.points = 50;
        } else if (contest.player1.isSubmitted && contest.player2.isSubmitted) {
            // Both submitted - check who submitted first (already stored in submittedAt)
            const time1 = new Date(contest.player1.submittedAt).getTime();
            const time2 = new Date(contest.player2.submittedAt).getTime();

            // New winner logic based on test cases
            const p1Passed = contest.player1.passedTestCases || 0;
            const p2Passed = contest.player2.passedTestCases || 0;
            const p1Total = contest.player1.totalTestCases || 0;
            const p2Total = contest.player2.totalTestCases || 0;

            // If one player passed all test cases
            if (p1Passed === p1Total && p1Total > 0 && (p2Passed !== p2Total || p2Total === 0)) {
                contest.winner = 'player1';
                contest.winnerUserId = contest.player1.userId;
                contest.player1.points = 50;
                contest.player2.points = p2Passed > 0 ? 25 : 10;
            } else if (p2Passed === p2Total && p2Total > 0 && (p1Passed !== p1Total || p1Total === 0)) {
                contest.winner = 'player2';
                contest.winnerUserId = contest.player2.userId;
                contest.player2.points = 50;
                contest.player1.points = p1Passed > 0 ? 25 : 10;
            } else if (p1Passed === p1Total && p2Passed === p2Total && p1Total > 0) {
                // Both passed all test cases - first to submit wins
                if (time1 < time2) {
                    contest.winner = 'player1';
                    contest.winnerUserId = contest.player1.userId;
                    contest.player1.points = 50;
                    contest.player2.points = 25;
                } else {
                    contest.winner = 'player2';
                    contest.winnerUserId = contest.player2.userId;
                    contest.player2.points = 50;
                    contest.player1.points = 25;
                }
            } else if (p1Passed > p2Passed) {
                // More test cases passed
                contest.winner = 'player1';
                contest.winnerUserId = contest.player1.userId;
                contest.player1.points = 50;
                contest.player2.points = 25;
            } else if (p2Passed > p1Passed) {
                contest.winner = 'player2';
                contest.winnerUserId = contest.player2.userId;
                contest.player2.points = 50;
                contest.player1.points = 25;
            } else {
                // Same number of test cases passed - first to submit wins
                if (time1 < time2) {
                    contest.winner = 'player1';
                    contest.winnerUserId = contest.player1.userId;
                    contest.player1.points = 50;
                    contest.player2.points = 25;
                } else {
                    contest.winner = 'player2';
                    contest.winnerUserId = contest.player2.userId;
                    contest.player2.points = 50;
                    contest.player1.points = 25;
                }
            }
        } else {
            contest.winner = 'draw';
            contest.player1.points = 10;
            contest.player2.points = 10;
        }

        await contest.save();

        res.json({
            success: true,
            message: 'Contest ended',
            winner: contest.winner,
            contest
        });
    } catch (err) {
        console.error('Error ending contest:', err);
        res.status(500).json({ success: false, message: 'Error ending contest', error: err.message });
    }
};

// Run test cases for submitted code
const runTestCases = async (req, res) => {
    try {
        const { roomCode, code, language } = req.body;
        const userId = req.result._id;

        const contest = await Contest.findOne({ roomCode }).populate('problem');

        if (!contest) {
            return res.status(404).json({ success: false, message: 'Contest not found' });
        }

        // Determine which player
        const isPlayer1 = contest.player1.userId.toString() === userId.toString();
        if (!isPlayer1 && (!contest.player2 || contest.player2.userId.toString() !== userId.toString())) {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }

        const playerKey = isPlayer1 ? 'player1' : 'player2';
        const problem = contest.problem;

        // Get language ID for Judge0
        const languageId = getLanguageById(language);
        if (!languageId) {
            return res.status(400).json({ success: false, message: 'Unsupported language' });
        }

        // Use visible test cases (examples)
        const testCases = problem.examples && problem.examples.length > 0 ? problem.examples : [];
        
        if (testCases.length === 0) {
            return res.status(400).json({ success: false, message: 'No test cases available' });
        }

        // Prepare submissions for Judge0
        const submissions = testCases.map(({ input, output }) => ({
            source_code: code,
            language_id: languageId,
            stdin: input,
            expected_output: output
        }));

        // Submit batch to Judge0
        let submitResult;
        try {
            submitResult = await submitBatch(submissions);
        } catch (batchError) {
            return res.status(500).json({
                success: false,
                message: 'Failed to submit code for testing',
                error: batchError.message
            });
        }

        // Extract tokens
        const resultTokens = submitResult.map(({ token }) => token);

        // Get results from Judge0
        let testResults;
        try {
            testResults = await submitToken(resultTokens);
        } catch (tokenError) {
            return res.status(500).json({
                success: false,
                message: 'Failed to retrieve test results',
                error: tokenError.message
            });
        }

        // Process results
        let passedCount = 0;
        const processedResults = testResults.map((test, index) => {
            const passed = test.status_id === 3; // 3 = Accepted
            if (passed) passedCount++;

            return {
                caseId: index + 1,
                passed,
                input: testCases[index].input,
                expected: testCases[index].output,
                output: test.stdout || '',
                status: test.status?.description || 'Unknown',
                error: test.stderr || ''
            };
        });

        // Update contest with test results
        contest[playerKey].testResults = processedResults;
        contest[playerKey].passedTestCases = passedCount;
        contest[playerKey].totalTestCases = testResults.length;

        await contest.save();

        res.json({
            success: true,
            message: 'Tests executed successfully',
            testResults: processedResults,
            passedCount,
            totalCount: testResults.length
        });
    } catch (err) {
        console.error('Error running test cases:', err);
        res.status(500).json({
            success: false,
            message: 'Error running tests',
            error: err.message
        });
    }
};

module.exports = {
    createContestRoom,
    joinContestRoom,
    getContestByRoomCode,
    submitCode,
    runTestCases,
    endContest,
    generateRoomCode
};
