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

router.post("/", async (req, res, next) => {
  try {
    const reqBody = { ...req.body };
    if (reqBody.name == null || reqBody.name == 'undefined') {
      res.sendStatus(400);
    } else {
      const calendar = await CalendarDAO.create(reqBody.name);
      if (calendar) {
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    }
  } catch(e) {
    next(e);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    if (req.params.id != null && req.params.id != 'undefined') {
      const calendar = await CalendarDAO.getById(req.params.id);
      if (calendar) {
        const reqBody = {...req.body};
        if (reqBody.name == null || reqBody.name == 'undefined') {
          res.sendStatus(400);
        } else {
          const updateCalendar = CalendarDAO.updateById(req.params.id, reqBody);
          if (updateCalendar) {
            res.sendStatus(200);
          } else { 
            res.sendStatus(400);
          }
        }
      } else {
        res.sendStatus(404);
      }
    } 
  } catch(e) {
    console.log(e);
    next(e);
  }
});

module.exports = router;