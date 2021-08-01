const mongoose = require('mongoose');
const calendars = require('./calendars');

//const calendarSchema = require('../models/calendars');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date },
 // calendarId: { type: [calendarSchema] }
  calendarId: { type: String, required: false }
  // calendarId: { type: mongoose.Schema.Types.ObjectId, ref: calendars, required: false }
});


module.exports = mongoose.model("events", eventSchema);