const Calendars = require('../models/calendars');

module.exports = {};
  
module.exports.create = async (name) => {
  console.log(`create: name = ${name}`);
  return await Calendars.create({ name });
};

module.exports.getById = async (id) => {
  console.log(`getById: id = ${id}`);
  try {
    const calendar = await Calendars.findOne({ _id: id }).lean();
    return calendar;
  } catch (e) {
    return null;
  }
};

module.exports.updateById = async (id, newData) => {
  console.log(`updateById: id = ${id}`);
  try {
    const calendar = await Calendars.findOneAndUpdate({ _id: id }, newData, { new: true }).lean();
    return calendar;
  } catch (e) {
    return null;
  }
};