const Calendars = require('../models/calendars');

module.exports = {};

module.exports.create = async (newCalendar) => {
  try {
    const thisCalendar=await Calendars.create(newCalendar);
    return thisCalendar;
  } catch (e) {
    return null;
  }
};

module.exports.getById = async (id) => {
  try {
    const calendarById = await Calendars.findById(id).lean();
    return calendarById;
  } catch (e) {
    return null;
  }
};

module.exports.getAllCalendars = async () => {
  try{
    const allCalendars = await Calendars.find();
    return allCalendars;
  } catch(e) {
    return null;
  }
};

module.exports.updateById = async (id, newData) => {
  try {
    const calendarUpdateId = await Calendars.findByIdAndUpdate(id, {newData}, { new: true }).lean();
    return calendarUpdateId;
  } catch (e) {
    return null;
  }
};

module.exports.deleteById = async (id) => {
  try {
    await Calendars.findByIdAndRemove(id).lean();
  } catch (e) {
    return null;
  }
};
