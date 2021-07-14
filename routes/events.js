const { Router } = require("express");

const EventsDAO = require('../daos/events');
const CalendarDAO = require('../daos/calendars');

const router = Router({ mergeParams: true });


router.get("/", async (req, res, next) => {
    try {
        const cId = req.params.calendarId;
        const cal = await CalendarDAO.getById(cId);

        if(cal) {
            const events = await EventsDAO.getEventsByCalendarId(cId);
            if(events) {
                res.json(events);
            }
            else {
                res.sendStatus(404);
            }
        }
        else {
            res.sendStatus(404);
        }
    } catch(e) {
        next(e);
    }
  });
  
  router.get("/:id", async (req, res, next) => {
    try {
        const cId = req.params.calendarId;
        const event = await EventsDAO.getById(req.params.id);
        if (event && event.calendarId == cId) {
            res.json(event);
        } else {
            res.sendStatus(404);
        }
    } catch(e) {
      next(e);
    }
  });
  
  router.delete("/:id", async (req, res, next) => {
    try {
      const cal = await CalendarDAO.getById(req.params.calendarId);
      const event = await EventDAO.getById(req.params.id);

      if(!cal || !event || event.calendarId.toString() != req.params.calendarId) {
        res.sendStatus(404);
      } else {
        const deleted = await EventDAO.removeById(req.params.id);
        if(deleted) {
          res.sendStatus(200);
        } else {
          res.sendStatus(404)
        }
      }
    } catch(e) {
      next(e);
    }
  });

  router.post("/", async (req,res,next) => {
    try {
      const cal = await CalendarDAO.getById(req.params.calendarId);
      const event = req.body;

      if(!event || JSON.stringify(event) === '{}' || !event.name || !event.date) {
        res.status(400).send('Name is required');
      } else {
        event.calendarId = cal._id.toString();
        const saved = await EventsDAO.create(event);
        res.json(saved);
      }
    } catch(e) {
      next(e);
    }
  });
  
  router.put("/:id", async (req,res,next) => {
    try {
      const eId = req.params.id;
      const newEvent = req.body;
      const cal = await CalendarDAO.getById(req.params.calendarId);
      const event = await EventDAO.getById(eId);

      if(!cal || !event || event.calendarId !== req.params.calendarId) {
        res.status(404).send('Calendar and Event do not match');
      } else {
        const updated = await EventDAO.updateById(eId, newEvent);
        if(updated) {
          res.json(updated)
        } else {
          res.sendStatus(404);
        }
      }

    } catch(e) {
      next(e);
    }
  })
  


module.exports = router;