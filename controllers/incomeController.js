const Income = require('../models/incomeModel');
const IncomeSrc = require('../models/incomeSrcModel');
const dbConnect = require('../lib/dbConnect');
const CustomError = require('../lib/customError');

const getIncomeAll = async (req, res) => {
    try {
        await dbConnect();
        const userId = req.user.id;
        const incomeData = await Income.find({ user_id: userId })
        .populate("source", "income_src")
        .lean();
    res.status(200).json(incomeData);
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message });
    }
};

const getIncome = async (req, res) => {
    try{
        await dbConnect();
        const income = await Income.findById(req.params.id)
        .populate("source", "income_src")
        .lean();
        res.status(200).json(income);
    } catch(err){
        res.status(err.status || 500).json({ error: err.message });
    }
}

const addIncome = async (req, res) => {
    try{
        await dbConnect();
        const userId = req.user.id;
        const {amount, source, note, date} = req.body;
        const requiredFields = { amount, source };
        for (const [key, value] of Object.entries(requiredFields)) {
            if (!value) throw new CustomError(`${key} is required`, 400);
        }
        const incomeData = {
            user_id: userId,
            amount: amount,
            source: source,
            note: note,
            date: date
        }

        const income = await Income.create(incomeData);
        res.status(200).json(income);
    } catch(err){
        res.status(err.status || 500).json({ error: err.message });
    }
}

const updateIncome = async (req, res) => {
    try{
        await dbConnect();
        const { amount, source, note, date } = req.body;
        const updatedData = { amount, source, note, date };
        const updatedIncome = await Income.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        res.status(200).json(updatedIncome);
    } catch(err){
        res.status(err.status || 500).json({ error: err.message });
    }
}

const deleteIncome = async (req, res) => {
    try{
        await dbConnect();
        const deletedIncome = await Income.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedIncome);
    } catch(err){
        res.status(err.status || 500).json({ error: err.message });
    }
}

module.exports = {getIncomeAll, getIncome, addIncome, updateIncome, deleteIncome};