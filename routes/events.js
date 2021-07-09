const { Router } = require("express");

const EventDAO = require('../daos/events');
const CalendarDAO = require('../daos/calendars');

const router = Router({ mergeParams: true });

router.get("/", async (req, res, next) => {
    try {
        const calendarId = req.params.calendarId;
        const calendar = await CalendarDAO.getById(calendarId);
        if (!calendar) {
          res.status(404).send('No calendar found');
          return;
        }

        const list = await EventDAO.getAllByCalendarId(calendarId);
        if (!list || list.length === 0) {
          res.status(404).send('No events found');
        }          
        else {
          res.json(list);
        }
    } catch(e) {
      res.status(500).send(e.message);
    }
  });

router.get("/:id", async (req, res, next) => {
  try {
    const calendarId = req.params.calendarId;
    const eventId = req.params.id;
    const eventObject = await EventDAO.getById(eventId);
    if (!eventObject || eventObject.calendarId != calendarId) {
      res.status(404).send('No event found');
      return;
    }
    res.json(eventObject);
  }
  catch (e) {
    res.status(500).send(e.message);
  }
})

router.post("/", async (req, res, next) => {
  try {
    const newEventToCreate = req.body;
    const calendarId = req.params.calendarId;
    const calendar = await CalendarDAO.getById(calendarId);
    if (!calendar) {
      res.status(404).send('Not a valid calendar');
      return;
    }
    newEventToCreate.calendarId = calendarId;
    const eventCreated = await EventDAO.create(newEventToCreate);
    res.json(eventCreated);
  }
  catch (e) {
    if (e.message.includes('validation') || e.message.includes('schema')) {
      res.status(400).send(e.messsage);
    }
    else {
      res.status(500).send(e.message);
    }
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const eventToUpdate = req.body;
    const reqCalendarId = req.params.calendarId;
    const reqEventId = req.params.id;

    if (!eventToUpdate) {
      res.status(400).send('No event included in message');
      return;
    }
    eventToUpdate.calendarId = eventToUpdate.calendarId || reqCalendarId;

    const calendar = await CalendarDAO.getById(reqCalendarId);
    if (!calendar) {
      res.status(404).send('No calendar found');
      return;
    }
    if (reqCalendarId !== eventToUpdate.calendarId.toString()) {
      res.status(404).send('Invalid calendar ID specified');
      return;      
    }

    const eventToUpdateFromDb = await EventDAO.getById(reqEventId);
    if (eventToUpdateFromDb.calendarId.toString() !== eventToUpdate.calendarId) {
      res.status(404).send('Invalid calendar ID specified');
      return;   
    }
    const updatedEvent = await EventDAO.updateById(req.params.id, eventToUpdate);
    res.json(updatedEvent);
  }
  catch (e) {
    if (e.message.includes('validation') || e.message.includes('schema')) {
      res.status(400).send(e.messsage);
    }
    else {
      res.status(500).send(e.message);
    }    
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const eventToDelete = await EventDAO.getById(req.params.id);
    if (!eventToDelete) {
      res.status(404).send('No event found');
      return;
    }
    const calendar = await CalendarDAO.getById(req.params.calendarId);
    if (!calendar) {
      res.status(404).send('No calendar found');
      return;
    }
    //if (calendar._id.toString() !== eventToDelete.calendarId) {
    if (req.params.calendarId !== eventToDelete.calendarId.toString()) {
      res.status(404).send('Invalid calendar ID specified');
      return;      
    }
    await EventDAO.removeById(req.params.id);
    res.sendStatus(200);
  }
  catch (e) {
    res.status(500).send(e.message);
  }
});
  

module.exports = router;