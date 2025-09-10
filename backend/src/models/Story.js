const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  content: String,
  donation: { type: mongoose.Schema.Types.ObjectId, ref: 'Donation', default: null },
  likes_count: { type: Number, default: 0 },
  comments_count: { type: Number, default: 0 },
  shares_count: { type: Number, default: 0 },
  is_public: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Story', storySchema);
