const {getProfile, deleteProfile, updateProfile} = require('../controllers/userController');
const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();

router.get('/get-user', verifyToken, getProfile);
router.put('/update-user/:id', verifyToken, updateProfile);
router.delete('/delete-user/:id', verifyToken, deleteProfile);

module.exports = router;
