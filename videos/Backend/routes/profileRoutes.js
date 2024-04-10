const express = require('express');
const profileController = require('../controllers/profileController');

const router = express.Router();

router.patch('/personal-data', profileController.updatePersonalData);
router.patch('/social-links', profileController.updateSocialLinks);
router.patch('/youtube-channels', profileController.updateYoutubeChannels);

module.exports = router;
