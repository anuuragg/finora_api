const verifyToken = require('../middlewares/verifyToken');
const {getRecords, getSpecificRecord} = require('../controllers/totalBalController');
const express = require('express');
const router = express.Router();

router.get('/get-records', verifyToken, getRecords);
router.get('/get-specific-record', verifyToken, getSpecificRecord);

module.exports = router;