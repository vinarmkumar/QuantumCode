const { getLanguageById, submitBatch, submitToken } = require('../utils/problemUtility');
const Problem = require('../models/problem');

const createProblem = async (req, res) => {
    const { title, description, difficulty, category, constraints, examples, testCases, startCode, referenceSolution } = req.body;

    try {
        // Validate required fields
        if (!title || !description || !difficulty || !category || !constraints) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        if (!examples || examples.length === 0) {
            return res.status(400).json({ error: "At least one example is required" });
        }

        if (!testCases || testCases.length === 0) {
            return res.status(400).json({ error: "At least one test case is required" });
        }

        if (!referenceSolution || Object.keys(referenceSolution).length === 0) {
            return res.status(400).json({ error: "At least one reference solution is required" });
        }

        // Check if problem title already exists
        const existingProblem = await Problem.findOne({ title });
        if (existingProblem) {
            return res.status(400).json({ error: "Problem with this title already exists" });
        }

        // Ensure examples have correct structure
        const formattedExamples = examples.map(ex => ({
            input: String(ex.input || ''),
            output: String(ex.output || '')
        }));

        // Ensure testCases have correct structure
        const formattedTestCases = testCases.map(tc => ({
            input: String(tc.input || ''),
            output: String(tc.output || ''),
            hidden: tc.hidden !== undefined ? tc.hidden : true
        }));

        // Ensure startCode has correct structure
        const formattedStartCode = {
            javascript: String(startCode?.javascript || ''),
            python: String(startCode?.python || ''),
            cpp: String(startCode?.cpp || ''),
            java: String(startCode?.java || '')
        };

        // VALIDATE REFERENCE SOLUTIONS BEFORE CREATING PROBLEM
        console.log(`\n=== VALIDATING REFERENCE SOLUTIONS ===`);
        console.log(`Problem: ${title}`);
        console.log(`Test cases: ${formattedTestCases.length}`);

        const validatedSolutions = {};

        for (const [language, code] of Object.entries(referenceSolution)) {
            if (!code || code.trim() === '') {
                console.log(`⚠️ Skipping empty reference solution for ${language}`);
                continue;
            }

            let languageId = getLanguageById(language);
            if (!languageId && language === 'cpp') {
                languageId = getLanguageById('c++');
            }

            if (!languageId) {
                console.log(`⚠️ Skipping unsupported language: ${language}`);
                continue;
            }

            console.log(`\nValidating ${language} solution...`);

            // Create submissions for all test cases
            const submissions = formattedTestCases.map((testCase) => ({
                source_code: code,
                language_id: languageId,
                stdin: testCase.input.trim(),
                expected_output: testCase.output.trim()
            }));

            try {
                // Submit to Judge0
                const batchResponse = await submitBatch(submissions);
                
                if (!batchResponse || batchResponse.length === 0) {
                    return res.status(400).json({ 
                        error: `Failed to validate ${language} reference solution. Judge0 submission failed.`
                    });
                }

                // Extract tokens
                const resultTokens = batchResponse.map((value) => value.token);
                
                if (!resultTokens || resultTokens.length === 0) {
                    return res.status(400).json({ 
                        error: `Failed to get tokens from Judge0 for ${language}`
                    });
                }

                // Poll for results
                const testResult = await submitToken(resultTokens);

                // Check if all tests passed
                let allPassed = true;
                for (const test of testResult) {
                    if (test.status_id !== 3) {  // status_id 3 = Accepted
                        allPassed = false;
                        console.log(`❌ ${language} solution failed test: status_id=${test.status_id}`);
                        break;
                    }
                }

                if (!allPassed) {
                    return res.status(400).json({ 
                        error: `Reference solution for ${language} failed test case validation. Please verify your solution.`
                    });
                }

                console.log(`✅ ${language} solution validated successfully (${testResult.length}/${testResult.length} tests passed)`);
                validatedSolutions[language] = code;

            } catch (err) {
                console.error(`Error validating ${language} solution:`, err.message);
                return res.status(400).json({ 
                    error: `Failed to validate ${language} reference solution: ${err.message}`
                });
            }
        }

        if (Object.keys(validatedSolutions).length === 0) {
            return res.status(400).json({ error: "No valid reference solutions provided" });
        }

        console.log(`\n✅ All reference solutions validated successfully`);

        // Create new problem in database
        const newProblem = await Problem.create({
            title: title.trim(),
            description: description.trim(),
            difficulty: difficulty.trim(),
            category: category.trim(),
            constraints: constraints.trim(),
            examples: formattedExamples,
            testCases: formattedTestCases,
            startCode: formattedStartCode,
            referenceSolution: validatedSolutions,
            problemCreator: req.user?._id || null,
            submissions: 0,
            accepted: 0
        });

        res.status(201).json({
            message: "Problem created successfully with validated reference solutions",
            problem: newProblem
        });
    } catch (err) {
        console.error("Error in createProblem:", err);

        if (err.name === 'ValidationError') {
            const errors = {};
            Object.keys(err.errors).forEach(key => {
                errors[key] = err.errors[key].message;
            });
            return res.status(400).json({ error: "Validation failed", details: errors });
        }

        if (err.code === 11000) {
            return res.status(400).json({ error: "Problem with this title already exists" });
        }

        res.status(500).json({ error: "Internal server error", details: err.message });
    }
};

