const Events = require('../models/events');

module.exports = {};

module.exports.create = async (eventName) => {
  return await Events.create(eventName);
};

module.exports.updateEvent = async (id, newData) => {
  try {
    const event = await Events.findByIdAndUpdate(id, newData).lean();
    return event;
  } catch (e) {
    return null;
  }
};

module.exports.getAllEvents = async(id) => {
  try{
    return await Events.findById(id).lean();
  }catch(e){
    return null;
  }

}

module.exports.getById = async(id) => {
    try {
      const eventById = await Events.findById(id).lean();
      return eventById;
    } catch (e) {
      return null;
    }
};

module.exports.deleteById = async(id) => {
    try {
      await Events.findByIdAndRemove(id).lean();
    } catch (e) {
      return null;
    }
};
