const express = require('express');
const router = express.Router();
const {
  getCommentsByRecipe,
  addComment,
} = require('../controllers/commentController');

router.get('/:recipeId', getCommentsByRecipe);
router.post('/', addComment);

module.exports = router;
