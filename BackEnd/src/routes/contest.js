const express = require('express');
const router = express.Router();
const userMiddleware = require('../middleware/userMiddleware');
const {
    createContestRoom,
    joinContestRoom,
    getContestByRoomCode,
    submitCode,
    runTestCases,
    endContest
} = require('../controllers/contestController');

// Create new contest room
router.post('/create', userMiddleware, createContestRoom);

// Join contest room
router.post('/join', userMiddleware, joinContestRoom);

// Get contest details
router.get('/:roomCode', userMiddleware, getContestByRoomCode);

// Run test cases
router.post('/run-tests', userMiddleware, runTestCases);

// Submit code
router.post('/submit', userMiddleware, submitCode);

// End contest
router.put('/:roomCode/end', userMiddleware, endContest);

module.exports = router;
