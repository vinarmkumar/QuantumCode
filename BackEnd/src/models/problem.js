const mongoose = require('mongoose');

const {Schema} = mongoose;

const problemSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description:{
        type: String,
        required: true
    },

    difficulty:{
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        required: true
    },

    category: {
        type: String,
        required: true
    },

    constraints:{
        type: String,
        required: true
    },

    examples: [
        {
            input:{
                type: String,
                required: true
            },
            output:{
               type: String,
               required: true
            }
        }
    ],

    testCases: [
        {
            input:{
                type: String,
                required: true
            },
            output:{
               type: String,
               required: true
            },
            hidden: {
                type: Boolean,
                default: true
            }
        }
    ],

    startCode: {
        javascript: {
            type: String,
            default: ''
        },
        python: {
            type: String,
            default: ''
        },
        cpp: {
            type: String,
            default: ''
        },
        java: {
            type: String,
            default: ''
        }
    },

    referenceSolution: {
        javascript: {
            code: {
                type: String,
                default: ''
            },
            isVerified: {
                type: Boolean,
                default: false
            }
        },
        python: {
            code: {
                type: String,
                default: ''
            },
            isVerified: {
                type: Boolean,
                default: false
            }
        },
        cpp: {
            code: {
                type: String,
                default: ''
            },
            isVerified: {
                type: Boolean,
                default: false
            }
        },
        java: {
            code: {
                type: String,
                default: ''
            },
            isVerified: {
                type: Boolean,
                default: false
            }
        }
    },

    problemCreator:{
        type: Schema.Types.ObjectId,
        ref: 'user',
        default: null,
        sparse: true
    },

    submissions: {
        type: Number,
        default: 0
    },

    accepted: {
        type: Number,
        default: 0
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Problem = mongoose.model('problem', problemSchema);
module.exports = Problem;
