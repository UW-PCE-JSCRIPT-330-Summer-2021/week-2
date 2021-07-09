const Calendars = require('../models/calendars');

module.exports = {};
  
module.exports.create = async (name) => {
  return await Calendars.create(name);
};

module.exports.getAll = async () => {
  return await Calendars.find().lean();
}

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
    // Throw so the route can see the type of exception and send back an appropriate error/status code.
    // It feels more appropriate for that logic to be in the route.
    throw e; 
  }
};

module.exports.removeById = async (id) => {
  await Calendars.deleteOne({ _id: id });
};
