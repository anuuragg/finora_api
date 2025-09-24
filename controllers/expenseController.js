const connectDB = require('../lib/dbConnect');
const Expenses = require('../models/expenseModel');
const { v4: uuidv4 } = require('uuid');


const getExpenses = async (req, res) => {
    try{
        const expenses = await Expenses.find({});
        res.status(201).json(expenses)
        console.log(expenses);
    } catch(err){
        console.log('error: ', err.message);
    }
}

const createExpense = async (req, res) => {
    try{
        const {category, amount, note, sub_categories, date} = req.body;
        const timestamp = new Date(date);
        
        if (isNaN(timestamp)) {
            return res.status(400).json({ error: 'Invalid date format' });
        }

        const expense = await Expenses.create({
            expense_id: uuidv4(),
            category,
            amount,
            note,
            sub_categories: sub_categories || [],
            timestamp,
            year: timestamp.getFullYear(),
            month: timestamp.getMonth() + 1,
            day: timestamp.getDate()
        });

        console.log(expense);
        res.status(201).json(expense);
    } catch(err){
        console.log('error: ', err.message);
    }
}

module.exports = {
    createExpense, getExpenses
}