const { Router } = require("express");
const router = Router();
const CalendarDAO = require('../daos/calendars');

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
    if (!calendar || JSON.stringify(calendar) === '{}') {
      res.status(400).send('Calendar is required');
    } else if (!calendar.name) {
      res.status(400).send('Calendar name is missing');
      return;
    } else {
      const savedCal = await CalendarDAO.create(calendar);
      res.json(savedCal);
    }
  } catch (e) {
    if (e.message.includes('Validation failed:')) {
      res.status(400).send(e.message);
    } else {
      res.status(500).send(e.message);
    }
  }
})


router.put("/:id", async (req, res, next) => {
  try {
    const calendar = await CalendarDAO.getById(req.params.id);
    const name = req.body.name;
    if (!calendar || JSON.stringify(calendar) === '{}') {
      res.status(404).send('Calendar not found');
      return;
    } else if (!name) {
      res.status(400).send('Calendar name is missing');
      return;
    } else {
      const updatedCal = await CalendarDAO.updateById(req.params.id, req.body);
      res.json(updatedCal);
    }
  } catch (e) {
    if (e.message.includes('Validation failed:')) {
      res.status(400).send(e.message);
    } else {
      res.status(500).send(e.message);
    }
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const calendar = await CalendarDAO.removeById(req.params.id);
    if (calendar) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch(e) {
    next(e);
  }
});

module.exports = router;