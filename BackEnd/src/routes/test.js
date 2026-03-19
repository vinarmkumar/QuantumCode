const express = require('express');
const testRouter = express.Router();
const {
    createTest,
    getAllTests,
    getTestById,
    submitTest,
    getMyResults,
    deleteTest,
    runTestProblem,
    toggleReleaseResults
} = require('../controllers/testController');
const userMiddleware = require('../middleware/userMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// Admin: create test
testRouter.post('/create', adminMiddleware, createTest);

// Admin: toggle release results
testRouter.put('/:id/release-results', adminMiddleware, toggleReleaseResults);

// Admin: delete test
testRouter.delete('/:id', adminMiddleware, deleteTest);

// Student: get all tests
testRouter.get('/', userMiddleware, getAllTests);

// Student: get my results
testRouter.get('/my-results', userMiddleware, getMyResults);

// Student: get single test
testRouter.get('/:id', userMiddleware, getTestById);

// Student: submit test
testRouter.post('/:id/submit', userMiddleware, submitTest);

// Student: run code for single problem before submit
testRouter.post('/:id/run-problem/:problemId', userMiddleware, runTestProblem);

module.exports = testRouter;
