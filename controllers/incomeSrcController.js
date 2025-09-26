const IncomeSrc = require('../models/incomeSrcModel');
const dbConnect = require('../lib/dbConnect');

const getIncomeSrc = async (req, res) => {
    try{
        const userId = req.user.id;
        await dbConnect();
        if (!userId) return res.status(404).json({error: "User not found!"});
        const income_src = await IncomeSrc.find({user_id: userId});
        if (!income_src) return res.status(404).json("No income source found!");
        res.status(201).json({income_src})
    } catch(err) {
        res.status(500).json({error: err.message})
    }
}

const addIncomeSrc = async (req, res) => {
    try{
        await dbConnect();
        const userId = req.user.id;
        const incomeSrc = req.body.income_src;
        if(!userId) return res.status(404).json({error: "User not found!"});
        if(!incomeSrc) return res.status(404).json({error: "No income source was entered"});
        const income_src = await IncomeSrc.create({user_id: userId, income_src: incomeSrc});
        if(!income_src) return res.status(500).json({error: "Unable to create the income source!"});
        res.status(201).json({income_src});
        
    } catch(err) {
        res.status(500).json({error: err.message})
    }
}

const updateIncomeSrc = async (req, res) => {
    try{
        await dbConnect();
        const userId = req.user.id;
        const {old_income_src, new_income_src} = req.body;
        if(!userId) return res.status(404).json({error: "User not found!"});
        if(!old_income_src) return res.status(404).json({error: "Old income source missing"});
        if(!new_income_src) return res.status(404).json({error: "No new income source was entered"});
        const updatedIncomeSrc = await IncomeSrc.findOneAndUpdate(
            {user_id: userId, income_src: old_income_src},
            {income_src: new_income_src},
            {new: true, runValidators: true}
        );
        if(!updatedIncomeSrc) return res.status(500).json({error: "Unable to update the income source!"});
        res.status(200).json({updatedIncomeSrc});
        
    } catch(err) {
        res.json(500).json({error: err.message})
    }
}

const deleteIncomeSrc = async (req, res) => {
    try{
        await dbConnect();
        const deleted_src = await IncomeSrc.findOneAndDelete({income_src: req.params.income_src});
        if(!deleted_src) return res.status(500).json({error: "Income source not found!"});
        res.status(201).json({deleted_src});
    } catch(err){
        res.status(500).json({error: err.message})
    }
}

module.exports = {getIncomeSrc, addIncomeSrc, updateIncomeSrc, deleteIncomeSrc}