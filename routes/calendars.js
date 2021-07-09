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
    const name = req.body;
    if (!name || JSON.stringify(name) === '{}' ) {
      res.status(400).send('Calendar name is required');
    } else {
      const savedName = await CalendarDAO.create(name);
      res.json(savedName);
    }
  } catch (e) {
    if (e.message.includes('validation failed:')) {
      res.status(400).send(e.message);
    } else {
      res.status(500).send('Unexpected Server Error');
    }
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const calendarId = req.params.id;
    const name = req.body;
    if (!name || JSON.stringify(name) === '{}' || !name.name) {
      res.status(400).send('Calendar name is required');
    } else {
      const result = await CalendarDAO.updateById(calendarId, name);
      if (!result) {
        res.status(404).send('No match ID, no updates.');
      } else {
        res.json(result);
      }
    }
  } catch(e) {
    next(e);
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