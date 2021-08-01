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
      // console.log(e);
      next(e);
    }
  });

  
  router.get("/:id", async (req, res, next) => {
    try {
      const calendarId = req.params.calendarId;
      const id = req.params.id;
      const calendars = await CalendarDAO.getById(calendarId);

      if (calendars) {
        const event = await EventsDAO.getById(calendarId, id);
        if (!event) {
          res.sendStatus(404);
        } else {
          res.json(event);
        }
      } else {
        res.sendStatus(404);
      }
    } catch(e) {
      // console.log(e);
      next(e);
    }
  });

  router.post("/", async (req, res, next) => {
    try {
      const reqBody ={...req.body};
      const calendarId = req.params.calendarId;
      // const newEvent = [{ name: reqBody.name.toString(), date: reqBody.date.toString(), calendarId:calendarId.toString() }];

      const events = await EventsDAO.create({ ...reqBody, calendarId });
      if (events) {
        res.json(events);
      } 
    } catch(e) {
      // console.log(e);
      next(e);
    }
  });

  router.put("/:id", async (req, res, next) => {
    try {
      
      const calendarId = req.params.calendarId;
      const eventId = req.params.id;
      const calendars = await CalendarDAO.getById(calendarId);
      const reqBody = {...req.body};

      if (calendars) {
        const event = await EventsDAO.updateById(eventId, reqBody);
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

  router.delete("/:id", async (req, res, next) => {
    try {
      const calendars = await CalendarDAO.getAll();
      res.json(calendars);
    } catch(e) {
      next(e);
    }
  });


  module.exports = router;