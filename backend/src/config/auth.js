// backend/src/config/auth.js

require('dotenv').config();
const jwt = require('jsonwebtoken');

// Secret key for JWT signing and encryption
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Generate a JWT token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, JWT_SECRET, {
        expiresIn: '30d', // Token expires in 30 days
    });
};

// Middleware to protect routes
const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, JWT_SECRET);

            // Get user from the token (you may want to fetch user from database here)
            req.user = { id: decoded.id };

            next();
        } catch (error) {
            console.error('Error in token verification:', error.message);
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { generateToken, protect };
