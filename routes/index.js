const { Router } = require('express');
const router = Router();
const morgan = require('morgan');

router.use(morgan('dev'));

router.use('/calendars', require('./calendars'));
router.use('/calendars/:calendarId/events', require('./events'));

router.use('/events', require('./events'));

router.use((req, res, next) => {
  const error = new Error('Route not Found');
  error.status = 404;
  next(error);
});

router.use((error, req, res, next) => {
  res.status(error.status || 400);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = router;
