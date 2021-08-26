const { Router } = require("express");
const CalendarDAO = require('../daos/calendars');
const EventDAO = require('../daos/events');
const router = Router({ mergeParams: true });

// returns event with provided id from specified calendar
router.get("/calendars/:calendarId/events/:id", async(req, res, next) =>{
  const thisCalendar = req.params.calendarId;
  const calendar = CalendarDAO.getById(thisCalendar);
  const thisEvent = req.params.id;
  const eventId = await EventDAO.getById(thisEvent);
    res.json(eventId);
  }
);

//* POST /calendars/:calendarId/events - creates an event for the specified calendar using JSON from the request body
router.post("/calendars/:calendarId/events", async(req, res, next) =>{
  const thisCalendar = req.params.calendarId;
  const calendar = CalendarDAO.getById(thisCalendar);
  if(calendar){
    const eventCreate = await EventDAO.create(calendar,req.body);
    res.sendStatus(200);
    return res.json(eventCreate);
  }

});

// updates event with provided id from specified calendar to have data from request body
router.put("/calendars/:calendarId/events/:id", async(req, res, next) =>{
  calendarToUpdate = CalendarDAO.getById(req.params.calendarId);
  return await EventDAO.updateEvent(req.params.id, req.body);
});

//deletes event with provided id from specified calendar
router.delete("/calendars/:calendarId/events/:id", async(req, res, next) =>{
  calendarOfEventToBeRemoved = CalendarDAO.getById(req.params.calendarId);
  if(calendarOfEventToBeRemoved){
    res.sendStatus(200);
    return await EventDAO.deleteById(calendarOfEventToBeRemoved.events.id);
  }
});

//get an array for all the events for the specified calendar
router.get("/calendars/:calendarId/events", async(req, res, next) =>{
  const thisCalendar = CalendarDAO.getById(req.params.calendarId);
  if(thisCalendar){
    const allEvents = EventDAO.getAllEvents(req.params.id);
    res.json(allEvents);
  }
});

module.exports = router;
<<<<<<< HEAD
=======

•	Events
o	GET /calendars/:calendarId/events/:id - returns event with provided id from specified calendar
o	POST /calendars/:calendarId/events - creates an event for the specified calendar using JSON from the request body
o	PUT /calendars/:calendarId/events/:id - updates event with provided id from specified calendar to have data from request body
o	DELETE /calendars/:calendarId/events/:id - deletes event with provided id from specified calendar
o	GET /calendars/:calendarId/events - get an array for all the events for the specified calendar

>>>>>>> f812fec298f03e142b6d9f51e5e72ad4371a3468
