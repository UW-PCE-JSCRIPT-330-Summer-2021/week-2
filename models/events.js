const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
});


module.exports = mongoose.model("events", eventSchema);
