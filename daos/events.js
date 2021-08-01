const Events = require('../models/events');

module.exports = {};
  
module.exports.create = async (event) => {
  
    // console.log(`create: name = ${event.name}`);
    // console.log(`create: calendarId = ${event.calendarId}`);
  const newEvent = await Events.create({name: event.name, date: event.date, calendarId: event.calendarId});

  // console.log(newEvent);
  // const events = await Events.findOne({ _id: newEvent._id, calendarId: newEvent.calendarId }).lean();
  // const events = await Events.findOne({name: event.name}).lean();
  // console.log(events);

  // const results = await model.find(query).lean();
   return newEvent;
};

  
/* module.exports.create = async (events, calendarId) => {
  const shinyEvents = {...events, calendarId};

  console.log(shinyEvents.calendarId);
const newEvents = await Events.insertMany(shinyEvents);
return newEvents;
  return module.exports.getById(shinyEvents.calendarId, newEvents._id);
}; */


module.exports.getByCalendarId = async (id) => {
    // console.log(`getByCalendarId: id = ${id}`);
  try {
    const events = await Events.find({ calendarId: id }).lean();
    return events;
  } catch (e) {
    console.log(e);
    return null;
  }
};


module.exports.getById = async (cId, id) => {
  // console.log(`getById: cId = ${cId}, id = ${id}`);
  try {
    const events = await Events.findOne({ _id: id, calendarId: cId }).lean();
    return events;
  } catch (e) {
    return null;
  }
};

module.exports.updateById = async (eventId, newData) => {
    console.log(`updateById: newData = ${newData}`);
    console.log(`updateById: eventId = ${eventId}`);
  try {
    const events = await Events.findOneAndUpdate({ _id: eventId }, newData).lean();
    return events;
  } catch (e) {
    return null;
  }
};