const Calendars = require('../models/calendars');

module.exports = {};
  

module.exports.create = async (name) => {
  return await Calendars.create({ name });
};

module.exports.getById = async (id) => {
  //console.log(`getById: id = ${id}`);
  try {
    const calendar = await Calendars.findOne({ _id: id }).lean();
    return calendar;
  } catch (e) {
    return null;
  }
};

module.exports.getAll = async () => {
  //console.log(`getAll: `);
  try {
    const calendar = await Calendars.find().lean();
    return calendar;
  } catch (e) {
    return null;
  }
};

module.exports.updateById = async (id, newData) => {
  // console.log(`updateById: newData = ${JSON.stringify(newData)}`);
  // console.log(`updateById: id = ${id}`);
  try {
    const calendars = await Calendars.findOneAndUpdate({ _id: id }, newData, { new: true }).lean();
    return calendars;
  } catch (e) {
    console.log(e);
    return null;
  }
};

module.exports.removeById = async (id) => {
    // console.log(`removeById: id = ${id}`);
  try {
    const calendars = await Calendars.remove({ _id: id }).lean();
    return calendars;
  } catch (e) {
    // console.log(e);
    return null;
  }
};