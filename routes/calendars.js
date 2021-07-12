const { Router } = require("express");
const CalendarDAO = require('../daos/calendars');
const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const calendar = req.body;
    if (!calendar || JSON.stringify(calendar) === '{}') {
      res.status(400).send('Calendar is required');
    } else {
      const savedCalendar = await CalendarDAO.create(calendar);
      res.json(savedCalendar);
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
    const calendars = await CalendarDAO.getAll();
    if (calendars) {
      res.json(calendars);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next (e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const calendar = await CalendarDAO.getById(req.params.id);
    if (calendar) {
      res.json(calendar);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next (e);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const calendarId = await CalendarDAO.getById(req.params.id);
    const calendar = req.body;
    if (!calendarId) {
      res.sendStatus(404);
    } else if (!calendar || JSON.stringify(calendar) === '{}' || !calendar.name) {
      res.sendStatus(400);
    } else {
      const result = await CalendarDAO.updateById(req.params.id, calendar);
      res.json(result);
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
    const calendarId = await CalendarDAO.getById(req.params.id);
    if (calendarId) {
      await CalendarDAO.removeById(calendarId);
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next (e);
  }
});

module.exports = router;