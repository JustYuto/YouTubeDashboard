const calendarService = require('../services/calendarService');

exports.createEvent = async (req, res) => {
  try {
    const event = await calendarService.createEvent(req.body);
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: "Failed to create event" });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    await calendarService.deleteEvent(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Failed to delete event" });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const event = await calendarService.updateEvent(req.params.id, req.body);
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Failed to update event" });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await calendarService.getEvents();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Failed to get events" });
  }
};
