const Expenses = require('../models/expenseModel');
const SubCategory = require('../models/subCategoryModel');
const dbConnect = require('../lib/dbConnect');
const CustomError = require('../lib/customError');

const getAllExpenses = async (req, res) => {
    try{
        await dbConnect();
        const userId = req.user.id;
        const expenses = await Expenses.find({user_id: userId}).lean();
        if(expenses.length === 0) throw new CustomError("No expenses found", 404);
        for (let i in expenses) {
            if (!expenses[i].sub_category_id) continue;
            const sub_cat_id = expenses[i].sub_category_id.toString();
            if(!sub_cat_id) continue
            const sub_category = await SubCategory.findById(sub_cat_id).select('sub_cat_name -_id');
            expenses[i].sub_category_name = sub_category.sub_cat_name;
        }
        res.status(200).json(expenses);
    } catch(err){
        res.status(err.status || 500).json({ error: err.message });
    }
}

const getExpense = async (req, res) => {
    try{
        await dbConnect();
        const expense = await Expenses.findById(req.params.id);
        if (expense.length === 0) throw new CustomError("Expense not found!", 404);
        res.status(200).json(expense);
    } catch(err){
        res.status(err.status || 500).json({ error: err.message });
    }
}

const createExpense = async (req, res) => {
    try{
        await dbConnect();
        const userId = req.user.id;
        const {category, sub_category_id, amount, note, date} = req.body;
        if (!category || !amount || !note || !date) {
            throw new CustomError("All fields are required", 400);
        }
        const parsedDate = new Date(date);
        const expenseData = {
            user_id: userId,
            category: category,
            sub_category_id: sub_category_id,
            amount: amount,
            note: note,
            date: parsedDate,
            year: parsedDate.getUTCFullYear(),
            month: parsedDate.getUTCMonth() + 1
        }
        const expense = await Expenses.create(expenseData);
        if(expense.length === 0) throw new CustomError("Couldn't add the expense", 404);
        res.status(200).json(expense);
        
    } catch(err) {
        res.status(err.status || 500).json({ error: err.message });
    }
}

const updateExpense = async(req, res) => {
    try{
        await dbConnect();
        const {category, sub_category_id, amount, note, date} = req.body;
        const expenseData = {}
        if (category) expenseData.category = category;
        if (sub_category_id) expenseData.sub_category_id = sub_category_id;
        if (amount) expenseData.amount = amount;
        if (note) expenseData.note = note;
        if (date) {
            const parsedDate = new Date(date);
            expenseData.date = parsedDate;
            expenseData.year = parsedDate.getUTCFullYear();
            expenseData.month = parsedDate.getUTCMonth() + 1;
        }
        const updatedExpense = await Expenses.findByIdAndUpdate(req.params.id, expenseData, {new: true});
        if(updatedExpense.length === 0) throw new CustomError("Couldn't update the expense", 500);
        res.status(200).json(updatedExpense);
    } catch(err) {
        res.status(err.status || 500).json({ error: err.message });
    }
}

const deleteExpense = async (req, res) => {
    try{
        await dbConnect();
        const deletedExpense = await Expenses.findByIdAndDelete(req.params.id);
        if(deleteExpense.length === 0) throw new CustomError("Expense not found", 404);
        res.status(200).json(deletedExpense);
    } catch(err){
        res.status(err.status || 500).json({ error: err.message });
    }
}

module.exports = {createExpense, getAllExpenses, getExpense, updateExpense, deleteExpense};