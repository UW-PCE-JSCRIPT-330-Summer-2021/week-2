const { Router } = require("express");

const EventDAO = require('../daos/events');

const CalendarDAO = require('../daos/calendars');

const router = Router({ mergeParams: true });

router.get("/", async (req, res, next) => {
  try {
    const calendar = await CalendarDAO.getById(req.params.calendarId);
    if (calendar) {
      const events = await EventDAO.getAll(req.params.calendarId);
      res.json(events);
    } else {
      res.status(404).send('calendar does not exist');
    }
  } catch (e) {
    next(e);
    
  }
})

router.get("/:id", async (req, res, next) => {
  try {
    const event = await EventDAO.getById(req.params.id);
    if (event && event.calendarId == req.params.calendarId) {
      res.json(event);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e)
  }
})

router.post("/", async (req, res, next) => {
  try {
    const calendar = await CalendarDAO.getById(req.params.calendarId);
    const event = req.body;
    if(!event || JSON.stringify(event) === '{}' || !event.name || !event.date) {
      res.status(400).send('name is required');
    } else {
      event.calendarId = calendar._id.toString();
      const savedEvent = await EventDAO.create(event);
      res.json(savedEvent);
    }
  } catch (e) {
    next(e)
  }
})

router.put("/:id", async (req, res, next) => {
  try {
    const eventId = req.params.id;
    const newData = req.body;
    const calendar = await CalendarDAO.getById(req.params.calendarId);
    const event = await EventDAO.getById(req.params.id);
    if (!event || !calendar || event.calendarId != req.params.calendarId) {
      res.status(404).send('calendar does not match event')
    } else {
      const result = await EventDAO.updateById(eventId, newData);
      res.json(result);
    }
  } catch (e) {
    next(e)
  }
})

router.delete("/:id", async (req, res, next) => {
  try {
    const calendar = await CalendarDAO.getById(req.params.calendarId);
    const event = await EventDAO.getById(req.params.id);
    const deletedEvent = await EventDAO.removeById(req.params.id);
    if (!deletedEvent || !calendar || event.calendarId != req.params.calendarId) {
      res.sendStatus(404);
    } else {
      res.sendStatus(200)
    } 
  } catch (e) {
    next(e);
  }
})

module.exports = router;