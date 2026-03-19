const mongoose = require('mongoose');
const { Schema } = mongoose;

const contestSchema = new Schema({
    roomCode: {
        type: String,
        required: true,
        unique: true
    },
    player1: {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },
        username: String,
        code: String,
        language: String,
        isSubmitted: Boolean,
        submittedAt: Date,
        testResults: [{
            caseId: Number,
            passed: Boolean,
            input: String,
            expected: String,
            output: String
        }],
        passedTestCases: {
            type: Number,
            default: 0
        },
        totalTestCases: {
            type: Number,
            default: 0
        },
        result: {
            status: String,
            time: Number,
            memory: Number,
            output: String
        },
        points: {
            type: Number,
            default: 0
        }
    },
    player2: {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        username: String,
        code: String,
        language: String,
        isSubmitted: Boolean,
        submittedAt: Date,
        testResults: [{
            caseId: Number,
            passed: Boolean,
            input: String,
            expected: String,
            output: String
        }],
        passedTestCases: {
            type: Number,
            default: 0
        },
        totalTestCases: {
            type: Number,
            default: 0
        },
        result: {
            status: String,
            time: Number,
            memory: Number,
            output: String
        },
        points: {
            type: Number,
            default: 0
        }
    },
    problem: {
        type: Schema.Types.ObjectId,
        ref: 'problem',
        required: true
    },
    problemTitle: String,
    difficulty: String,
    
    status: {
        type: String,
        enum: ['waiting', 'active', 'completed'],
        default: 'waiting'
    },
    
    timeLimit: {
        type: Number,
        default: 1800 // 30 minutes in seconds
    },
    
    timeStarted: Date,
    timeEnded: Date,
    
    winner: {
        type: String,
        enum: ['player1', 'player2', 'draw', null],
        default: null
    },
    
    winnerUserId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    
    stats: {
        totalAttempts: Number,
        correctAttempts: Number
    }

}, {
    timestamps: true
});

const Contest = mongoose.model('contest', contestSchema);
module.exports = Contest;