// RUN USER CODE - Execute user code against test cases
const runUserCode = async (req, res) => {
    try {
        const { problemId, language, code } = req.body;

        // Validation
        if (!code || code.trim() === '') {
            return res.status(400).json({ error: "Code cannot be empty" });
        }

        if (!problemId || !language) {
            return res.status(400).json({ error: "Missing required fields: problemId, language, code" });
        }

        const problem = await Problem.findById(problemId);
        if (!problem) {
            return res.status(404).json({ error: "Problem not found" });
        }

        if (!problem.testCases || problem.testCases.length === 0) {
            return res.status(400).json({ error: "Problem has no test cases" });
        }

        // Get language ID for Judge0
        let languageId = getLanguageById(language);
        if (!languageId && language.toLowerCase() === 'cpp') {
            languageId = getLanguageById('c++');
        }
        if (!languageId) {
            return res.status(400).json({ error: `Unsupported language: ${language}` });
        }

        console.log(`\n=== RUNNING USER CODE ===`);
        console.log(`Problem: ${problem.title}`);
        console.log(`Language: ${language}`);
        console.log(`Code length: ${code.length}`);
        console.log(`Test cases: ${problem.testCases.length}`);

        // Create submissions array - one per test case
        const submissions = problem.testCases.map((testCase) => ({
            source_code: code,
            language_id: languageId,
            stdin: testCase.input.trim(),
            expected_output: testCase.output.trim()
        }));

        // Submit batch to Judge0
        console.log(`Submitting ${submissions.length} test cases to Judge0...`);
        const batchResponse = await submitBatch(submissions);
        
        if (!batchResponse || batchResponse.length === 0) {
            console.error("Failed to get response from Judge0", batchResponse);
            return res.status(500).json({ error: "Failed to submit code to Judge0. Please try again." });
        }

        // Extract tokens from response
        const resultTokens = batchResponse.map((value) => value.token);
        
        if (!resultTokens || resultTokens.length === 0) {
            console.error("Failed to extract tokens", batchResponse);
            return res.status(500).json({ error: "Failed to get tokens from Judge0" });
        }

        console.log(`Batch submitted. Tokens: ${resultTokens.join(', ')}`);

        // Poll for results
        const testResults_data = await submitToken(resultTokens);
        
        console.log(`Received results for ${testResults_data.length} submissions`);

        // Process results
        const testResults = [];
        let passedCount = 0;
        let allPassed = true;

        for (let i = 0; i < testResults_data.length; i++) {
            const submission = testResults_data[i];
            const testCase = problem.testCases[i];
            
            const passed = submission.status_id === 3;  // status_id 3 = Accepted
            if (passed) passedCount++;
            else allPassed = false;

            testResults.push({
                testCaseNumber: i + 1,
                input: testCase.input,
                expected: testCase.output.trim(),
                actual: submission.stdout || "",
                stderr: submission.stderr || "",
                passed: passed,
                statusId: submission.status_id,
                statusDescription: submission.status ? submission.status.description : "Unknown"
            });

            console.log(`Test ${i + 1}: ${passed ? '✓ PASSED' : '✗ FAILED'}`);
            if (!passed) {
                console.log(`  Expected: ${testCase.output.trim()}`);
                console.log(`  Got: ${submission.stdout || "(no output)"}`);
                if (submission.stderr) console.log(`  Error: ${submission.stderr}`);
            }
        }

        console.log(`\nResult: ${passedCount}/${problem.testCases.length} test cases passed`);
        console.log(`=== RUN COMPLETE ===\n`);

        return res.status(200).json({
            allPassed: allPassed,
            passedCount: passedCount,
            totalCount: problem.testCases.length,
            testResults: testResults
        });

    } catch (err) {
        console.error("Error in runUserCode:", err);
        res.status(500).json({ error: "Internal server error", details: err.message });
    }
};

