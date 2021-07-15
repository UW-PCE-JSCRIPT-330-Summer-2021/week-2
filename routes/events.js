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
        const calendarId = req.params.calendarId;
        const eventId = req.params.id;
        const name = req.body;
        const event = await EventDAO.getById(calendarId, eventId);
        if (!event || JSON.stringify(event) === "{}" || calendarId !== event.calendarId.toString()) {
            res.sendStatus(404);
        } else {
            const updatedEvent = await EventDAO.updateById(calendarId, eventId, name);
            res.json(updatedEvent);
        }
    } catch (e) {
        next(e);
    }
});

// router.delete("/:id", async (req, res, next) => {
//     try {
//         const event = await EventDAO.removeById(req.params.calendarId, req.params.id);
//         if (event || calendarId == event.calendarId.toString()) {
//             res.sendStatus(200);
//         } else {
//             res.sendStatus(404);
//         }
//     } catch (e) {
//         next(e);
//     }
// });

router.delete("/:id", async (req, res, next) => {
    try {
        const calendarId = req.params.calendarId;
        const eventId = req.params.id;
        const event = await EventDAO.getById(calendarId, eventId);
        if (!event || JSON.stringify(event) === "{}" || calendarId !== event.calendarId.toString()) {
            res.sendStatus(404);
        } else {
            const deletedEvent = await EventDAO.removeById(calendarId, eventId);
            res.json(deletedEvent);
        }
    } catch (e) {
        next(e);
    }
});

module.exports = router;
