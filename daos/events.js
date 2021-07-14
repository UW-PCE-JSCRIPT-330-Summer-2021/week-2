const Events = require('../models/events');

module.exports = {};

module.exports.getEventsByCalendarId = async (id) => {
  try {
    return await Events.find({ calendarId: id}).lean();
  } catch(e) {
    return null;
  }
}
  
module.exports.create = async (name) => {
  return await Events.create(name);
};

module.exports.getById = async (id) => {
  try {
    const events = await Events.findOne({ _id: id }).lean();
    return events;
  } catch (e) {
    return null;
  }
};

module.exports.updateById = async (id, newData) => {
  try {
    const events = await Events.findOneAndUpdate({ _id: id }, newData, { new: true }).lean();
    return events;
  } catch (e) {
    return null;
  }
};

module.exports.removeById = async (id) => {
  await Events.deleteOne({ _id: id });
}