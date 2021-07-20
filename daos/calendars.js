const Calendars = require('../models/calendars');

module.exports = {};
  
module.exports.create = async (name) => {
     return await Calendars.create(name);

 };

// Get all
module.exports.getAll = () => {
   return Calendars.find();
 };
//Get by ID
module.exports.getById = async (id) => {
  try {
    const calendar = await Calendars.findOne({ _id: id }).lean();
    return calendar;
  } catch (e) {
    return null;
  }
};
//Update by ID
module.exports.updateById = async (id, newData) => {
  try {
    const calendar = await Calendars.findOneAndUpdate({ _id: id }, newData, { new: true }).lean();
    return calendar;
  } catch (e) {
    return null;
  }
};
//Remove by ID
module.exports.removebyId = async (id) => {
  try {
    return await Calendars.deleteOne({ _id: id});
  } catch (e) {
    return null;
  }
};