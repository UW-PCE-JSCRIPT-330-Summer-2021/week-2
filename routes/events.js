const { Router } = require("express");
const CalendarDAO = require('../daos/calendars');
const EventDAO = require('../daos/events');
const router = Router({ mergeParams: true });

router.post("/", async (req, res, next) => {
  try {
    const calendarId = req.params.calendarId;
    const calendar = await CalendarDAO.getById(calendarId);
    const event = req.body;
    if (!calendar) {
      res.sendStatus(404);
    } else {
      event.calendarId = calendarId;
      const savedEvent = await EventDAO.create(event);
      res.json(savedEvent);
    }
  } catch (e) {
    if (e.message.includes('validation failed:')) {
      res.status(400).send(e.message);
    } else {
      res.status(500).send('Unexpected Server Error');
    }
  }
});

router.get("/", async (req, res, next) => {
  try {
    const calendar = await CalendarDAO.getById(req.params.calendarId);
    if (calendar) {
      const events = await EventDAO.getAll(req.params.calendarId);
      res.json(events);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next (e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const calendarId = req.params.calendarId;
    const event = await EventDAO.getById(req.params.id);
    if (event && event.calendarId.toString() === calendarId) {
      res.json(event);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next (e);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const calendarId = req.params.calendarId;
    const event = await EventDAO.getById(req.params.id);
    const eventBody = req.body;
    if (event && event.calendarId.toString() === calendarId) {
      const result = await EventDAO.updateById(req.params.id, eventBody);
      res.json(result);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    if (e.message.includes('validation failed:')) {
      res.status(400).send(e.message);
    } else {
      res.status(500).send('Unexpected Server Error');
    }
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const calendarId = req.params.calendarId;
    const eventId = req.params.id;
    const event = await EventDAO.getById(eventId);
    if (event && event.calendarId.toString() === calendarId) {
      await EventDAO.removeById(eventId);
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next (e);
  }
});

module.exports = router;