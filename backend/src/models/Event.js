const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  event_type: String,
  start_date: Date,
  location_address: String,
  max_participants: Number,
  current_participants: Number,
  status: { type: String, default: 'published' }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
