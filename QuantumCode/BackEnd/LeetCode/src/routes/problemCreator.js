const express = require('express');
const { get } = require('mongoose');

const problemRouter = express.Router();

const adminMiddleware = require('../middleware/adminMiddleware');
const { createProblem } = require('../controllers/userProblem');

// Import controller functions (you'll need to implement these)
const updateProblem = (req, res) => {
    res.status(501).json({ message: "Not implemented" });
};

const DeleteProblem = (req, res) => {
    res.status(501).json({ message: "Not implemented" });
};

const getProblemById = (req, res) => {
    res.status(501).json({ message: "Not implemented" });
};

const getAllProblem = (req, res) => {
    res.status(501).json({ message: "Not implemented" });
};

const solvedAllProblembyUser = (req, res) => {
    res.status(501).json({ message: "Not implemented" });
};

// create
// Admin
problemRouter.post('/create',adminMiddleware,createProblem);
problemRouter.patch("/:id", updateProblem);
problemRouter.delete("/:id", DeleteProblem);

// USer

problemRouter.post('/:id',getProblemById); // Fixed route parameter syntax
problemRouter.get("/", getAllProblem);
problemRouter.get("/user", solvedAllProblembyUser);

// fetch
// update
//  delete

module.exports = problemRouter;