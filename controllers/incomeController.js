const Income = require('../models/incomeModel');
const IncomeSrc = require('../models/incomeSrcModel');
const dbConnect = require('../lib/dbConnect');

const getIncome = async (req, res) => {
    try{
        await dbConnect();
        const userId = req.user.id;
        if (!userId) return res.status(404).json({error: "User not found!"});
        const incomeData = await Income.find({user_id: userId}).lean();
        if (!incomeData) return res.status(404).json({error: "Can't fetch income"});
        for (let i in incomeData){
            const src_id = incomeData[i].source.toString();
            const src = await IncomeSrc.findById(src_id).select('income_src -_id');
            if (!src) return res.status(404).json({error: "Unable to get the income source"})
            incomeData[i].source = src.income_src;
        }
        res.status(200).json(incomeData);
    } catch(err) {
        res.status(500).json({error: err.message})
    }
}

const addIncome = async (req, res) => {
    try{
        await dbConnect();
        const userId = req.user.id;
        if (!userId) return res.status(404).json({error: "User not found!"});
        const {amount, source, note, date} = req.body;
        const requiredFields = { amount, source };
        for (const [key, value] of Object.entries(requiredFields)) {
            if (!value) {
                return res.status(400).json({ error: `${key} is required` });
            }
        }
        const incomeData = {
            user_id: userId,
            amount: amount,
            source: source,
            note: note,
            date: date
        }

        const income = await Income.create(incomeData);
        if(!income) return res.status(500).json("Couldn't add the expense to the DB");
        res.status(200).json(income);
    } catch(err){
        res.status(500).json({error: err.message})
    }
}

const updateIncome = async (req, res) => {
    try{
        await dbConnect();
        const userId = req.user.id;
        if (!userId) return res.status(404).json({ error: "User not found!" });
        const id = req.params.id;
        if (!id) return res.status(400).json({ error: "Income ID is required" });
        const { amount, source, note, date } = req.body;
        const updatedData = { amount, source, note, date };
        const updatedIncome = await Income.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedIncome) return res.status(404).json({ error: "Income not found!" });
        res.status(200).json(updatedIncome);
    } catch(err){
        res.status(500).json({error: err.message})
    }
}

const deleteIncome = async (req, res) => {
    try{
        await dbConnect();
        const deletedIncome = await Income.findByIdAndDelete(req.params.id);
        if(!deletedIncome) return res.status(404).json({ error: "Income not found" });
        res.status(200).json(deletedIncome);
    } catch(err){
        res.status(500).json({error: err.message})
    }
}

module.exports = {getIncome, addIncome, updateIncome, deleteIncome};