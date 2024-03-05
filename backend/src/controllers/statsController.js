// backend/src/controllers/statsController.js

const Stat = require('../models/Stat');

// Create or update statistics
exports.updateStats = async (req, res) => {
    const { date, views, earnings, subscribers } = req.body;

    try {
        const stats = await Stat.findOneAndUpdate(
            { userId: req.user.id, date: date },
            { views, earnings, subscribers },
            { new: true, upsert: true }
        );

        res.json({
            message: 'Stats updated successfully',
            data: stats,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get statistics for a user
exports.getUserStats = async (req, res) => {
    try {
        const stats = await Stat.find({ userId: req.user.id }).sort({ date: -1 });
        if (!stats) {
            return res.status(404).json({ message: 'Stats not found' });
        }

        res.json(stats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get specific stat detail
exports.getStatDetail = async (req, res) => {
    const { statId } = req.params;

    try {
        const stat = await Stat.findById(statId);
        if (!stat) {
            return res.status(404).json({ message: 'Stat not found' });
        }

        res.json(stat);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