const getAllProblems = async (req, res) => {
    try {
        const problems = await Problem.find().select('-problemCreator');
        res.status(200).json({
            message: "Problems retrieved successfully",
            problems
        });
    } catch (err) {
        console.error("Error in getAllProblems:", err);
        res.status(500).json({ error: "Internal server error", details: err.message });
    }
};

const getProblemById = async (req, res) => {
    try {
        const { id } = req.params;
        const problem = await Problem.findById(id);

        if (!problem) {
            return res.status(404).json({ error: "Problem not found" });
        }

        res.status(200).json({
            message: "Problem retrieved successfully",
            problem
        });
    } catch (err) {
        console.error("Error in getProblemById:", err);
        res.status(500).json({ error: "Internal server error", details: err.message });
    }
};

const updateProblem = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, difficulty, category, constraints, examples, testCases, startCode } = req.body;

        const problem = await Problem.findByIdAndUpdate(
            id,
            {
                title,
                description,
                difficulty,
                category,
                constraints,
                examples,
                testCases,
                startCode
            },
            { new: true, runValidators: true }
        );

        if (!problem) {
            return res.status(404).json({ error: "Problem not found" });
        }

        res.status(200).json({
            message: "Problem updated successfully",
            problem
        });
    } catch (err) {
        console.error("Error in updateProblem:", err);
        res.status(500).json({ error: "Internal server error", details: err.message });
    }
};

const deleteProblem = async (req, res) => {
    try {
        const { id } = req.params;
        const problem = await Problem.findByIdAndDelete(id);

        if (!problem) {
            return res.status(404).json({ error: "Problem not found" });
        }

        res.status(200).json({
            message: "Problem deleted successfully",
            problem
        });
    } catch (err) {
        console.error("Error in deleteProblem:", err);
        res.status(500).json({ error: "Internal server error", details: err.message });
    }
};

const getProblemsByDifficulty = async (req, res) => {
    try {
        const { difficulty } = req.params;
        const problems = await Problem.find({ difficulty }).select('-problemCreator');

        res.status(200).json({
            message: "Problems retrieved successfully",
            problems
        });
    } catch (err) {
        console.error("Error in getProblemsByDifficulty:", err);
        res.status(500).json({ error: "Internal server error", details: err.message });
    }
};

const getTopProblems = async (req, res) => {
    try {
        const problems = await Problem.find()
            .sort({ submissions: -1 })
            .limit(10)
            .select('-problemCreator');

        res.status(200).json({
            message: "Top problems retrieved successfully",
            problems
        });
    } catch (err) {
        console.error("Error in getTopProblems:", err);
        res.status(500).json({ error: "Internal server error", details: err.message });
    }
};

// Validate reference solution code against test cases
const validateReferenceSolution = async (req, res) => {
    try {
        const { problemId, language, code } = req.body;

        // Validation
        if (!code || code.trim() === '') {
            return res.status(400).json({ error: "Code cannot be empty" });
        }

        if (!problemId || !language) {
            return res.status(400).json({ error: "Missing required fields: problemId, language, code" });
        }

        const problem = await Problem.findById(problemId);
        if (!problem) {
            return res.status(404).json({ error: "Problem not found" });
        }

        if (!problem.testCases || problem.testCases.length === 0) {
            return res.status(400).json({ error: "Problem has no test cases" });
        }

        // Get language ID for Judge0
        let languageId = getLanguageById(language);
        if (!languageId) {
            // Try lowercase cpp -> c++
            if (language.toLowerCase() === 'cpp') {
                languageId = getLanguageById('c++');
            }
            if (!languageId) {
                return res.status(400).json({ error: `Unsupported language: ${language}. Supported: cpp, java, python, javascript` });
            }
        }

        console.log(`Validating ${language} solution for problem: ${problem.title}`);
        console.log(`Code length: ${code.length}, Test cases: ${problem.testCases.length}`);

        // Create submissions array - one per test case
        const submissions = problem.testCases.map((testCase) => ({
            source_code: code,
            language_id: languageId,
            stdin: testCase.input.trim(),
            expected_output: testCase.output.trim()
        }));

        // Submit batch to Judge0
        console.log(`Submitting batch of ${submissions.length} test cases to Judge0...`);
        const batchResponse = await submitBatch(submissions);
        
        if (!batchResponse || !batchResponse.length === 0) {
            console.error("Failed to get response from Judge0", batchResponse);
            return res.status(500).json({ error: "Failed to submit to Judge0. Please try again." });
        }

        // Extract tokens from response - handle both array and wrapped formats
        const resultTokens = batchResponse.map((value) => value.token);
        
        if (!resultTokens || resultTokens.length === 0) {
            console.error("Failed to extract tokens", batchResponse);
            return res.status(500).json({ error: "Failed to get tokens from Judge0" });
        }

        console.log(`Batch submitted successfully. Tokens: ${resultTokens.join(', ')}`);

        // Poll for results
        const testResult = await submitToken(resultTokens);
        
        console.log(`Received results for ${testResult.length} submissions`);

        // Check if all tests passed
        let allPassed = true;
        let failedTests = [];

        for (let i = 0; i < testResult.length; i++) {
            const test = testResult[i];
            console.log(`Test ${i + 1}: status_id=${test.status_id}`);
            
            if (test.status_id !== 3) {  // status_id 3 = Accepted
                allPassed = false;
                failedTests.push({
                    testNumber: i + 1,
                    statusId: test.status_id,
                    stderr: test.stderr || 'Unknown error',
                    stdout: test.stdout || ''
                });
            }
        }

        if (!allPassed) {
            console.log(`Reference solution FAILED for ${failedTests.length} test case(s)`);
            return res.status(400).json({ 
                error: "Reference solution failed validation",
                failedTests: failedTests,
                message: `Failed ${failedTests.length} out of ${testResult.length} test cases`
            });
        }

        console.log(`Reference solution PASSED all ${testResult.length} test cases`);

        // Save reference solution to problem
        if (!problem.referenceSolution) {
            problem.referenceSolution = {};
        }
        
        problem.referenceSolution[language] = code;
        await problem.save();

        res.status(200).json({
            message: "Reference solution validated and saved successfully",
            testsPassed: testResult.length,
            language: language
        });
    } catch (err) {
        console.error("Error in validateReferenceSolution:", err);
        res.status(500).json({ error: "Internal server error", details: err.message });
    }
};

