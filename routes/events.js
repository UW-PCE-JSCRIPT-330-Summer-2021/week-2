const { Router } = require("express");

const router = Router({ mergeParams: true });

const EventDAO = require("../daos/events");

const CalendarDAO = require('../daos/calendars');

router.get("/:id", async (req, res, next) => {
  try {
    const calendarId = req.params.calendarId;
    const event = await EventDAO.getEventById(req.params.id);
    if (event && event.calendarId == calendarId) {
      res.json(event);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const calendar = await CalendarDAO.getById(req.params.calendarId);
    const event = req.body;
    if (!event || JSON.stringify(event) === '{}' || !event.name || !event.date) {
      res.status(400).send('both name and date are required');
    } else {
      event.calendarId = calendar._id.toString();
      const postedEvent = await EventDAO.createEvent(event);
      res.json(postedEvent);
    }
  } catch (e) {
    next(e);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const eventId = req.params.id;
    const newData = req.body;
    const calendar = await CalendarDAO.getById(req.params.calendarId);
    const event = await EventDAO.getEventById(req.params.id);
    if (!event || !calendar || event.calendarId != req.params.calendarId) {
      res.status(404).send('no match')
    } else {
      const result = await EventDAO.updateEventById(eventId, newData);
      res.json(result);
    }
  } catch (e) {
    next(e)
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const calendar = await CalendarDAO.getById(req.params.calendarId);
    const event = await EventDAO.getEventById(req.params.id);
    const deletedEvent = await EventDAO.deleteEventById(req.params.id);
    if (!deletedEvent || !calendar || event.calendarId != req.params.calendarId) {
      res.sendStatus(404);
    } else {
      res.sendStatus(200)
    }
  } catch (e) {
    next(e);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const calendar = await CalendarDAO.getById(req.params.calendarId);
    if (calendar) {
      const events = await EventDAO.getAllEvents(req.params.calendarId);
      res.json(events);
    } else {
      res.status(404).send('calendar does not exist');
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
