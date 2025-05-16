// Description: This file defines the Comment model schema
const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
    required: true
  },
  username: {
    type: String, // or linked to a user later
    required: true
  },
  text: {
    type: String,
    required: true
  },
  postedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Comment', CommentSchema);
