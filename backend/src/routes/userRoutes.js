// backend/src/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const { protect } = require('../config/auth');

// Route for user registration
router.post('/register', registerUser);

// Route for user login
router.post('/login', loginUser);

// Route for fetching the logged-in user's profile, protected
router.get('/profile', protect, getUserProfile);

module.exports = router;
