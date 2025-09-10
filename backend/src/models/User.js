const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  first_name: String,
  last_name: String,
  user_type: String,
  profile: Object,
  stats: {
    total_donations: { type: Number, default: 0 },
    total_meals_donated: { type: Number, default: 0 },
    total_co2_saved: { type: Number, default: 0 },
    total_people_helped: { type: Number, default: 0 },
    current_streak: { type: Number, default: 0 },
    total_points: { type: Number, default: 0 },
    current_level: { type: Number, default: 1 },
    last_updated: { type: Date, default: Date.now }
  },
  donations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Donation' }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
