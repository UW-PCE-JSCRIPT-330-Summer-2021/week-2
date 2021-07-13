const Calendars = require('../models/calendars');

module.exports = {};
  
module.exports.create = async (calandarObject) => {
  return await Calendars.create({ calandarObject });
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
    remove (e);
  }
};
module.exports.removeById = async (id) => {
  await Calendars.deleteOne({_id:id });
};