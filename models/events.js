const mongoose = require('mongoose');

//const calendarSchema = require('../models/calendars');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: String },
 // calendarId: { type: [calendarSchema] }
  calendarId: { type: String, required: false }
});


module.exports = mongoose.model("events", eventSchema);