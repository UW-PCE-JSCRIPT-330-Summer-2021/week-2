const { Router } = require("express");

const CalendarDAO = require('../daos/calendars');
const EventDAO = require('../daos/events');


const router = Router({ mergeParams: true });

router.get("/", async (req, res, next) => {
    try {
        const calendar = await CalendarDAO.getById(req.params.calendarId);
        if (!calendar) {
            res.status(404).send('No calendar found');
        } else {
            const events = await EventDAO.getAll(req.params.calendarId);
            res.json(events);
        }
    } catch (e) {
        next(e);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const event = await EventDAO.getById(req.params.calendarId, req.params.id);
        if (event) {
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
        const event = req.body;
        const calendar = await CalendarDAO.getById(req.params.calendarId);
        if (!calendar) {
            res.status(404).send('No calendar found');
        }
        if (!event || JSON.stringify(event) === '{}' || !event.name || !event.date) {
            res.status(400).send('Event name and date are required');
        } else {
            event.calendarId = req.params.calendarId;
            const savedEvent = await EventDAO.create(event);
            res.json(savedEvent);
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
        const event = req.params.id;
        const name = req.body;
        if (!name || JSON.stringify(name) === '{}' || !name.name) {
            res.status(400).send('Calendar name is required');
        } else {
            const result = await EventDAO.updateById(event, name);
            if (!result) {
                res.status(404).send('No match ID, no updates.');
            } else {
                res.json(result);
            }
        }
    } catch (e) {
        next(e);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const event = await EventDAO.removeById(req.params.id);
        if (event) {
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    } catch (e) {
        next(e);
    }
});

module.exports = router;
