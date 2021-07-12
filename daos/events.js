const Calendars = require('../models/calendars');

const Events = require('../models/events');

module.exports = {};
  

module.exports.getAll = async ( id) => {
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


module.exports.getById = async ( eventId) => {
  try {
    const event = await Events.findOne({ _id: eventId}).lean();
    return event;
  } catch (e) {
    return null;
  }
};



module.exports.create = async (calId, event) => {
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


module.exports.updateById = async (id, newDate, newName) => {
  try {
  
    const event = await Events.findOneAndUpdate({ _id: id }, {$set:{date:newDate, name:newName }}, { new: true }).lean();
    return event;
  } catch (e) {
    return null;
  }
};


module.exports.removeById = async (id) => {

  try {
 
    const rez = await Events.remove({ _id: id });
    return rez;

  } catch (e) {
    return null;
  }
 
};
