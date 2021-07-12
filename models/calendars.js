const mongoose = require('mongoose');


const calendarSchema = new mongoose.Schema({
  name: { type: String, required: true }
  },
    { strict: false });

module.exports = mongoose.model("calendars", calendarSchema);