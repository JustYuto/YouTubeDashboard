const express = require('express');
const profileController = require('../controllers/profileController');
const { isLoggedIn } = require('../controllers/authController');

const router = express.Router();

router.patch('/personal-data', profileController.updatePersonalData);
router.patch('/social-links', profileController.updateSocialLinks);
router.patch('/youtube-channels', profileController.updateYoutubeChannels);
router.get('/me', profileController.getProfile);

module.exports = router;
