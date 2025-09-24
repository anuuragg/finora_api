const mongoose = require('mongoose');

const ExpenseSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        category: {
			type: String,
			required: true,
			enum: ['needs', 'wants', 'savings', 'investments']
		},

		sub_category_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubCategory"
        },

        amount: {
            type: Number,
            required: true
        },

        note: {
            type: String,
            required: true
        },

        date: {
            type: Date,
            default: Date.now,
            required: true
        },

        year: { 
            type: Number, 
            required: true 
        },

        month: { 
            type: Number,
            required: true 
        },

    },
    {timestamps: true}
);

const Expenses = mongoose.model('Expenses', ExpenseSchema);
module.exports = Expenses;