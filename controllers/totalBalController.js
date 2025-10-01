const Income = require('../models/incomeModel');
const Expenses = require('../models/expenseModel');
const CustomError = require('../lib/customError');
const dbConnect = require('../lib/dbConnect');
const buildDateFilter = require('../lib/dateFilter');

const getRecords = async (req, res) => {
    try{
        await dbConnect();
        const userId = req.user.id;
        const {days} = req.body;
        let dateFilter = buildDateFilter(days);

        const [incomeRecords, expenseRecords] = await Promise.all([
        Income.find({ user_id: userId, ...dateFilter }),
        Expenses.find({ user_id: userId, ...dateFilter })
        ]);

        const total_income = incomeRecords.reduce((sum, record) => sum + record.amount, 0);
        const total_expenses = expenseRecords.reduce((sum, record) => sum + record.amount, 0);
        
        const total_savings = expenseRecords.reduce((sum, record) => record.category === 'savings' ? sum + record.amount : sum, 0);
        const total_needs = expenseRecords.reduce((sum, record) => record.category === 'needs' ? sum + record.amount : sum, 0);
        const total_wants = expenseRecords.reduce((sum, record) => record.category === 'wants' ? sum + record.amount : sum, 0);
        const total_investments = expenseRecords.reduce((sum, record) => record.category === 'investments' ? sum + record.amount : sum, 0);

        const total = {
            total_income: total_income,
            total_expenses: total_expenses,
            total_needs: total_needs,
            total_wants: total_wants,
            total_investments: total_investments,
            total_savings: total_savings,
            total_balance: total_income - total_expenses
        }

        res.status(200).json(total);
    } catch(err){
        res.status(err.status || 500).json({error: err.message});
    }
}

const getSpecificRecord = async (req, res) => {
    try{
        await dbConnect();
        const userId = req.user.id;
        const {date} = req.body;
        const parsedDate = new Date(date);
        const [incomeRecord, expenseRecord] = await Promise.all([
        Income.find({ user_id: userId, date: parsedDate }),
        Expenses.find({ user_id: userId, date: parsedDate })
        ]);

        const total_income = incomeRecord.reduce((sum, record) => sum + record.amount, 0);
        const total_expenses = expenseRecord.reduce((sum, record) => sum + record.amount, 0);
        
        const total_savings = expenseRecord.reduce((sum, record) => record.category === 'savings' ? sum + record.amount : sum, 0);
        const total_needs = expenseRecord.reduce((sum, record) => record.category === 'needs' ? sum + record.amount : sum, 0);
        const total_wants = expenseRecord.reduce((sum, record) => record.category === 'wants' ? sum + record.amount : sum, 0);
        const total_investments = expenseRecord.reduce((sum, record) => record.category === 'investments' ? sum + record.amount : sum, 0);

        const total = {
            total_income: total_income,
            total_expenses: total_expenses,
            total_needs: total_needs,
            total_wants: total_wants,
            total_investments: total_investments,
            total_savings: total_savings,
            total_balance: total_income - total_expenses
        }


        res.status(200).json(total);
    } catch(err){
        res.status(err.status || 500).json({error: err.message});
    }
}


module.exports = {getRecords, getSpecificRecord};