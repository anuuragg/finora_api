const {getIncomeSrc, getIncomeSrcAll, addIncomeSrc, updateIncomeSrc, deleteIncomeSrc} = require('../controllers/incomeSrcController');
const {getIncomeAll, getIncome, addIncome, updateIncome, deleteIncome} = require('../controllers/incomeController');
const verifyToken = require('../middlewares/verifyToken');
const express = require('express');
const router = express.Router();

router.get('/get-all-income-src', verifyToken, getIncomeSrcAll);
router.get('/get-income-src/:id', verifyToken, getIncomeSrc);
router.post('/add-income-src', verifyToken, addIncomeSrc);
router.put('/update-income-src/:id', verifyToken, updateIncomeSrc);
router.delete('/delete-income-src/:id', verifyToken, deleteIncomeSrc);

router.get('/get-all-income', verifyToken, getIncomeAll);
router.get('/get-income/:id', verifyToken, getIncome);
router.post('/add-income', verifyToken, addIncome);
router.put('/update-income/:id', verifyToken, updateIncome);
router.delete('/delete-income/:id', verifyToken, deleteIncome);

module.exports = router;