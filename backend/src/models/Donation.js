const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donation_code: String,
  donor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  meal_name: String,
  meal_type: String,
  food_category: String,
  quantity: Number,
  quantity_unit: String,
  cooked_time: Date,
  expiry_time: Date,
  description: String,
  special_instructions: String,
  delivery_mode: String,
  pickup_address: String,
  status: { type: String, default: 'pending' },
  priority_level: { type: String, default: 'medium' },
  volunteer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  accepted_at: Date
}, { timestamps: true });

module.exports = mongoose.model('Donation', donationSchema);
