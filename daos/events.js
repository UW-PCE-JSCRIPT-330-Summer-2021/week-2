const Events = require('../models/events');

module.exports = {};

module.exports.create = async (event) => {
  return await Events.create(event);
};

module.exports.getAll = async (calendarId) => {
  try {
    return await Events.find({ calendarId }).lean();
  } catch (e) {
    return null;
  }
};

module.exports.getById = async (calendarId, id) => {
  try {
    const event = await Events.findOne({ _id: id, calendarId }).lean();
    return event;
  } catch (e) {
    return null;
  }
};

module.exports.updateById = async (calendarId, id, newData) => {
  try {
    const event = await Events.findOneAndUpdate({ _id: id, calendarId }, newData, { new: true }).lean();
    return event;
  } catch (e) {
    return null;
  }
};

module.exports.removeById = async (calendarId, id) => {
  try {
    return await Events.deleteOne({ _id: id, calendarId });
  } catch (e) {
    return null;
  }
};
