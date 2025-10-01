const verifyToken = require('../middlewares/verifyToken');
const {getAllTimeRecords, getMonthlyRecords} = require('../controllers/totalBalController');
const express = require('express');
const router = express.Router();

router.get('/get-all-time-records', verifyToken, getAllTimeRecords);
router.get('/get-monthly-records', verifyToken, getMonthlyRecords);

module.exports = router;