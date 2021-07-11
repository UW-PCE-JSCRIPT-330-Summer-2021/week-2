const { Router } = require("express");

const CalendarDAO = require('../daos/calendars');

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const calendars = await CalendarDAO.getAll();
    res.json(calendars);
  } catch(e) {
    next(e);
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
  } catch(e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const calendar = req.body;
    if(!calendar || JSON.stringify(calendar) === '{}') {
      res.status(400).send('Create calendar');
    } else {
      const createdCalendar = await CalendarDAO.create(calendar);
      res.json(createdCalendar);
    }
  } catch(e) {
    if (e.message.includes('validation') || e.message.includes('schema')) {
      res.status(400).send(e.message);
    }
    else {
      res.status(500).send(e.message);
    }
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    if(!req.body || JSON.stringify(req.body) === '{}' || !req.body.name) {
      res.status(404).send('There is no calendars');
    } else {
      const calendar = await CalendarDAO.updateById(req.params.id, req.body);
      if(!calendar) {
        res.status(400).send('No matching ID');
      } else {
        res.json(calendar);
      }
    }
  } catch(e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const calendar = await CalendarDAO.getById(req.params.id);
    if (!calendar) {
      res.sendStatus(400).send('There is no calendars');
    }
    await CalendarDAO.deleteById(req.params.id)
    res.sendStatus(200);
  } catch(e) {
    res.status(500).send(e.message);
  }
});

module.exports = router;
