const { Router } = require("express");

const CalendarDAO = require('../daos/calendars');

const EventsDAO = require('../daos/events');

const router = Router({ mergeParams: true });

router.get("/", async (req, res, next) => {
    try {
      console.log('1');
      const calendars = await CalendarDAO.getAll();
      console.log(`calenders=${calendars}`);
      console.log('2');
      if (calendars.length != 0) {
        console.log('3');
        const calendarEvents = await EventsDAO.getAll();
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
      const calendars = await CalendarDAO.getAll();
      res.json(calendars);
    } catch(e) {
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