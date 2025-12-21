const {getLanguageById,submitBatch,submitToken} = require('../utils/problemUtility');
const problem = require('../models/problem');

const createProblem = async (req, res) => {
    // Logic to create a problem
    const {title, description,visibleTestCases,tags, difficulty,hiddenTestCases, startCode, referenceSolution, problemCreator} = req.body;

    try{
        // Validate that we have reference solutions
        if (!referenceSolution || referenceSolution.length === 0) {
            return res.status(400).json({error: "At least one reference solution is required"});
        }
        
        
        // Test each reference solution against visible test cases
        for(const {language,completeCode} of referenceSolution){
            // Validate language
            const languageId = getLanguageById(language);
            if (!languageId) {
                return res.status(400).json({error: `Unsupported language: ${language}`});
            }
            
            // Create batch submission for visible test cases
            const submission = visibleTestCases.map(({input, output})=>({
                source_code: completeCode,
                language_id: languageId,
                stdin: input,
                expected_output: output
            }));
            
            let submitResult;
            try {
                submitResult = await submitBatch(submission);
            } catch (batchError) {
                console.error("Batch submission error:", batchError);
                return res.status(500).json({error: "Failed to submit code for testing", details: batchError.message});
            }
            
            // Extract tokens
            const resultToken = submitResult.map(({token})=>token);

            let testResult;
            try {
                testResult = await submitToken(resultToken);
            } catch (tokenError) {
                console.error("Token retrieval error:", tokenError);
                return res.status(500).json({error: "Failed to retrieve test results", details: tokenError.message});
            }

            // Check that all tests passed (status.id === 3 means "Accepted")
            for(const test of testResult){
                if(test.status.id !== 3){
                    return res.status(400).json({
                        error: `Reference solution for ${language} failed test cases`, 
                        details: test.status.description,
                        testCaseOutput: test.stdout,
                        expectedOutput: test.expected_output
                    });
                }
            }
        }

        // If all reference solutions passed, save the problem
        const newProblem = await problem.create({
            ...req.body,
            problemCreator: req.result._id
        });

        res.status(201).json({
            message: "Problem Saved Successfully",
            problemId: newProblem._id
        });
    }
    catch(err){
        console.error("Error in createProblem:", err);
        // Handle specific MongoDB errors
        if (err.name === 'ValidationError') {
            const errors = {};
            Object.keys(err.errors).forEach(key => {
                errors[key] = err.errors[key].message;
            });
            return res.status(400).json({error: "Validation failed", details: errors});
        }
        if (err.code === 11000) {
            return res.status(400).json({error: "Problem with this title already exists"});
        }
        res.status(500).json({error: "Internal server error", details: err.message});
    }
};

module.exports = {
    createProblem
};