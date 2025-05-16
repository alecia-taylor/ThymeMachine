const Comment = require('../models/Comment');
const Recipe = require('../models/Recipe');

// GET comments for a recipe
exports.getCommentsByRecipe = async (req, res) => {
  try {
    const comments = await Comment.find({ recipe: req.params.recipeId }).sort({ postedAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST a new comment with rating
exports.addComment = async (req, res) => {
  const { recipe, username, text, rating } = req.body;

  try {
    const comment = new Comment({ recipe, username, text, rating });
    await comment.save();

    // Update average rating in Recipe
    const recipeDoc = await Recipe.findById(recipe);
    if (recipeDoc) {
      recipeDoc.ratings.push(rating);
      const sum = recipeDoc.ratings.reduce((a, b) => a + b, 0);
      recipeDoc.averageRating = sum / recipeDoc.ratings.length;
      await recipeDoc.save();
    }

    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
