const mongoose = require('mongoose');

const threadSchema = new mongoose.Schema({
  title: String,
  replies: Array,
  source: String,
  api: String,
  reads: Number,
  media_type: String,
  date_saved: { type: Date, default: Date.now },
  date: Date,
  tags: Array,
  meta: {
    votes: { type: Number, default: 0 },
    favs:  { type: Number, default: 0 }
  }

}, { timestamps: true });

const Thread = mongoose.model('Thread', threadSchema);

module.exports = Thread;
