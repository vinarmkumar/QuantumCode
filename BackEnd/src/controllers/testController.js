const Test = require('../models/test');
const Problem = require('../models/problem');
const { submitBatch, submitToken, getLanguageById } = require('../utils/judge0');

// Create a new test (admin only)
const createTest = async (req, res) => {
    try {
        const { title, description, problems, scheduledAt, duration } = req.body;
        if (!title || !problems || !scheduledAt || !duration) {
            return res.status(400).json({ success: false, message: 'title, problems, scheduledAt, duration are required' });
        }
        if (!Array.isArray(problems) || problems.length === 0) {
            return res.status(400).json({ success: false, message: 'At least one problem is required' });
        }
        const test = await Test.create({
            title,
            description,
            problems,
            scheduledAt: new Date(scheduledAt),
            duration,
            createdBy: req.result._id,
            status: 'upcoming'
        });
        const populated = await Test.findById(test._id).populate('problems', 'title difficulty category');
        res.status(201).json({ success: true, message: 'Test created successfully', test: populated });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error: ' + err.message });
    }
};

// Get all tests with computed status
const getAllTests = async (req, res) => {
    try {
        const tests = await Test.find()
            .populate('problems', 'title difficulty category')
            .populate('createdBy', 'firstname lastname')
            .sort({ scheduledAt: 1 });


        const testsWithStatus = tests.map(test => {
            const t = test.toObject();
            t.computedStatus = test.getComputedStatus();
            return t;
        });

        res.status(200).json({ success: true, tests: testsWithStatus });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error: ' + err.message });
    }
};

// Get test by ID (with full problem details for active tests)
const getTestById = async (req, res) => {
    try {
        const { id } = req.params;
        const test = await Test.findById(id)
            .populate('problems')
            .populate('createdBy', 'firstname lastname');

        if (!test) {
            return res.status(404).json({ success: false, message: 'Test not found' });
        }

        const t = test.toObject();
        t.computedStatus = test.getComputedStatus();

        res.status(200).json({ success: true, test: t });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error: ' + err.message });
    }
};

