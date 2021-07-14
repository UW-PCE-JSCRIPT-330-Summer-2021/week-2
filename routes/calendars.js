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

router.post("/", async (req,res,next) => {
  try {
    const cal = req.body;
    if(!cal || JSON.stringify(cal) === '{}' || !cal.name) {
      res.status(400).send('Name is required');
    } else {
      const saved = await CalendarDAO.create(cal);
      res.json(saved);
    }
  } catch(e) {
    next(e);
  }
});

router.put("/:id", async (req,res,next) => {
  try {
    const calId = req.params.id;
    const calName = req.body;

    if(!cal || JSON.stringify(cal) === '{}' || !calName.name) {
      res.status(400).send('Name is required');
    } else {
      const saved = await CalendarDAO.updateById(calId, calName);
      if(!saved) {
        res.status(404).send(`No Calendar with id ${calId}`);
      } else {
        res.json(saved);
      }
    }
  } catch(e) {
    next(e);
  }
});

module.exports = router;
