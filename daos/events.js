const Events = require('../models/events');

module.exports = {};

module.exports.getEventById = async (id) => {
  try {
    return await Events.findOne({ _id: id }).lean();
  } catch (e) {
    return null;
  }
};

module.exports.createEvent = async (event) => {
  try {
    return await Events.create(event);
  } catch (e) {
    return null;
  }
};

module.exports.updateEventById = async (id, newData) => {
  try {
    const updatedEvent = await Events.findOneAndUpdate({ _id: id }, newData, { new: true }).lean();
    return updatedEvent;
  } catch (e) {
    return null;
  }
};

module.exports.deleteEventById = async (id) => {
  try {
    return await Events.deleteOne({ _id: id});
  } catch (e) {
    return null;
  }
};

module.exports.getAllEvents = async (calendarId) => {
  try {
    return await Events.find({ calendarId: calendarId}).lean();
  } catch (e) {
    return null;
  }
};
