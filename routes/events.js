const { Router } = require("express");

const CalendarDAO = require('../daos/calendars');

const EventsDAO = require('../daos/events');

const router = Router({ mergeParams: true });

router.get("/", async (req, res, next) => {
    try {
      const cId = req.params.calendarId;
      const eventId = req.params.eventId;
      const calendars = await CalendarDAO.getById(cId);
      
      
      if (calendars) {
        console.log('3');
        const calendarEvents = await EventsDAO.getByCalendarId(cId);
        console.log('4');
       
        res.json(calendarEvents);
       
       console.log('5');
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
      console.log('10');
      console.log(req.params.id);
      console.log(req.body);
      const calendarId = req.params.id;
      if (calendarId == null || calendarId == "undefined") {
        res.sendStatus(404);
      } else {
        const events = await EventsDAO.getByCalendarId(calendarId);
      
        if (events) {
          console.log('11');
          res.json(events);
        
          console.log('12');
        } else {
          console.log('19')
          res.sendStatus(404);
        }
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