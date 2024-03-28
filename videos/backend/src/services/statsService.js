// backend/src/services/statsService.js

const Stat = require('../models/Stat');

// Update or create statistics for a user
const updateOrCreateStats = async (userId, statsData) => {
    const { date, views, earnings, subscribers } = statsData;
    const stats = await Stat.findOneAndUpdate(
        { userId, date },
        { views, earnings, subscribers },
        { new: true, upsert: true }
    );
    return stats;
};

// Retrieve all statistics for a user
const getUserStats = async (userId) => {
    const stats = await Stat.find({ userId }).sort({ date: -1 });
    if (!stats) {
        throw new Error('No stats found');
    }
    return stats;
};

// Get detailed statistics by ID
const getStatDetail = async (statId) => {
    const stat = await Stat.findById(statId);
    if (!stat) {
        throw new Error('Stat not found');
    }
    return stat;
};

module.exports = {
    updateOrCreateStats,
    getUserStats,
    getStatDetail,
};
