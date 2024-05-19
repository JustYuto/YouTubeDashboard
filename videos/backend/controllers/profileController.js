const profileService = require('../services/profileService');
const User = require('../models/User');

exports.updatePersonalData = async (req, res) => {
    try {
        const userId = req.session.userId;
        const updatedData = req.body;
        const updatedUser = await profileService.updatePersonalData(userId, updatedData);
        res.json({ message: "Personal data updated successfully.", updatedUser });
    } catch (error) {
        console.error('Update personal data error:', error);
        res.status(500).send('Error updating personal data');
    }
};

exports.updateSocialLinks = async (req, res) => {
    try {
        const userId = req.session.userId;
        const updatedLinks = req.body;
        const updatedUser = await profileService.updateSocialLinks(userId, updatedLinks);
        res.json({ message: "Social links updated successfully.", updatedUser });
    } catch (error) {
        console.error('Update social links error:', error);
        res.status(500).send('Error updating social links');
    }
};

exports.updateYoutubeChannels = async (req, res) => {
    try {
        const userId = req.session.userId;
        const { youtubeChannels } = req.body;
        const updatedUser = await profileService.updateYoutubeChannels(userId, youtubeChannels);
        res.json({ message: "YouTube channels updated successfully.", updatedUser });
    } catch (error) {
        console.error('Update YouTube channels error:', error);
        res.status(500).send('Error updating YouTube channels');
    }
};

exports.getProfile = async (req, res) => {
    try {
        console.log(req.session.userId)
      const user = await User.findById(req.session.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ user: user }); // Adjust according to your user model
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };
