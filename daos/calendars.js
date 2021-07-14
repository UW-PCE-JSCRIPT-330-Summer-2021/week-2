const Calendars = require('../models/calendars');

module.exports = {};

module.exports.create = async (name) => {
  return await Calendars.create(name);
};

module.exports.getAll = async () => {
  try {
    return await Calendars.find({}).lean();
  } catch (e) {
    return null;
  }
};

module.exports.getById = async (id) => {
  try {
    const calendar = await Calendars.findOne({ _id: id }).lean();
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
    return await Calendars.deleteOne({ _id: id });
  } catch (e) {
    return null;
  }
};