const IncomeSrc = require("../models/incomeSrcModel");
const dbConnect = require("../lib/dbConnect");
const CustomError = require('../lib/customError');

const getIncomeSrcAll = async (req, res) => {
  try {
    await dbConnect();
    const userId = req.user.id;
    const income_src = await IncomeSrc.find({ user_id: userId });
    res.status(200).json({ income_src });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

const getIncomeSrc = async (req, res) => {
    try{
        await dbConnect();
        const income_src = await IncomeSrc.findById(req.params.id);
        res.status(200).json(income_src);
    } catch(err){
        res.status(err.status || 500).json({ error: err.message });
    }
}

const addIncomeSrc = async (req, res) => {
  try {
    await dbConnect();
    const userId = req.user.id;
    const incomeSrc = req.body.income_src;
    if (!incomeSrc) throw new CustomError("No income source was entered", 400);
    const income_src = await IncomeSrc.create({
      user_id: userId,
      income_src: incomeSrc,
    });
    res.status(201).json({ income_src });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

const updateIncomeSrc = async (req, res) => {
  try {
    await dbConnect();
    const income_src = req.body;
    if (!income_src) throw new CustomError("No income source was entered to update", 400);
    const updatedIncomeSrc = await IncomeSrc.findByIdAndUpdate(req.params.id, income_src, { new: true });
    res.status(200).json({ updatedIncomeSrc });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

const deleteIncomeSrc = async (req, res) => {
  try {
    await dbConnect();
    const deleted_src = await IncomeSrc.findByIdAndDelete(req.params.id);
    res.status(200).json({ deleted_src });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

module.exports = {
  getIncomeSrc,
  getIncomeSrcAll,
  addIncomeSrc,
  updateIncomeSrc,
  deleteIncomeSrc,
};
