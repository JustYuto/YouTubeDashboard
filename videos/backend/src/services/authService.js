// backend/src/services/authService.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { generateToken } = require('../config/auth');

// Register a new user
const register = async (userData) => {
    const { username, email, password } = userData;

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new Error('User already exists');
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    // Return the user and token
    return {
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
    };
};

// Authenticate a user and return token
const login = async (email, password) => {
    const user = await User.findOne({ email });

    // Check if user exists and password matches
    if (user && (await bcrypt.compare(password, user.password))) {
        return {
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
        };
    } else {
        throw new Error('Invalid credentials');
    }
};

// Get user profile
const getUserProfile = async (userId) => {
    const user = await User.findById(userId).select('-password');
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};

module.exports = {
    register,
    login,
    getUserProfile,
};
