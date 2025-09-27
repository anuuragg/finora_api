const {getAllSubCategory, getSubCategory, createSubCategory, deleteSubCategory} = require('../controllers/subCatController');
const verifyToken = require('../middlewares/verifyToken');
const express = require('express');
const router = express.Router();

router.get('/get-all-sub-cat', verifyToken, getAllSubCategory);
router.get('/get-sub-cat/:id', verifyToken, getSubCategory);
router.post('/create-sub-cat', verifyToken, createSubCategory);
router.delete('/delete-sub-cat/:id', verifyToken, deleteSubCategory);

module.exports = router;