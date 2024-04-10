const CalendarEvent = require('../models/CalendarEvent');

const createEvent = async (eventData) => {
  const event = new CalendarEvent(eventData);
  await event.save();
  return event;
};

const deleteEvent = async (id) => {
  await CalendarEvent.findByIdAndDelete(id);
};

const updateEvent = async (id, eventData) => {
  const event = await CalendarEvent.findByIdAndUpdate(id, eventData, { new: true });
  return event;
};

const getEvents = async () => {
  return await CalendarEvent.find({});
};

module.exports = {
  createEvent,
  deleteEvent,
  updateEvent,
  getEvents,
};
