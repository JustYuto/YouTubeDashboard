const User = require('../models/User');

const updatePersonalData = async (userId, updatedData) => {
    return await User.findByIdAndUpdate(userId, { $set: { 'personalData': updatedData } }, { new: true });
};

const updateSocialLinks = async (userId, updatedLinks) => {
    return await User.findByIdAndUpdate(userId, { $set: { 'socialProfiles': updatedLinks } }, { new: true });
};

const updateYoutubeChannels = async (userId, youtubeChannels) => {
    return await User.findByIdAndUpdate(userId, { $set: { 'youtubeChannels': youtubeChannels } }, { new: true });
};

module.exports = {
    updatePersonalData,
    updateSocialLinks,
    updateYoutubeChannels
};
