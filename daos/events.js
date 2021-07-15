const Events = require('../models/events');

module.exports = {};

module.exports.create = async (event) => {
  return await Events.create(event);
};

module.exports.getAll = async (calendarID) => {
  try {
    return await Events.find({ calendarID }).lean();
  } catch (e) {
    return null;
  }
};

module.exports.getById = async (calendarID, id) => {
  try {
    const event = await Events.findOne({ _id: id, calendarID }).lean();
    return event;
  } catch (e) {
    return null;
  }
};

module.exports.updateById = async (calendarID, id, newData) => {
  try {
    const event = await Events.findOneAndUpdate({ _id: id, calendarID }, newData, { new: true }).lean();
    return event;
  } catch (e) {
    return null;
  }
};

module.exports.removeById = async (calendarID, id) => {
  try {
    return await Events.deleteOne({ _id: id, calendarID });
  } catch (e) {
    return null;
  }
};
