const express = require('express');
const calendarController = require('../controllers/calendarController');
const router = express.Router();

router.post('/events', calendarController.createEvent);
router.get('/events', calendarController.getEvents);
router.put('/events/:id', calendarController.updateEvent);
router.delete('/events/:id', calendarController.deleteEvent);

module.exports = router;
