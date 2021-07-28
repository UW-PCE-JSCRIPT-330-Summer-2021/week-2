  
const request = require("supertest");

const server = require("../server");
const testUtils = require('../test-utils');
const Calendars = require('../models/calendars');

describe("/calendars", () => {
  beforeAll(testUtils.connectDB);
  afterAll(testUtils.stopDB);

  const calendarValues = [
    { name: 'first' },
    { name: 'additional' },
    { name: 'last' },
  ];

  beforeEach(async () => {
    await Calendars.insertMany(calendarValues)
  });
  afterEach(testUtils.clearDB);

  describe("GET /", () => {    
    it("should return empty list when there are no calendars", async () => {
      await Calendars.deleteMany({});
      const res = await request(server).get(`/calendars`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual([]);
    });
    it("should return all calendars", async () => {
      const calendarDocs = await testUtils.find(Calendars, {});
      const res = await request(server).get(`/calendars`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(calendarDocs);
    });
  });

  describe("GET /:id", () => {    
    it("should return 404 if no matching id", async () => {
      const res = await request(server).get("/calendars/id1");
      expect(res.statusCode).toEqual(404);
    });

    it.each(calendarValues)("should return calendar %# by _id", async (calendarData) => {
      const calendarDoc = await testUtils.findOne(Calendars, calendarData);
      const res = await request(server).get(`/calendars/${calendarDoc._id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(calendarDoc);
    });
  });


  describe("POST /id", () => {    
     it("should return 400 if no name provided", async () => {
      const res = await request(server).post("/calendars").send({ nme: 'missing' });
      expect(res.statusCode).toEqual(400);
      expect(await Calendars.countDocuments()).toEqual(calendarValues.length);
    }); 
    it("should create a new calendar if name is provided", async () => {
      const res = await request(server).post("/calendars").send({ name: 'new' });
      expect(res.statusCode).toEqual(200);
      expect(await Calendars.countDocuments()).toEqual(calendarValues.length + 1);
      const newCalendar = await testUtils.findOne(Calendars, { name: 'new' });
      expect(newCalendar).toMatchObject({ name: 'new' });
    });
  });


/* 
  describe("PUT /:id", () => {    
    it("should return 404 if no matching id", async () => {
      const res = await request(server).put("/calendars/id1").send({ name: 'name' });
      expect(res.statusCode).toEqual(404);
    });

    it.each(calendarValues)("should not update calendar %# if name is missing", async (calendarData) => {
      const calendarDocBefore = await testUtils.findOne(Calendars, calendarData);
      const res = await request(server).put(`/calendars/${calendarDocBefore._id}`).send({ nme: 'missing' });
      const calendarDocAfter = await testUtils.findOne(Calendars, calendarData);

      expect(res.statusCode).toEqual(400);
      expect(calendarDocBefore).toEqual(calendarDocAfter);

    });

    it.each(calendarValues)("should update calendar %# by _id", async (calendarData) => {
      const calendarDocBefore = await testUtils.findOne(Calendars, calendarData);
      const newName = calendarDocBefore.name + ' new';
      const res = await request(server).put(`/calendars/${calendarDocBefore._id}`).send({ name: newName });
      const calendarDocAfter = await testUtils.findOne(Calendars, { _id: calendarDocBefore._id });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({ ...calendarDocBefore, name: newName });
      expect(calendarDocAfter).toEqual({ ...calendarDocBefore, name: newName });
    });
  });

  describe("DELETE /:id", () => {    
    it("should return 404 if no matching id", async () => {
      const res = await request(server).delete("/calendars/id1");
      expect(res.statusCode).toEqual(404);
    });

    it.each(calendarValues)("should delete calendar %# by _id", async (calendarData) => {
      const calendarDocBefore = await testUtils.findOne(Calendars, calendarData);
      const res = await request(server).delete(`/calendars/${calendarDocBefore._id}`);
      const calendarDocAfter = await testUtils.findOne(Calendars, { _id: calendarDocBefore._id });

      expect(res.statusCode).toEqual(200);
      expect(calendarDocAfter).toEqual(null);
      expect(await Calendars.countDocuments()).toEqual(calendarValues.length - 1);
    });
  }); */
});