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
    const calendarId = req.params.id;
    const calendar = await CalendarDAO.getById(calendarId);
    if (calendar) {
      res.json(calendar);
    } else {
      res.sendStatus(404);
    }
  } catch(e) {
    next(e);
  }
});

// router.delete("/:id", async (req, res, next) => {
  
//     const calendarId = req.params.id;
//      await CalendarDAO.deleteById(calendarId);
    
//       res.sendStatus(200);
    
  
// });
router.delete("/:id", async (req, res, next) => {
  try {
    const Calendars = await CalendarDAO.getById(req.params.id);
    if (!Calendars) {
      res.status(404).send('Calendar not found');
      
    } else {
    await CalendarDAO.removeById(Calendars);
    res.sendStatus(200);
  } 
  }catch (e) { 
    next(e)
    
  } 
});
// 

router.put("/:id", async (req, res, next) => {
  try {
    const calendarId = await CalendarDAO.getById(req.params.id);
    const calendar = req.body;
    if (!calendarId) {
      res.sendStatus(404);
    } else if (!calendar || JSON.stringify(calendar) === '{}' || !calendar.name) {
      res.sendStatus(400);
    } else {
      const result = await CalendarDAO.updateById(req.params.id, calendar);
      res.json(result);
    }
  } catch (e) {
    if (e.message.includes('Validation failed:')) {
      res.status(400).send(e.message);
    } else {
      res.status(500).send('Unexpected Server Issue');
    }
  
  }
});

// router.put("/:id", async (req, res, next) => {
//   try {
//     const calendar = await CalendarDAO.getById(req.params._id);
//     if (!calendar) {
//       res.status(404).send('No calendar found');
//       return;
//     }
//     const updatedCalendar = await CalendarDAO.updateById(req.params._id, req.body);
//     res.json(updatedCalendar);
//   }
//   catch (e) {
//     if (e.message.includes('validation') || e.message.includes('schema')) {
//       res.status(400).send(e.message);
//     }
//     else {
//       res.status(500).send(e.message);
//     }
//   }
// });

router.post("/", async (req, res, next) => {
  try {
    const name = req.body;
    if (!name || JSON.stringify(name) === '{}'|| !name.name) {
      res.status(400).send('required');
    } else {
      const newCal = await CalendarDAO.create(name);
      res.json(newCal);
    }
  } catch (e) {
    next(e);
  }
})
module.exports = router;