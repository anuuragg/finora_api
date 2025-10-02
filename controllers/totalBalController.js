const Income = require('../models/incomeModel');
const Expenses = require('../models/expenseModel');
const CustomError = require('../lib/customError');
const dbConnect = require('../lib/dbConnect');
const buildDateFilter = require('../lib/dateFilter');
const calculateTotals = require('../lib/calculateTotals');

const getRecords = async (req, res) => {
    try{
        await dbConnect();
        const userId = req.user.id;
        const {days} = req.body;
        let dateFilter = buildDateFilter(days);

        const [incomeRecords, expenseRecords, subCatRecords] = await Promise.all([
            Income.find({ user_id: userId, ...dateFilter }),
            Expenses.find({ user_id: userId, ...dateFilter })
            .populate("sub_category_id", "sub_cat_name -_id")
        ]);
        console.log(expenseRecords)
        const total = calculateTotals(incomeRecords, expenseRecords);
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

        const total = calculateTotals(incomeRecord, expenseRecord);
        res.status(200).json(total);
    } catch(err){
        res.status(err.status || 500).json({error: err.message});
    }
}


module.exports = {getRecords, getSpecificRecord};