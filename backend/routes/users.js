const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

router.post('/favorite/:id', auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  const recipeId = req.params.id;

  const alreadyFav = user.favorites.includes(recipeId);
  if (alreadyFav) {
    user.favorites.pull(recipeId);
  } else {
    user.favorites.push(recipeId);
  }

  await user.save();
  res.json({ favorites: user.favorites });
});

router.get('/favorites', auth, async (req, res) => {
  const user = await User.findById(req.user.id).populate('favorites');
  res.json(user.favorites);
});

module.exports = router;
