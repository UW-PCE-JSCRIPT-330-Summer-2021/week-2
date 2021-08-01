const Events = require('../models/events');

module.exports = {};
  
module.exports.create = async (name) => {
    console.log(`create: name = ${name}`);
  return await Events.create({ name });
};


module.exports.getByCalendarId = async (id) => {
    console.log(`getByCalendarId: id = ${id}`);
  try {
    const events = await Events.find({ calendarId: id }).lean();
    return events;
  } catch (e) {
    console.log(e);
    return null;
  }
};


module.exports.getById = async (cId, id) => {
  console.log(`getById: id = ${id}`);
try {
  const events = await Events.findOne({ _id: id, calendarId: cId }).lean();
  return events;
} catch (e) {
  return null;
}
};

module.exports.updateById = async (id, newData) => {
    console.log(`updateById: id = ${id}`);
  try {
    const events = await Events.findOneAndUpdate({ _id: id }, newData, { new: true }).lean();
    return events;
  } catch (e) {
    return null;
  }
};