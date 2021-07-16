const Events = require('../models/events');

module.exports = {};

module.exports.getAll = async (id) => {
  try {
    const event = await Events.find({ calendarId: id });
    return event;
  } catch (e) {
    return res.status(404);
  }
};

module.exports.getById = async (id, calendarId) => {
  try {
    const event = await Events.findOne({
      calendarId: calendarId,
      _id: id,
    }).lean();
    // if (!event) {
    //   res.status(404).json({
    //     message: 'Event not found',
    //   });
    // }
    return event;
  } catch (e) {
    res.status(404);
    //return null;
  }
};

module.exports.updateById = async (id, calendarId, newData) => {
  try {
    const event = await Events.findOneAndUpdate(
      { calendarId: calendarId, _id: id },
      newData,
      {
        new: true,
      }
    ).lean();
    return event;
  } catch (e) {
    // return null;
    return res.status(404);
  }
};

module.exports.removeById = async (id) => {
  try {
    const event_id = await Events.findOneAndRemove({
      _Id: id,
    }).lean();
    // const event = await Events.findOneAndRemove({ calendarId: id }).lean();

    return event_id;
  } catch (e) {
    res.status(404);
    //   return null;
  }
};

module.exports.create = async (event, calendarId) => {
  //const calendarId = id;
  const newEvent = { ...event, calendarId };

  //  try {
  const createdEvent = await Events.create(newEvent);
  // if (!createdEvent) {
  //   res.status(404);
  // }
  return createdEvent;
  // } catch (e) {
  //  res.status(404);
  //  }

  //return await Events.create(newEvent);
};
