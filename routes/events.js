const { Router } = require('express');

const router = Router({ mergeParams: true });

const EventsDAO = require('../daos/events');

const CalendarDAO = require('../daos/calendars');

//const router = Router();

router.get('/', async (req, res, next) => {
  const { calendarId } = req.params;
  const id = req.params.id;
  
  const selectedCalendar = await CalendarDAO.getById(calendarId);
  
  if (!selectedCalendar) {
    
    res.sendStatus(404);
  } else {
    try {
      const events = await EventsDAO.getAll(calendarId);
      // if (events) {
      res.json(events);
      // } else {
      //   res.sendStatus(404);c
      // }
    } catch (e) {
      // res.sendStatus(404);
      next(e);
    }
  }
});

router.get('/:id', async (req, res, next) => {
  const { calendarId } = req.params;
  const id = req.params.id;  
  const selectedCalendar = await CalendarDAO.getById(calendarId);
  
  if (!selectedCalendar) {
    
    res.sendStatus(404);
  } else {
    try {
      const selectedEvent = await EventsDAO.getById(id, calendarId);
      if (selectedEvent) {
        res.json(selectedEvent);
      } else {
        res.sendStatus(404);
      }
    } catch (e) {
      res.sendStatus(404);
      next(e);
    }
  }
});

router.post('/', async (req, res, next) => {
  const { calendarId } = req.params;

  const selectedCalendar = await CalendarDAO.getById(calendarId);
  console.log(selectedCalendar);
  if (!selectedCalendar) {
    console.log('Sending 404 ');
    res.sendStatus(404);
  } else {
    const { name } = req.body;
    if (!name || JSON.stringify(name) === '{}') {
      res.status(400).send('Name is required and can not be Blank');
    } else {
      try {
        console.log('On Post req.  inside of eventSelect ');
        const SelectedEvent = await EventsDAO.create(req.body, calendarId);
        if (SelectedEvent) {
          res.json(SelectedEvent);
        } else {
          res.sendStatus(400);
        }
      } catch (e) {
        res.sendStatus(400);
        next(e);
      }
    }
  }
});

router.put('/:id', async (req, res, next) => {
  const { calendarId } = req.params;

  const eventId = req.params.id;

  const { name } = req.body;
  if (!name || JSON.stringify(name) === '{}') {
    res.status(400).send('Event name and Date  are required');
  } else {
    try {
      const updatedEvent = await EventsDAO.updateById(
        req.params.id,
        calendarId,
        req.body
      );
      if (updatedEvent) {
        res.json(updatedEvent);
      } else {
        res.sendStatus(404);
      }
    } catch (e) {
      res.sendStatus(404);
      next(e);
    }
  }
});

router.delete('/:id', async (req, res, next) => {
  const { calendarId } = req.params;
  const id = req.params.id;
  //console.log(calendarId);
  const selectedCalendar = await CalendarDAO.getById(calendarId);
  //console.log(selectedCalendar);
  if (!selectedCalendar) {
    console.log('Sending 404 ');
    res.sendStatus(404);
  } else {
    const id = req.params.id;

    try {
      const event = await EventsDAO.removeById(id);

      if (event) {
        res.json(event);
        // res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    } catch (e) {
      res.sendStatus(404);
      next(e);
    }
  }
});

module.exports = router;
