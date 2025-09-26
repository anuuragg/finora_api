const {getIncomeSrc, addIncomeSrc, updateIncomeSrc, deleteIncomeSrc} = require('../controllers/incomeSrcController');
const verifyToken = require('../middlewares/verifyToken');
const express = require('express');
const router = express.Router();

router.get('/get-income-src', verifyToken, getIncomeSrc);
router.post('/add-income-src', verifyToken, addIncomeSrc);
router.post('/update-income-src', verifyToken, updateIncomeSrc);
router.delete('/delete-income-src', verifyToken, deleteIncomeSrc);

module.exports = router;