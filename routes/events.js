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
        res.sendStatus(404);
      }

    } catch(e) {
      next(e);
    }
  });

router.get("/:id", async (req, res, next) => {
try {
  const event = await EventDAO.getById(req.params.id);
    if (event && (event.calendarId == req.params.calendarId)) {
      res.json(event);
    } else {
      res.sendStatus(404);
    }
  } catch(e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const calendar = await CalendarDAO.getById(req.params.calendarId);
    const event = req.body;
    if (!calendar) {
        res.sendStatus(404);
    } else if (!(event.name && event.date)) {
        res.status(400).send('Event name and date are required');
    } else {
        event.calendarId = calendar._id.toString();
        const savedEvent = await EventDAO.create(event);
        res.json(savedEvent);
    }
  } catch (e) {
    next(e);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const calendar = await CalendarDAO.getById(req.params.calendarId);
    const event = await EventDAO.getById(req.params.id);
    const eventId = req.params.id;
    const updatedEvent = req.body;
    if (!calendar || !event || event.calendarId != calendar._id.toString()) {
      res.sendStatus(404);
    } else {
      updatedEvent.calendarId = calendar._id.toString();
      const result = await EventDAO.updateById(eventId, updatedEvent);
      res.json(result);
    }
  } catch(e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const calendar = await CalendarDAO.getById(req.params.calendarId);
    const event = await EventDAO.getById(req.params.id);
    if (!calendar || !event || event.calendarId != calendar._id.toString()) {
      res.sendStatus(404);
    } else {
      const deleteEvent = await EventDAO.removeById(req.params.id);
      if (deleteEvent) {
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    }
  } catch(e) {
    next(e);
  }
});

module.exports = router;