const Calendars = require('../models/calendars');
  
module.exports.create = async (calendar) => {
  return await Calendars.create(calendar);
};

module.exports.getById = async (id) => {
  try {
    const calendar = await Calendars.findOne({ _id: id }).lean();
    return calendar;
  } catch (e) {
    return null;
  }
};

module.exports.getAll = async (id) => {
  try {
    const calendar = await Calendars.find().lean();
    return calendar;
  } catch (e) {
    return null;
  }
};

module.exports.updateById = async (id, newData) => {
  try {
    const calendar = await Calendars.findOneAndUpdate({ _id: id }, newData, { new: true }).lean();
    return calendar;
  } catch (e) {
    return null;
  }
};

module.exports.removeById = async (id) => {
  try {
    const calendar = await Calendars.findOneAndRemove({ _id: id });
    return calendar;
  } catch (e) {
    return null;
  }
};