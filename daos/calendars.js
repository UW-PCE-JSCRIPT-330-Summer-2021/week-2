//const calendars = require('../models/calendars');
const Calendars = require('../models/calendars');

module.exports = {};

module.exports.getAll = async () => {
  try {
    const calendar = await Calendars.find();
    return calendar;
  } catch (e) {
    return res.status(404);
  }
};

module.exports.getById = async (id) => {
  try {
    const calendar = await Calendars.findOne({ _id: id }).lean();
    if (!calendar) {
      return res.status(404);
    }
    return calendar;
  } catch (e) {
    return null;
  }
};

module.exports.updateById = async (id, newData) => {
  try {
    const calendar = await Calendars.findOneAndUpdate({ _id: id }, newData, {
      new: true,
    }).lean();

    if (!calendar) {
      return res.status(400);
    }
    return calendar;
  } catch (e) {
    // return null;
    return res.status(404);
  }
};

module.exports.removeById = async (id) => {
  try {
    const calendar = await Calendars.findOneAndRemove({ _id: id }).lean();
    if (!calendar) {
      res.status(404);
    }
    return calendar;
  } catch (e) {
    res.status(404);
    // return null;
  }
};

module.exports.create = async (name) => {
  return await Calendars.create(name);
};
