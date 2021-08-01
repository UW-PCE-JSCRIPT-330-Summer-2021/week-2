const { Router } = require("express");

const CalendarDAO = require('../daos/calendars');

const EventsDAO = require('../daos/events');

const router = Router({ mergeParams: true });

router.get("/", async (req, res, next) => {
    try {
      const cId = req.params.calendarId;
      const calendars = await CalendarDAO.getById(cId);

      if (calendars) {
        const calendarEvents = await EventsDAO.getByCalendarId(cId);   
        res.json(calendarEvents);
      } else {
        res.sendStatus(404);
      }
    } catch(e) {
      console.log(e);
      next(e);
    }
  });

  
  router.get("/:id", async (req, res, next) => {
    try {
      const cId = req.params.calendarId;
      const id = req.params.id;
      const calendars = await CalendarDAO.getById(cId);

      if (calendars) {
        const event = await EventsDAO.getById(cId, id);
        if (!event) {
          res.sendStatus(404);
        } else {
          res.json(event);
        }
      } else {
        res.sendStatus(404);
      }
    } catch(e) {
      console.log(e);
      next(e);
    }
  });

  router.post("/:id", async (req, res, next) => {
    try {
      const calendars = await CalendarDAO.getAll();
      res.json(calendars);
    } catch(e) {
      next(e);
    }
  });

  router.put("/:id", async (req, res, next) => {
    try {
      const calendars = await CalendarDAO.getAll();
      res.json(calendars);
    } catch(e) {
      next(e);
    }
  });

  router.delete("/:id", async (req, res, next) => {
    try {
      const calendars = await CalendarDAO.getAll();
      res.json(calendars);
    } catch(e) {
      next(e);
    }
  });


  module.exports = router;