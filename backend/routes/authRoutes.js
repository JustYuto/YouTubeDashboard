const express = require('express');
const { handleAuthCallback, initiateAuth, logout } = require('../controllers/authController');
const router = express.Router();

router.get('/', initiateAuth);
router.get('/callback', handleAuthCallback);
router.get('/logout', logout);


module.exports = router;
