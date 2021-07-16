const { Router } = require('express');

const CalendarDAO = require('../daos/calendars');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const calendars = await CalendarDAO.getAll();
    res.json(calendars);
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  // if (!id || JSON.stringify(id) === '{}') {
  //   res.status(404).send('Id is required');
  // } else {
  try {
    const selectedCalendar = await CalendarDAO.getById(id);
    if (selectedCalendar) {
      res.json(selectedCalendar);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    res.sendStatus(404);
    next(e);
  }
  // }
});

router.post('/', async (req, res, next) => {
  const name = req.body;
  if (!name || JSON.stringify(name) === '{}') {
    res.status(400).send('Name is required');
  } else {
    try {
      const calendar = await CalendarDAO.create(name);
      if (calendar) {
        res.json(calendar);
      } else {
        res.sendStatus(400);
      }
    } catch (e) {
      next(e);
    }
  }
});

router.put('/:id', async (req, res, next) => {
  const calendarId = req.params.id;
  const { name } = req.body;

  if (!name || JSON.stringify(name) === '{}') {
    res.status(400).send('Name is required');
  } else {
    try {
      const updatedcalendar = await CalendarDAO.updateById(
        req.params.id,
        req.body
      );
      if (updatedcalendar) {
        res.json(updatedcalendar);
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
  // const id = req.params.id;
  // if (!id || JSON.stringify(id) === '{}') {
  //   res.status(404).send('Id is required');
  try {
    const calendar = await CalendarDAO.removeById(req.params.id);
    res.sendStatus(200);
    // if (calendar) {
    //   res.sendStatus(200);
    // } else {
    //   res.sendStatus(404);
    // }
  } catch (e) {
    res.sendStatus(404);
    next(e);
  }
  // }
});

module.exports = router;
