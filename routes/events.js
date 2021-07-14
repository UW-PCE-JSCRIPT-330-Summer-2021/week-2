const { Router } = require("express");

const router = Router({ mergeParams: true });


module.exports = router;

•	Events
o	GET /calendars/:calendarId/events/:id - returns event with provided id from specified calendar
o	POST /calendars/:calendarId/events - creates an event for the specified calendar using JSON from the request body
o	PUT /calendars/:calendarId/events/:id - updates event with provided id from specified calendar to have data from request body
o	DELETE /calendars/:calendarId/events/:id - deletes event with provided id from specified calendar
o	GET /calendars/:calendarId/events - get an array for all the events for the specified calendar

