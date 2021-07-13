const { Router } = require("express");

const CalendarDAO = require('../daos/calendars');

const router = Router();

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

router.post("/", async (req, res, next) => {
  try {
    const calendarName = req.body.name;
    if (!calendarName || JSON.stringify(calendarName) === '{}') {
      res.status(400).send('Create calendar first');
    } else {
      const createdCalendar = await CalendarDAO.create(req.body);
      res.json(createdCalendar);
    }
  } catch (e) {
    if (e.message.includes('validation did not happen: ')) {
      res.status(400).send(e.message);
    } else {
      res.status(500).send('Something went wrong');
    }
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
      const calendarUp = await CalendarDAO.updateById(req.params.id, calendar);
      res.json(calendarUp);
    }
  } catch (e) {
    if (e.message.includes('validation did not happen: ')) {
      res.status(400).send(e.message);
    }
    else {
      res.status(500).send('Something went wrong');
    }
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const calendarId = await CalendarDAO.getById(req.params.id);
    if (calendarId) {
      await CalendarDAO.removeById(calendarId)
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next (e);
  }
});

module.exports = router;
