const mongoose = require('mongoose');

const sizeValidator = [
  function (val) {
    let testVal = val.trim();
    return testVal.length > 0 && testVal.length <= 50;
  },
  '{PATH} must be between 1 and 50 characters long',
];

const calendarSchema = new mongoose.Schema({
  name: { type: String, required: true, validate: sizeValidator },
});

module.exports = mongoose.model('calendars', calendarSchema);
