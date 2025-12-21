const express = require('express');
const userProblemRouter = express.Router();

const { submitCode } = require('../controllers/userProblemSolver');
const userMiddleware = require('../middleware/userMiddleware');

// Submit code for problem solving
userProblemRouter.post('/submit', userMiddleware, submitCode);

module.exports = userProblemRouter;