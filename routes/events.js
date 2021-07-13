const { Router } = require("express");

const EventDAO = require('../daos/events');

const CalendarDAO = require('../daos/calendars');

const router = Router({ mergeParams: true });

router.get("/", async (req, res, next) => {
    try {
        const calendar = await CalendarDAO.getById(req.params.calendarId);
        if (calendar) {
            const events = await EventDAO.getAll(req.params.calendarId);
            res.json(events);
        } else {
            res.status(404).send('Cannot find calendar');
        }
    } catch (e) {
        next(e);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const calendarId = req.params.calendarId;
        const event = await EventDAO.getById(req.params.id);
        if (event && event.calendarId.toString() === calendarId) {
            res.json(event);
        } else {
            res.sendStatus(404);
        }
    } catch (e) {
        next(e);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const calendar = await CalendarDAO.getById(req.params.calendarId);
        const event = req.body;
        if (!event || JSON.stringify(event) === '{}' || !event.name || !event.date) {
            res.status(400).send('Name required');
        } else {
            event.calendarId = calendar._id.toString();
            const savedEvent = await EventDAO.create(event);
            res.json(savedEvent);
        }
    } catch (e) {
        next(e);
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        const calendarId = req.params.calendarId;
        const event = await EventDAO.getById(req.params.id);
        const eventBody = req.body;
        if (event && event.calendarId.toString() === calendarId) {
            const result = await EventDAO.updateById(req.params.id, eventBody);
            res.json(result);
        } else {
            res.sendStatus(404);
        }
    } catch (e) {
        if (e.message.includes('Validation Failed')) {
            res.status(400).send(e.message);
        } else {
            res.status(500).send('Unexpected Server Issue');
        }
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const calendarId = req.params.calendarId;
        const eventId = req.params.id;
        const event = await EventDAO.getById(eventId);
        if (event && event.calendarId.toString() === calendarId) {
            await EventDAO.removeById(eventId);
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    } catch (e) {
        next(e);
    }
});


module.exports = router;