const express = require('express');
const router = express.Router();

// Middleware to check if the user is logged in
function isLoggedIn(req, res, next) {
    if (req.session && req.session.userId) {
        return next();
    } else {
        res.status(401).json({ isLoggedIn: false, message: "User is not logged in." });
    }
}

// GET /api/session to check user session status
router.get('/session', (req, res) => {
    res.status(200).json({
        isLoggedIn: true,
        message: "User is logged in.",
        userId: req.session.userId,
        // Optionally include more user details as needed
    });
});

module.exports = router;
