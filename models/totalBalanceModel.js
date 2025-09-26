const mongoose = require('mongoose');

const totalBalanceSchema = mongoose.Schema(
    {
        user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
        },

        total_balance: {
            type: Number,
            default: 0
        },

        total_income: {
            type: Number,
            default: 0
        },

        total_expenses: {
            type: Number,
            default: 0
        },

        total_investments: {
            type: Number,
            default: 0
        },

        total_savings: {
            type: Number,
            default: 0
        },

        current_balance: {
            type: Number,
            default: 0
        },

        last_updated: {
            type: Date,
            default: Date.now
        }
    },
    {timestamps: true}
);

const TotalBalance = mongoose.model('TotalBalance', totalBalanceSchema);
module.exports = TotalBalance;