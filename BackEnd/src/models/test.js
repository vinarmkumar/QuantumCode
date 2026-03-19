const mongoose = require('mongoose');
const { Schema } = mongoose;

const testSubmissionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    username: String,
    answers: [{
        problemId: { type: Schema.Types.ObjectId, ref: 'problem' },
        code: String,
        language: String,
        passed: { type: Boolean, default: false },
        passedTestCases: { type: Number, default: 0 },
        totalTestCases: { type: Number, default: 0 }
    }],
    score: { type: Number, default: 0 },
    totalScore: { type: Number, default: 0 },
    submittedAt: { type: Date, default: Date.now },
    copyPasteCount: { type: Number, default: 0 },
    windowSwitchCount: { type: Number, default: 0 },
    autoSubmitted: { type: Boolean, default: false }
});

const testSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: ''
    },
    problems: [{
        type: Schema.Types.ObjectId,
        ref: 'problem'
    }],
    scheduledAt: {
        type: Date,
        required: true
    },
    duration: {
        type: Number, // minutes
        required: true,
        default: 60
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    resultsReleased: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['upcoming', 'active', 'completed'],
        default: 'upcoming'
    },
    submissions: [testSubmissionSchema]
}, {
    timestamps: true
});

// Auto-update status based on current time
testSchema.methods.getComputedStatus = function () {
    const now = new Date();
    const start = new Date(this.scheduledAt);
    const end = new Date(start.getTime() + this.duration * 60 * 1000);
    if (now < start) return 'upcoming';
    if (now >= start && now <= end) return 'active';
    return 'completed';
};

const Test = mongoose.model('test', testSchema);
module.exports = Test;