// Submit test answers (student)
const submitTest = async (req, res) => {
    try {
        const { id } = req.params;
        const { answers, metrics = {} } = req.body; // [{ problemId, code, language }], metrics: { copyPasteCount, windowSwitchCount, autoSubmitted }

        const test = await Test.findById(id).populate('problems');
        if (!test) {
            return res.status(404).json({ success: false, message: 'Test not found' });
        }

        const computedStatus = test.getComputedStatus();
        if (computedStatus !== 'active') {
            return res.status(400).json({ success: false, message: 'Test is not currently active' });
        }

        // Check if already submitted
        const alreadySubmitted = test.submissions.find(
            s => String(s.userId) === String(req.result._id)
        );
        if (alreadySubmitted) {
            return res.status(400).json({ success: false, message: 'You have already submitted this test' });
        }

        // Run Judge0 for each answer
        const evaluatedAnswers = [];
        let totalScore = 0;
        let earnedScore = 0;

        for (const answer of answers) {
            const problem = test.problems.find(p => String(p._id) === String(answer.problemId));
            if (!problem) {
                continue;
            }

            const langId = getLanguageById(answer.language || 'javascript');
            const testCases = problem.testCases || [];
            
            // Score = number of test cases
            totalScore += testCases.length;

            if (!answer.code || !answer.code.trim() || !langId || testCases.length === 0) {
                evaluatedAnswers.push({ problemId: answer.problemId, code: answer.code, language: answer.language, passed: false, passedTestCases: 0, totalTestCases: testCases.length });
                continue;
            }

            try {
                const submissions = testCases.map(tc => ({
                    source_code: answer.code,
                    language_id: langId,
                    stdin: tc.input,
                    expected_output: tc.output
                }));

                const tokens = await submitBatch(submissions);
                const tokenList = tokens.map(t => t.token);
                const results = await submitToken(tokenList);

                const passed = results.filter(r => r.status_id === 3).length;
                const isFullyPassed = passed === testCases.length;

                earnedScore += passed;

                evaluatedAnswers.push({
                    problemId: answer.problemId,
                    code: answer.code,
                    language: answer.language,
                    passed: isFullyPassed,
                    passedTestCases: passed,
                    totalTestCases: testCases.length
                });
            } catch (judgeErr) {
                evaluatedAnswers.push({ problemId: answer.problemId, code: answer.code, language: answer.language, passed: false, passedTestCases: 0, totalTestCases: testCases.length });
            }
        }

        const submission = {
            userId: req.result._id,
            username: req.result.firstname,
            answers: evaluatedAnswers,
            score: earnedScore,
            totalScore,
            submittedAt: new Date(),
            copyPasteCount: metrics.copyPasteCount || 0,
            windowSwitchCount: metrics.windowSwitchCount || 0,
            autoSubmitted: metrics.autoSubmitted || false
        };

        test.submissions.push(submission);
        await test.save();

        res.status(200).json({
            success: true,
            message: 'Test submitted successfully',
            result: { score: earnedScore, totalScore, answers: evaluatedAnswers }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error: ' + err.message });
    }
};

// Get my test results
const getMyResults = async (req, res) => {
    try {
        const tests = await Test.find({
            'submissions.userId': req.result._id,
            resultsReleased: true
        }).populate('problems', 'title difficulty');

        const results = tests.map(test => {
            const mySubmission = test.submissions.find(
                s => String(s.userId) === String(req.result._id)
            );

            // Calculate Rank
            const sortedSubmissions = [...test.submissions].sort((a, b) => {
                if (b.score !== a.score) return b.score - a.score;
                return new Date(a.submittedAt) - new Date(b.submittedAt); // Earliest submission breaks ties
            });
            const rank = sortedSubmissions.findIndex(s => String(s.userId) === String(req.result._id)) + 1;

            return {
                testId: test._id,
                testTitle: test.title,
                scheduledAt: test.scheduledAt,
                score: mySubmission?.score || 0,
                totalScore: mySubmission?.totalScore || 0,
                submittedAt: mySubmission?.submittedAt,
                rank,
                totalParticipants: test.submissions.length
            };
        });

        res.status(200).json({ success: true, results });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error: ' + err.message });
    }
};

// Toggle release results (admin only)
const toggleReleaseResults = async (req, res) => {
    try {
        const { id } = req.params;
        const test = await Test.findById(id);
        if (!test) {
            return res.status(404).json({ success: false, message: 'Test not found' });
        }
        test.resultsReleased = !test.resultsReleased;
        await test.save();
        res.status(200).json({ success: true, message: `Results ${test.resultsReleased ? 'released' : 'hidden'} successfully`, resultsReleased: test.resultsReleased });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error: ' + err.message });
    }
};

// Delete test (admin only)
const deleteTest = async (req, res) => {
    try {
        const { id } = req.params;
        const test = await Test.findByIdAndDelete(id);
        if (!test) {
            return res.status(404).json({ success: false, message: 'Test not found' });
        }
        res.status(200).json({ success: true, message: 'Test deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error: ' + err.message });
    }
};

// Run test cases against examples (student running tests before submit)
const runTestProblem = async (req, res) => {
    try {
        const { id, problemId } = req.params;
        const { code, language } = req.body;

        const test = await Test.findById(id).populate('problems');
        if (!test) return res.status(404).json({ success: false, message: 'Test not found' });

        if (test.getComputedStatus() !== 'active') {
            return res.status(400).json({ success: false, message: 'Test is not currently active' });
        }

        const problem = test.problems.find(p => String(p._id) === String(problemId));
        if (!problem) return res.status(404).json({ success: false, message: 'Problem not found in test' });

        const langId = getLanguageById(language || 'javascript');
        if (!langId) return res.status(400).json({ success: false, message: 'Unsupported language' });

        const testCases = problem.examples || [];
        if (testCases.length === 0) return res.status(400).json({ success: false, message: 'No examples available' });

        const submissions = testCases.map(tc => ({
            source_code: code,
            language_id: langId,
            stdin: tc.input,
            expected_output: tc.output
        }));

        const tokens = await submitBatch(submissions);
        const tokenList = tokens.map(t => t.token);
        const results = await submitToken(tokenList);

        const testResults = results.map((r, i) => ({
            caseId: i + 1,
            passed: r.status_id === 3,
            input: testCases[i].input,
            expected: testCases[i].output,
            output: r.stdout || '',
            error: r.stderr || '',
            status: r.status?.description || 'Unknown'
        }));

        res.status(200).json({ success: true, testResults });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error running tests: ' + err.message });
    }
};

module.exports = { createTest, getAllTests, getTestById, submitTest, getMyResults, deleteTest, runTestProblem, toggleReleaseResults };
