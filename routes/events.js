const { Router } = require("express");
const router = Router({ mergeParams: true });
const CalendarDAO = require('../daos/calendars');
const EventDAO = require('../daos/events');

router.get("/", async (req, res, next) => {
    try {
        const calendarId = req.params.calendarId;
        const calendar = await CalendarDAO.getById(calendarId);
        if (!calendar) {
            res.status(404).send('Calendar not found');
            return;
        }
        const events = await EventDAO.getAll(calendarId);
        if (!events) {
            res.status(404).send('Events not found');
            return;
        } else {
            res.json(events);
        }
    } catch (e) {
        next(e);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const calendarId = req.params.calendarId;
        const eventId = req.params.id;
        // console.log("req:", req.params);
        const event = await EventDAO.getById(eventId);
        // console.log("eventObj:", event);
        if (!event || event.calendarId != calendarId) {
            res.status(404).send('Event not found');
            return;
        }
        res.json(event);
    } catch (e) {
        next(e);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const calendarId = req.params.calendarId;
        const eventData = req.body;
        const calendar = await CalendarDAO.getById(calendarId);
        if (!calendar) {
            res.status(404).send('Calendar not found');
        } else {
            eventData.calendarId = calendarId;
            const newEvent = await EventDAO.create(eventData);
            res.json(newEvent);
        }
    } catch (e) {
        if (e.message.includes('validation failed:')) {
            res.status(400).send(e.message);
        } else {
            res.status(500).send('Unexpected Server Error');
        }
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        const calendarId = req.params.calendarId;
        const eventId = req.params.id;
        const eventData = req.body;        
        const event = await EventDAO.getById(eventId);
        if (!event || event.calendarId != calendarId) {
            res.sendStatus(404);
        } else {
            const updateEvent = await EventDAO.updateById(eventId, eventData);
            res.json(updateEvent);
        }
    } catch (e) {
        next(e);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const calendarId = req.params.calendarId;
        const eventId = req.params.id;
        const event = await EventDAO.getById(eventId);
        if (!event || event.calendarId != calendarId ) {
            res.sendStatus(404);
        } else {
            const deleteEvent = await EventDAO.removeById(eventId);
            if (deleteEvent) {
                res.sendStatus(200);
            } else {
                res.sendStatus(404);
            }
        }
    } catch (e) {
        next(e);
    }
});

module.exports = router;
