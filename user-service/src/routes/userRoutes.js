const express = require('express');
const {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile, // ✅ Vérifie que cette fonction existe !
    deleteUser
} = require('../controllers/userController'); // ✅ Assure-toi que ce chemin est correct !

const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Public Routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected Routes
router.get('/profile', authMiddleware, getUserProfile);
router.put('/profile/update', authMiddleware, updateUserProfile); // ✅ Vérifie que cette ligne pointe bien vers une fonction définie !
router.delete('/profile/delete', authMiddleware, deleteUser);

module.exports = router;
