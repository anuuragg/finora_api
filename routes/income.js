const {getIncomeSrc, addIncomeSrc, updateIncomeSrc, deleteIncomeSrc} = require('../controllers/incomeSrcController');
const {getIncome, addIncome, updateIncome, deleteIncome} = require('../controllers/incomeController');
const verifyToken = require('../middlewares/verifyToken');
const express = require('express');
const router = express.Router();

router.get('/get-income-src', verifyToken, getIncomeSrc);
router.post('/add-income-src', verifyToken, addIncomeSrc);
router.put('/update-income-src', verifyToken, updateIncomeSrc);
router.delete('/delete-income-src/:income_src', verifyToken, deleteIncomeSrc);

router.get('/get-income', verifyToken, getIncome)
router.post('/add-income', verifyToken, addIncome);
router.put('/update-income/:id', verifyToken, updateIncome);
router.delete('/delete-income/:id', verifyToken, deleteIncome);

module.exports = router;