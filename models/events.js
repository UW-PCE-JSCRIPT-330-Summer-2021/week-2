const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: {type: Date, requred: true},
  calendarId: {type: mongoose.ObjectId, requred: true} 
});


module.exports = mongoose.model("events", eventSchema);