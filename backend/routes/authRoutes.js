const express = require('express');
const { handleAuthCallback, initiateAuth } = require('../controllers/authController');
const router = express.Router();

router.get('/', initiateAuth);
router.get('/callback', handleAuthCallback);

module.exports = router;
