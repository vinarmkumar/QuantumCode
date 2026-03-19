const express = require('express');
const {
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
} = require('../controllers/problemController');

const problemRouter = express.Router();

// Create problem
problemRouter.post('/create', createProblem);

// Get all problems
problemRouter.get('/', getAllProblems);

// Get problem by ID
problemRouter.get('/:id', getProblemById);

// Get problems by difficulty
problemRouter.get('/difficulty/:difficulty', getProblemsByDifficulty);

// Get top problems
problemRouter.get('/stats/top', getTopProblems);

// Update problem
problemRouter.put('/:id', updateProblem);

// Delete problem
problemRouter.delete('/:id', deleteProblem);

// Validate reference solution against test cases
problemRouter.post('/reference/validate', validateReferenceSolution);

// Check validation status and save if passed
problemRouter.post('/reference/check-status', checkValidationStatus);

// Run user code against test cases
problemRouter.post('/run-code', runUserCode);

module.exports = problemRouter;
