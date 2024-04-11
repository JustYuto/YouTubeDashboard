const express = require('express');
const { getChannels, getChannelVideos, getChannelMonetaryAnalytics } = require('../controllers/youtubeController');
const router = express.Router();

router.get('/channels', getChannels);
router.get('/channels/:channelId/analytics/monetary', getChannelMonetaryAnalytics);
router.get('/videos/:playlistId', getChannelVideos);

module.exports = router;