// Check validation status and save if all tests pass
const checkValidationStatus = async (req, res) => {
    try {
        const { problemId, language, token, code } = req.body;

        if (!code || code.trim() === '') {
            return res.status(400).json({ error: "Code cannot be empty" });
        }

        if (!problemId || !language || !token) {
            return res.status(400).json({ error: "Missing required fields: problemId, language, token" });
        }

        const problem = await Problem.findById(problemId);
        if (!problem) {
            return res.status(404).json({ error: "Problem not found" });
        }

        console.log(`Checking validation status for token: ${token}`);

        // Check status from Judge0
        const statusResponse = await submitToken(token);

        if (!statusResponse) {
            console.error("Failed to get status from Judge0");
            return res.status(500).json({ error: "Failed to check status from Judge0" });
        }

        console.log(`Got response:`, JSON.stringify(statusResponse, null, 2));

        // Check if all submissions passed
        const submissions = statusResponse.submissions || [];
        console.log(`Total submissions: ${submissions.length}`);

        if (submissions.length === 0) {
            return res.status(500).json({ error: "No submissions returned from Judge0" });
        }

        // Detailed status for each test
        const testStatuses = submissions.map((sub, idx) => ({
            testCaseIndex: idx,
            statusId: sub.status ? sub.status.id : null,
            statusDescription: sub.status ? sub.status.description : "Unknown",
            stdout: sub.stdout || "",
            stderr: sub.stderr || "",
            expected: problem.testCases[idx].output.trim(),
            actual: sub.stdout || ""
        }));

        // Status 3 = Accepted (Correct Answer)
        const allPassed = submissions.every(sub => {
            return sub.status && sub.status.id === 3;
        });

        console.log(`All passed: ${allPassed}`);
        console.log(`Test statuses:`, testStatuses);

        if (allPassed) {
            console.log(`All tests passed! Saving solution...`);
            
            // Save the reference solution
            if (!problem.referenceSolution) {
                problem.referenceSolution = {};
            }
            
            problem.referenceSolution[language] = {
                code: code,
                isVerified: true
            };

            await problem.save();
            console.log(`Solution saved successfully for ${language}`);

            return res.status(200).json({
                message: `Reference solution for ${language} verified and saved successfully`,
                allPassed: true,
                language: language,
                isVerified: true,
                testResults: testStatuses
            });
        } else {
            // Not all tests passed - return detailed failure info
            console.log(`Some tests failed`);
            
            const failedTests = testStatuses.filter(t => t.statusId !== 3);

            return res.status(400).json({
                message: "Reference solution failed some test cases",
                allPassed: false,
                failedTests: failedTests,
                testResults: testStatuses
            });
        }
    } catch (err) {
        console.error("Error in checkValidationStatus:", err);
        res.status(500).json({ error: "Internal server error", details: err.message });
    }
};

module.exports = {
    createProblem,
    getAllProblems,
    getProblemById,
    updateProblem,
    deleteProblem,
    getProblemsByDifficulty,
    getTopProblems,
    validateReferenceSolution,
    checkValidationStatus,
    runUserCode
};
