const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  title: String,
  text: String,
  author: String,
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

const Story = mongoose.model('Story', storySchema);

module.exports = Story;
