const mongoose = require('mongoose');

const calendarSchema = new mongoose.Schema({
  name: { type: String, required: true },
  
});


module.exports = mongoose.model("calendars", calendarSchema);