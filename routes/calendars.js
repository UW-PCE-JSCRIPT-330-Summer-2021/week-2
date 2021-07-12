const { Router } = require("express");

const CalendarDAO = require('../daos/calendars');

const router = Router();



router.post("/", async (req, res, next) => {

  try {
    const name = req.body.name;
    const cal = req.body
    if (!name || JSON.stringify(name) === '{}' ) {
      res.status(400).send('calendar is required');
    } else {
      const newName = await CalendarDAO.create(cal);
      res.sendStatus(200);
    }
  }
  catch (e) {
    next(e);
  }
  
});

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


// Update
router.put("/:id", async (req, res, next) => {
 
  try {
    const calId = req.params.id;
    const name = req.body.name;
    if (!name || JSON.stringify(name) === '{}' ) {
      res.status(400).send('name is required"');
    } else {
     const result =  await CalendarDAO.updateById(calId, name);
      if (result) {
        res.json(result);
      } else {
        res.sendStatus(404);
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



router.get("/:calendarId/events", async (req, res, next) => {

  try {
    const id = req.params.calendarId;

      const events = await CalendarDAO.getEvents(id);
      if (events) {
        res.json(events);
      } else {
        res.sendStatus(404);
      }
    
  } catch(e) {
    next(e);
  }  
});

router.get("/:calendarId/events/:id", async (req, res, next) => {
  try {
    const calId = req.params.calendarId;
    const eventId = req.params.id;
    const event = await CalendarDAO.getEventById(eventId); 

if(!event) {
  res.sendStatus(404);
} else 
    if (event && calId  === event.calendarId.toString()){
      res.json(event);
    } else {
      res.sendStatus(404);
    }
  } catch(e) {
    next(e);
  }
});



router.post("/:calendarId/events/", async (req, res, next) => {

  try {
    const name = req.body.name;
    const date = req.body.date;
    const event = req.body;
    const calId = req.params.calendarId;
    // const calId = req.id;
    if (!name || JSON.stringify(name) === '{}' ) {
      res.status(400).send('name is required');
    } else if (!date|| JSON.stringify(date) === '{}' ) {
      res.status(400).send('date is required');
    }        
    else {
      const newEvent = await CalendarDAO.createEvent(calId, event);
      res.sendStatus(200);
    }
  }
  catch (e) {
    next(e);
  }
  
});


router.put("/:calendarId/events/:id", async (req, res, next) => {

  try {
    const calId = req.params.calendarId;
    const name = req.body.name;
    const date = req.body.date;
    const id = req.params.id;
    const event = await CalendarDAO.getEventById(id); 
    if (!name || JSON.stringify(name) === '{}' ) {
      res.status(400).send('name is required');
    } else if (!date|| JSON.stringify(date) === '{}' ) {
      res.status(400).send('date is required');
    }  else if ( calId  === event.calendarId.toString()){
      const newEvent = await CalendarDAO.updateEvent(id, date, name);
      res.json(newEvent);
    }       
    else {
      res.sendStatus(404);
    }
  }
  catch (e) {
    next(e);
  }
  
});


router.delete("/:calendarId/events/:id", async (req, res, next) => {

  try {
    const calId = req.params.calendarId;
    const id = req.params.id;
    const event = await CalendarDAO.getEventById(id); 
    if (event &&  calId  === event.calendarId.toString()){
      const result  = await CalendarDAO.deleteById(id);
     console.log("result ", result);
      if (result) {
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
   
    } else {
      res.sendStatus(404);
    }
  }
  catch (e) {
    next(e);
  }
  
});


module.exports = router;