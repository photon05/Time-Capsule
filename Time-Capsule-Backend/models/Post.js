const mongoose = require('mongoose');

// Get the current date and time
const currentDate = new Date();

// Get the current time in milliseconds since the Unix epoch
const currentTimeMillis = currentDate.getTime();

// Add 5.5 hours in milliseconds (5 hours * 60 minutes * 60 seconds * 1000 milliseconds + 30 minutes * 60 seconds * 1000 milliseconds)
const offsetMillis = (5 * 60 * 60 * 1000) + (30 * 60 * 1000);

// Create a new Date object with the offset
const offsetDate = new Date(currentTimeMillis + offsetMillis);

// Convert to ISO 8601 string
const isoString = offsetDate.toISOString();

const postSchema = new mongoose.Schema({
  username: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: isoString },
  revealAt: { type: Date, required: true },
  isRevealed: { type: Boolean, default: false },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
