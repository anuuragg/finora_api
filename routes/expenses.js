const {createExpense, getAllExpenses, getExpense, deleteExpense} = require('../controllers/expenseController')
const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();

router.post("/create-expense", verifyToken, createExpense);
router.get("/get-expense/:id", verifyToken, getExpense);
router.get("/get-all-expenses", verifyToken, getAllExpenses);
router.delete("/delete-expense/:id", verifyToken, deleteExpense);

module.exports = router;