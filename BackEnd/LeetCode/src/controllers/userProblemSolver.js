const {getLanguageById,submitBatch,submitToken} = require('../utils/problemUtility');
const Problem = require('../models/problem');

// Submit code for problem solving
const submitCode = async (req, res) => {
    try {
        const { problemId, code, language } = req.body;
        const userId = req.result._id; // From middleware authentication
        
        // Validate inputs
        if (!problemId || !code || !language) {
            return res.status(400).json({ 
                error: "Missing required fields", 
                required: ["problemId", "code", "language"] 
            });
        }
        
        // Get problem details
        const problem = await Problem.findById(problemId);
        if (!problem) {
            return res.status(404).json({ error: "Problem not found" });
        }
        
        // Get language ID
        const languageId = getLanguageById(language);
        if (!languageId) {
            return res.status(400).json({ error: "Unsupported language" });
        }
        
        // Prepare test cases (using both visible and hidden test cases)
        const allTestCases = [...problem.visibleTestCases, ...problem.hiddenTestCases];
        
        const submission = allTestCases.map(({input, output}) => ({
            source_code: code,
            language_id: languageId,
            stdin: input,
            expected_output: output
        }));
        
        // Submit for batch processing
        let submitResult;
        try {
            submitResult = await submitBatch(submission);
        } catch (batchError) {
            return res.status(500).json({ 
                error: "Failed to submit code for testing", 
                details: batchError.message 
            });
        }
        
        // Extract tokens
        const resultTokens = submitResult.map(({token}) => token);
        
        // Get results
        let testResults;
        try {
            testResults = await submitToken(resultTokens);
        } catch (tokenError) {
            return res.status(500).json({ 
                error: "Failed to retrieve test results", 
                details: tokenError.message 
            });
        }
        
        // Check results
        let passedAllTests = true;
        const testCaseResults = testResults.map((test, index) => {
            const passed = test.status.id === 3; // Accepted status
            if (!passed) passedAllTests = false;
            
            return {
                testCaseIndex: index,
                status: test.status.description,
                passed,
                stdout: test.stdout,
                stderr: test.stderr,
                time: test.time,
                memory: test.memory
            };
        });
        
        // Prepare response
        const response = {
            success: passedAllTests,
            message: passedAllTests ? "All tests passed!" : "Some tests failed",
            testCaseResults
        };
        
        // If all tests passed, update user's solved problems (you would implement this)
        if (passedAllTests) {
            // TODO: Update user's solved problems in database
            response.message = "Congratulations! All tests passed.";
        }
        
        res.status(200).json(response);
    } catch (err) {
        console.error("Error in submitCode:", err);
        res.status(500).json({ 
            error: "Internal server error", 
            details: err.message 
        });
    }
};

module.exports = {
    submitCode
};