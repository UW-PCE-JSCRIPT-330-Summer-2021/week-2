const mongoose = require('mongoose');


// const eventSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   date: {type: Date, requred: true},
//   calendarId: {type: String, requred: true} 
// });


// const calendarSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   events: { type: [eventSchema] }
//   },
//     { strict: false });


const calendarSchema = new mongoose.Schema({
  name: { type: String, required: true }
  },
    { strict: false });

module.exports = mongoose.model("calendars", calendarSchema);