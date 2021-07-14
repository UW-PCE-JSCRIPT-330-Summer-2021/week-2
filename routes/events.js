const { Router } = require("express");
const eventDAO = require('../daos/events');
const calendarDAO = require('../daos/calendars');

const router = Router({ mergeParams: true });

router.get("/", async (req, res, next) => {
    try {
        const calendar = await calendarDAO.getById(req.params.calendarId);
        if (calendar) {
            const events = await eventDAO.getAll(req.params.calendarId);
            res.json(events);
        } else {
            res.sendStatus(404);
        }
    } catch (e) {
        next(e);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const event = await eventDAO.getById(req.params.id);
        if (event && (event.calendarId == req.params.calendarId)) {
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
        const calendar = await calendarDAO.getById(req.params.calendarId);
        const event = req.body;
        if (!calendar) {
            res.sendStatus(404);
        } else if (!(event.name && event.date)) {
            res.status(400).send('Name and date are required');
        } else {
            event.calendarId = calendar._id.toString();
            const savedEvent = await eventDAO.create(event);
            res.json(savedEvent);
        }
    } catch (e) {
        next(e);
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        const calendar = await calendarDAO.getById(req.params.calendarId);
        const event = await eventDAO.getById(req.params.id);
        const eventId = req.params.id;
        const newEvent = req.body;
        if (!event || !calendar || event.calendarId != req.params.calendarId) {
            res.status(404).send('Calendar does not match event')
        } else {
            const result = await eventDAO.updateById(eventId, newEvent);
            res.json(result);
        }
    } catch (e) {
        next(e)
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const calendar = await calendarDAO.getById(req.params.calendarId);
        const event = await eventDAO.getById(req.params.id);
        const deleteEvent = await eventDAO.removeById(req.params.id);
        if (!deleteEvent || !calendar || event.calendarId != req.params.calendarId) {
            res.sendStatus(404);
        } else {
            res.sendStatus(200);
        }
    } catch (e) {
        next(e)
    }
});

module.exports = router;