// backend/src/routes/statsRoutes.js

const express = require('express');
const router = express.Router();
const { updateStats, getUserStats, getStatDetail } = require('../controllers/statsController');
const { protect } = require('../config/auth');

// Route for updating or creating stats for the logged-in user
router.post('/', protect, updateStats);

// Route for getting all stats for the logged-in user
router.get('/', protect, getUserStats);

// Route for getting detailed stats by ID
router.get('/:statId', protect, getStatDetail);

module.exports = router;
