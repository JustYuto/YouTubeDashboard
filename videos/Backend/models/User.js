const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    personalData: {
        firstName: String,
        lastName: String,
        email: { type: String, unique: true, required: true },
        phone: String,
        gender: String,
        birthday: Date,
        location: String,
    },
    socialProfiles: {
        tikTok: String,
        facebook: String,
        instagram: String,
        twitter: String,
        discord: {
            server: String,
            username: String,
        },
    },
    youtubeChannels: [String],
});

module.exports = mongoose.model('User', userSchema);
