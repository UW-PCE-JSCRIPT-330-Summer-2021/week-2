const { Router } = require("express");

const CalendarDAO = require('../daos/calendars');

const router = Router();

router.get("/:id", async (req, res, next) => {
  try {
    const calendar = await CalendarDAO.getById(req.params.id);
    if (calendar) {
      res.json(calendar);
    } else {
      res.sendStatus(404);
    }
  } catch(e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const name = req.body;
    if (!name || !name.name) {
      res.status(400).send('calendar name is required');
    } else {
      const createdCalendar = await CalendarDAO.create(name);
      res.json(createdCalendar);
    }
  } catch (e) {
    next(e);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const calendarId = req.params.id;
    const name = req.body;
    if (!name || !name.name) {
      res.status(400).send('calendar name is required');
    } else {
      const updatedResult = await CalendarDAO.updateById(calendarId, name);
      if (!updatedResult) {
        res.status(404).send('not found');
      } else {
        res.json(updatedResult);
      }
    }
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const calendar = await CalendarDAO.deleteById(req.params.id);
    if (calendar) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch(e) {
    next(e);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const calendars = await CalendarDAO.getAllCalendars();
    res.json(calendars);
  } catch(e) {
    next(e);
  }
});

module.exports = router;
