const mongoose = require('mongoose');

const incomeSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        amount: {
            type: Number,
            required: true
        },

        source: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "IncomeSrc",
            required: true
        },

        note: {
            type: String
        },

        date: {
            type: Date,
            default: Date.now
        }
    }
)