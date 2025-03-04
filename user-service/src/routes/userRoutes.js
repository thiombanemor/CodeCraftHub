const express = require('express');
const { registerUser, loginUser, getUserProfile, updateUserProfile, deleteUser } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Public Routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected Routes
router.get('/profile', authMiddleware, getUserProfile);
router.put('/profile/update', authMiddleware, updateUserProfile);
router.delete('/profile/delete', authMiddleware, deleteUser);

module.exports = router;
