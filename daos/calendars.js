const Calendars = require('../models/calendars');

const Events = require('../models/events');

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



module.exports.getEvents = async ( id) => {
  try {
    const calendar = await Calendars.findOne({ _id: id });
    if(calendar){
      const calEvents = await Events.find({calendarId: id});
      if(calEvents){
        return calEvents;
      }
      return null;
    } else {
      return null;
    }
   
  } catch (e) {
    return null;
  }
};



module.exports.getEventById = async ( eventId) => {
  try {
    const event = await Events.findOne({ _id: eventId}).lean();
    return event;
  } catch (e) {
    return null;
  }
};



module.exports.createEvent = async (calId, event) => {
  try {
  
    const calendar = await Calendars.findOne({ _id: calId });
    if(calendar){
      const id = calendar._id;
      event.calendarId = calendar._id;
      const events = await Events.create(event);
   
      return events;
    }

    return null;    
  } catch (e) {
    return null;
  }
  
};


module.exports.updateEvent = async (id, newDate, newName) => {
  try {
  
    const event = await Events.findOneAndUpdate({ _id: id }, {$set:{date:newDate, name:newName }}, { new: true }).lean();
    return event;
  } catch (e) {
    return null;
  }
};


module.exports.deleteById = async (id) => {

  try {
 
    const rez = await Events.remove({ _id: id });
    return rez;

  } catch (e) {
    return null;
  }
 
};
