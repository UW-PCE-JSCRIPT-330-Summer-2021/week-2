const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  calendarId: { type: mongoose.ObjectId, required: true},
});


module.exports = mongoose.model("events", eventSchema);
