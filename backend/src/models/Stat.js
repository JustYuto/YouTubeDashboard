// backend/src/models/Stat.js

const mongoose = require('mongoose');

const statSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    views: {
        type: Number,
        default: 0,
    },
    earnings: {
        type: Number,
        default: 0,
    },
    subscribers: {
        type: Number,
        default: 0,
    },
    token: {
        type: String,
    }
});

module.exports = mongoose.model('Stat', statSchema);
