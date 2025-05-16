const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  thumbnailUrl: {
    type: String, // Now optional
    default: '',  // Optional: empty string or null
  },
  ingredients: [
    {
      type: String,
      required: true,
    }
  ],
  steps: [
    {
      type: String,
      required: true,
    }
  ],
  averageRating: {
    type: Number,
    default: 0,
  },
  ratings: [
    {
      type: Number,
    }
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Recipe', RecipeSchema);
