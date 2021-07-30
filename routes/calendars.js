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
    //console.log(`router.post: name = ${reqBody.name}`)
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

router.put("/:id", (req, res, next) => {
  try {
    const requestBody = {...req.body};
    const calendar = CalendarDAO.getById(req.params.id);
    if (calendar._id == null || calendar._id == 'undefined') {
      res.sendStatus(404);
    } else {
      if (calendar) {
        CalendarDAO.updateById(req.params.id, requestBody);
        res.sendStatus(200);
      } else {
        res.sendStatus(400);
      }
    }  
  } catch(e) {
    console.log(e);
    next;
  }
});

module.exports = router;