const Calendars = require('../models/calendars');


module.exports = {};
  
module.exports.create = async (name) => {
  try {
    return await Calendars.create(name);
  }catch (e) {
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

module.exports.updateById = async (id, newName) => {
  try {
    const calendar = await Calendars.findOneAndUpdate({ _id: id }, {$set:{name:newName}}, { new: true }).lean();
    return calendar;
  } catch (e) {
    return null;
  }
};

module.exports.getAll = async () => {
  try {
    const calendar = await Calendars.find({});
    return calendar;
  } catch (e) {
    return null;
  }
};



module.exports.removeById = async (id) => {

  try {
 
    const rez = await Calendars.remove({ _id: id });
    return rez;

  } catch (e) {
    return null;
  }
 
};


