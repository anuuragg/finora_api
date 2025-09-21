const mongoose = require('mongoose');
const Category = require('./categoryModels');

const ExpenseSchema = mongoose.Schema(
    {
        user_id: {
            type: String,
            required: true
        },

        expense_id: {
            type: String,
            required: true,
            unique: true
        },

        category: {
			type: String,
			required: true,
			enum: ['needs', 'wants', 'savings', 'investments']
		},

		sub_categories: {
			type: [String],
			default: []
		},

        amount: {
            type: Number,
            required: true
        },

        note: {
            type: String,
            required: true
        },

        timestamp: {
            type: Date,
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

        day: { 
            type: Number,
            required: true 
        },

        week: {
            year: { 
            type: Number, 
            required: true 
            },
            weekNumber: { 
            type: Number, 
            required: true 
            }
        },

    }
);

ExpenseSchema.index({ year: 1 });
ExpenseSchema.index({ month: 1 });
ExpenseSchema.index({ day: 1 });
ExpenseSchema.index({ 'week.year': 1, 'week.weekNumber': 1 });

ExpenseSchema.index({ year: 1, category: 1 });
ExpenseSchema.index({ month: 1, category: 1 });
ExpenseSchema.index({ day: 1, category: 1 });
ExpenseSchema.index({ 'week.year': 1, 'week.weekNumber': 1, category: 1 });

ExpenseSchema.index({ user_id: 1, timestamp: -1 }); 

const Expenses = mongoose.model('Expenses', ExpenseSchema);
module.exports = Expenses;