const Expenses = require('../models/expenseModel');
const SubCategory = require('../models/subCategoryModel');
const dbConnect = require('../lib/dbConnect');

const getAllExpenses = async (req, res) => {
    try{
        await dbConnect();
        const userId = req.user.id;
        if(!userId) return res.status(404).json("User ID missing");
        const expenses = await Expenses.find({user_id: userId}).lean();
        console.log(expenses)
        if(!expenses) return res.status(404).json("No expenses found");
        for (let i in expenses) {
            if (!expenses[i].sub_category_id) continue;
            const sub_cat_id = expenses[i].sub_category_id.toString();
            if(!sub_cat_id) continue
            const sub_category = await SubCategory.findById(sub_cat_id).select('sub_cat_name -_id');
            expenses[i].sub_category_name = sub_category.sub_cat_name;
        }
        res.status(200).json(expenses);
    } catch(err){
        res.status(500).json({error: err.message})
    }
}

const getExpense = async (req, res) => {
    try{
        await dbConnect();
        const expense = await Expenses.findById(req.params.id);
        if (!expense) return res.status(404).json({error: "Expense not found!"});
        res.status(200).json(expense);
    } catch(err){
        res.status(500).json({error: err.message})
    }
}

const createExpense = async (req, res) => {
    try{
        await dbConnect();
        const userId = req.user.id;
        if(!userId) return res.status(404).json("User ID missing")
        const {category, sub_category_id, amount, note, date} = req.body;
        if (!category || !amount || !note || !date) {
            return res.status(400).json({ error: "All fields are required" });
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
        if(!expense) return res.status(404).json("Couldn't add the expense");
        res.status(200).json(expense);
        
    } catch(err) {
        res.status(500).json({err: err.message})
    }
}

const deleteExpense = async (req, res) => {
    try{
        await dbConnect();
        const deletedExpense = await Expenses.findByIdAndDelete(req.params.id);
        if(!deleteExpense) return res.status(404).json({ error: "Expense not found" });
        res.status(200).json(deletedExpense);
    } catch(err){
        res.status(500).json({error: err.message})
    }
}

module.exports = {createExpense, getAllExpenses, getExpense, deleteExpense};