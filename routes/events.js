const { Router } = require("express");

const CalendarDAO = require('../daos/calendars');
const EventDAO = require('../daos/events');

const router = Router({ mergeParams: true });

router.get("/", async (req, res, next) => {
    try {
        const calendarId = req.params.calendarId;
        const calendar = await CalendarDAO.getById(calendarId);

        if(!calendar) {
            res.status(404).send('There is no calendar');
            return;
        }

        const eventList = await EventDAO.getAll(calendarId);
        if(!eventList || eventList.length === 0) {
            res.status(404).send('No events here');
        } else {
            res.json(eventList);
        }
    } catch(e) {
        res.status(500).send(e.message);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const calendarId = req.params.calendarId;
        const eventEntity = await EventDAO.getById(req.params.id);
        if(!eventEntity || eventEntity.calendarId != calendarId) {
            res.status(404).send('No events here');
            return;
        }
        res.json(eventEntity);
    } catch(e) {
        res.status(500).send(e.message);
    }
})

router.post('/', async (req, res, next) => {
    try {
        const calendarId = req.params.calendarId;
        const calendar = await CalendarDAO.getById(calendarId);
        if(!calendar) {
            res.status(404).send('Invalid calendar');
            return;
        }

        req.body.calendarId = calendarId;
        const createdEvent = await EventDAO.create(req.body.calendarId);
        res.json(createdEvent);
    } catch(e) {
         if (e.message.includes('validation') || e.message.includes('schema')) {
        res.status(400).send(e.messsage);
        }
        else {
        res.status(500).send(e.message);
        }
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        if (!req.body) {
            res.status(404).send('No events posted');
            return;
        }
        req.body.calendarId = req.body.calendar || req.params.calendarId;
        const calendar = await CalendarDAO.getById(req.params.calendarId);
        if(!calendar) {
            res.status(404).send('There is no calendar');
            return;
        }

        if(req.params.calendarId !== req.body.calendarId.toString()) {
            res.status(404).send('Calendar ID you entered is invalid');
            return;
        }

        const eventBeUpdated = await EventDAO.getById(req.params.id);
        if (eventBeUpdated.calendarId.toString() !== req.body.calendarId) {
            res.status(404).send('Calendar ID you entered is invalid');
            return;
        }

        const updatedEvent = await EventDAO.updateById(req.params.id, req.body);
        res.json(updatedEvent);
    } catch(e) {
        res.status(500).send(e.message);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const eventBeDeleted = await EventDAO.getById(req.params.id);
        if(!eventBeDeleted) {
            res.json(404).send('There is no events');
            return;
        }

        const calendar = await CalendarDAO.getById(req.params.calendarId);
        if(!calendar) {
            res.json(404).send('There is no calendars');
            return;
        }

        if(req.params.calendarId !== req.body.calendarId.toString()) {
            res.status(404).send('Calendar ID you entered is invalid');
            return;
        }
        await EventDAO.deleteById(req.params.id);
        res.sendStatus(200);
    } catch(e) {
        res.status(500).send(e.message);
    }
});

module.exports = router;
