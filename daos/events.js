const Events = require('../models/events');

module.exports = {};
  
module.exports.create = async (eventObject) => {
  return await Events.create(eventObject);
};

module.exports.getAllByCalendarId = async (id) => {
  try {
    return await Events.find({ calendarId: id}).lean();
  }
  catch (e) {
    return null;
  }
}

module.exports.getById = async (id) => {
  try {
    const eventObject = await Events.findOne({ _id: id }).lean();
    return eventObject;
  } catch (e) {
    return null;
  }
};

module.exports.removeById = async (id) => {
  try {
    await Events.deleteOne({_id: id});
  }
  catch (e) {
    return null;
  }
}

module.exports.updateById = async (id, newData) => {
  try {
    const eventObject = await Events.findOneAndUpdate({ _id: id }, newData, { new: true }).lean();
    return eventObject;
  } catch (e) {
    return null;
  }
};