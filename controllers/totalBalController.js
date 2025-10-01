const Income = require("../models/incomeModel");
const Expenses = require("../models/expenseModel");
const CustomError = require("../lib/customError");
const dbConnect = require("../lib/dbConnect");

const getAllTimeRecords = async (req, res) => {
  try {
    await dbConnect();
    const userId = req.user.id;

    const { days } = req.body; // can be 7, 30, 90, or "all"

    let dateFilter = {}; // default (no filter for "all")

    if (days !== "all") {
      const numDays = parseInt(days, 10); // convert string -> number
      if (!isNaN(numDays)) {
        const endDate = new Date(); // today
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - numDays);

        dateFilter = { date: { $gte: startDate, $lte: endDate } };
      }
    }

    // apply filter to both Income & Expenses
    const [incomeRecords, expenseRecords] = await Promise.all([
      Income.find({ user_id: userId, ...dateFilter }),
      Expenses.find({ user_id: userId, ...dateFilter })
    ]);

    // calculate totals
    const total_income = incomeRecords.reduce((sum, record) => sum + record.amount, 0);
    const total_expenses = expenseRecords.reduce((sum, record) => sum + record.amount, 0);

    const total_savings = expenseRecords.reduce(
      (sum, record) => record.category === "savings" ? sum + record.amount : sum,
      0
    );
    const total_needs = expenseRecords.reduce(
      (sum, record) => record.category === "needs" ? sum + record.amount : sum,
      0
    );
    const total_wants = expenseRecords.reduce(
      (sum, record) => record.category === "wants" ? sum + record.amount : sum,
      0
    );
    const total_investments = expenseRecords.reduce(
      (sum, record) => record.category === "investments" ? sum + record.amount : sum,
      0
    );

    const total = {
      total_income,
      total_expenses,
      total_needs,
      total_wants,
      total_investments,
      total_savings,
      total_balance: total_income - total_expenses
    };

    res.status(200).json(total);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

const getMonthlyRecords = async (req, res) => {
  try {
    dbConnect();
    const userId = req.user.id;
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    const last30Days = new Date();
    last30Days.setDate(today.getDate() - 30);
    last30Days.setHours(0, 0, 0, 0);

    const [incomeRecords, expenseRecords] = await Promise.all([
      Income.find({ user_id: userId, date: { $gte: last30Days, $lte: today } }),
      Expenses.find({
        user_id: userId,
        date: { $gte: last30Days, $lte: today },
      }),
    ]);

    const total_income = incomeRecords.reduce(
      (sum, record) => sum + record.amount,
      0
    );
    const total_expenses = expenseRecords.reduce(
      (sum, record) => sum + record.amount,
      0
    );

    const total_savings = expenseRecords.reduce(
      (sum, record) =>
        record.category === "savings" ? sum + record.amount : sum,
      0
    );
    const total_needs = expenseRecords.reduce(
      (sum, record) =>
        record.category === "needs" ? sum + record.amount : sum,
      0
    );
    const total_wants = expenseRecords.reduce(
      (sum, record) =>
        record.category === "wants" ? sum + record.amount : sum,
      0
    );
    const total_investments = expenseRecords.reduce(
      (sum, record) =>
        record.category === "investments" ? sum + record.amount : sum,
      0
    );

    const total = {
      total_income: total_income,
      total_expenses: total_expenses,
      total_needs: total_needs,
      total_wants: total_wants,
      total_investments: total_investments,
      total_savings: total_savings,
      total_balance: total_income - total_expenses,
    };

    res.status(200).json(total);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

// 7-day (parametric functions)
// specific date shiiiiiii

module.exports = { getAllTimeRecords, getMonthlyRecords };
