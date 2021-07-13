const { Router } = require("express");

const CalendarDAO = require('../daos/calendars');
const EventDAO = require('../daos/events');

const router = Router({ mergeParams: true });

router.get("/", async (req, res, next) => {
    try {
        const calendarId = req.params.calendarId;
        const calendar = await CalendarDAO.getById(calendarId);
        if (calendar) {
            const eventList = await EventDAO.getAll(calendarId);
            res.json(eventList);
        } else {
            res.sendStatus(404);
        }
    } catch (e) {
        next (e);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const calendarId = req.params.calendarId;
        const eventEntity = await EventDAO.getById(req.params.id);
        if (eventEntity && eventEntity.calendarId.toString() === calendarId) {
            res.json(eventEntity);
        } else {
            res.sendStatus(404);
        }
    } catch (e) {
        next (e);
    }
})

router.post("/", async (req, res, next) => {
    try {
        const calendarId = req.params.calendarId;
        const calendarEvent = req.body;
        const calendarName = req.body.name;
        const calendarDate = req.body.date;
        const calendar = await CalendarDAO.getById(calendarId);
        if (!calendar) {
            res.sendStatus(404);
        } else if (!calendarName || JSON.stringify(calendarName) === '{}') {
            res.status(400).send('Put event name')
        } else if (!calendarDate || JSON.stringify(calendarDate) === '{}') {
            res.status(400).send('Put event name')
        } else {
            calendarEvent.calendarId = calendarId;
            const createdEvent = await EventDAO.create(calendarEvent);
            res.json(createdEvent);
        }
    } catch (e) {
        if (e.message.includes('validation did not happen: ')) {
            res.status(400).send(e.messsage);
        }
        else {
            res.status(500).send('Something went wrong');
        }
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        const calendarId = req.params.calendarId;
        const calendarEvent = await EventDAO.getById(req.params.id);
        if (calendarEvent && calendarEvent.calendarId.toString() === calendarId) {
            const calendarUp = await EventDAO.updateById(req.params.id, req.body);
            res.json(calendarUp);
        } else {
            res.sendStatus(404);
        }
    } catch (e) {
        if (e.message.includes('validation did not happen:')) {
            res.status(400).send(e.message);
        } else {
            res.status(500).send('Something went wrong');
        }
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const calendarId = req.params.calendarId;
        const eventBeDeleted = await EventDAO.getById(req.params.id);
        if (eventBeDeleted && eventBeDeleted.calendarId.toString() === calendarId) {
            await EventDAO.removeById(req.params.id);
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    } catch (e) {
        next (e);
    }
});

module.exports = router;
