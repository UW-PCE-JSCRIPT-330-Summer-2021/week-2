  
const request = require("supertest");

const server = require("../server");
const testUtils = require('../test-utils');
const Calendars = require('../models/calendars');
const Events = require('../models/events');

describe("/calendars/:calendarId/events", () => {
  beforeAll(testUtils.connectDB);
  afterAll(testUtils.stopDB);

  let calendarId;
  let calendarId2;
  let eventValues = [
    {
      name: 'event1',
      date: (new Date()).toISOString(),
    },
    {
      name: 'event2',
      date: (new Date(Date.now() - 10000)).toISOString(),
    },
  ];

  beforeEach(async () => {
    const calendar = await Calendars.create({ name: 'test calendar' });
    calendarId = calendar._id;
    eventValues.forEach(e => {
      e.calendarId = calendar._id.toString();
    });
    await Events.insertMany(eventValues);
    const otherCalendar = await Calendars.create({ name: 'other calendar' });
    calendarId2 = otherCalendar._id;
    await Events.insertMany([
      {
        name: 'other calendar event',
        date: (new Date(Date.now() - 100)).toISOString(),
        calendarId: otherCalendar._id
      },
      {
        name: 'other calendar event 2',
        date: (new Date(Date.now() - 200)).toISOString(),
        calendarId: otherCalendar._id
      },
    ]);
  });
  afterEach(testUtils.clearDB);

  const url = (eventId, cId) => `/calendars/${cId? cId : calendarId}/events/${eventId || ''}`;

  describe("GET /", () => {    
    it("should return 404 when calendar does not exist", async () => {
      await Calendars.deleteMany({});
      const res = await request(server).get(url());
      expect(res.statusCode).toEqual(404);
    });
    it("should return all events for the calendar", async () => {
      const res = await request(server).get(url());
      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toEqual(eventValues.length);
      expect(res.body).toMatchObject(eventValues);
    });
  });

  describe("GET /:id", () => {    
    it.each(eventValues)("should return 404 if calendar id does not match %# event", async (eventData) => {
      const eventDoc = await testUtils.findOne(Events, { calendarId });
      const res = await request(server).get(url(eventDoc._id, calendarId2));
      expect(res.statusCode).toEqual(404);
    });

    it('should return 404 if event id does not exist', async () => {
      const res = await request(server).get(url('abc'));
      expect(res.statusCode).toEqual(404);
    });

    it.each(eventValues)("should return event %# by _id", async (eventData) => {
      const eventDoc = await testUtils.findOne(Events, { calendarId, name: eventData.name });
      const res = await request(server).get(url(eventDoc._id));
      expect(res.statusCode).toEqual(200);
      expect(res.body).toMatchObject(eventData);
    });
  });

  describe("POST /id", () => {   
    const newEvent = { name: 'new', date: new Date() };

    it("should return 404 if calendar id does not exist", async () => {
      await Calendars.deleteMany({});
      const res = await request(server).get(url()).send(newEvent);
      expect(res.statusCode).toEqual(404);
    });

    it("should return 400 if no name provided", async () => {
      const res = await request(server).post(url()).send({ ...newEvent, name: null });
      expect(res.statusCode).toEqual(400);
      expect(await Events.countDocuments()).toEqual(4);
    });

    it("should return 400 if no date provided", async () => {
      const res = await request(server).post(url()).send({ ...newEvent, date: null });
      expect(res.statusCode).toEqual(400);
      expect(await Events.countDocuments()).toEqual(4);
    });

    it("should create a new event", async () => {
      const res = await request(server).post(url()).send(newEvent);
      expect(res.statusCode).toEqual(200);
      expect(await Events.countDocuments()).toEqual(5);
      const storedEvent = await testUtils.findOne(Events, newEvent);
      expect(storedEvent).toMatchObject({ ...newEvent, calendarId });
    });
  });


  describe.each(eventValues)("PUT /:id for event %#", (eventData) => {
    let updatedEvent;
    let eventDoc;
    beforeEach(async () => {
      eventDoc = await testUtils.findOne(Events, eventData);
      const newDate = new Date(eventDoc.date.getTime() + 10000);
      updatedEvent = { date: newDate, name: eventDoc.name + ' new' };
    });

    it("should return 404 if calendar id does not match event", async () => {
      const eventDoc = await testUtils.findOne(Events, { calendarId });
      const res = await request(server).put(url(eventDoc._id, calendarId2)).send(updatedEvent);
      expect(res.statusCode).toEqual(404);
    });

    it("should update the event", async () => {
      const eventDoc = await testUtils.findOne(Events, { calendarId });
      const res = await request(server).put(url(eventDoc._id)).send(updatedEvent);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toMatchObject({ 
        ...eventDoc, 
        calendarId: eventDoc.calendarId.toString(), 
        ...updatedEvent, 
        date: updatedEvent.date.toISOString() 
      });
      const updatedDoc = await testUtils.findOne(Events, { _id: eventDoc._id });
      expect(updatedDoc).toMatchObject({ ...eventDoc, ...updatedEvent });
    });
  });

  describe("DELETE /:id", () => {    
    it.each(eventValues)("should return 404 if calendar id does not match %# event", async (eventData) => {
      const eventDoc = await testUtils.findOne(Events, { calendarId });
      const res = await request(server).delete(url(eventDoc._id, calendarId2));
      expect(res.statusCode).toEqual(404);
    });

    it('should return 404 if event id does not exist', async () => {
      const res = await request(server).delete(url('abc'));
      expect(res.statusCode).toEqual(404);
    });

    it.each(eventValues)("should delete event %# by _id", async (eventData) => {
      const eventDoc = await testUtils.findOne(Events, { calendarId, name: eventData.name });
      const res = await request(server).delete(url(eventDoc._id));
      expect(res.statusCode).toEqual(200);
      const updatedDoc = await testUtils.findOne(Events, { _id: eventDoc._id });
      expect(updatedDoc).toEqual(null);
      expect(await Events.countDocuments()).toEqual(3);
    });
  });
});