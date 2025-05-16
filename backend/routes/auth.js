const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Middleware to check if the user is authenticated
// This middleware checks if the request has a valid token
// If the token is valid, it adds the user information to the request object
// If not, it sends a 401 Unauthorized response
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({ username, passwordHash });
    await newUser.save();
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(400).json({ error: 'Username already exists' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET);
  res.json({ token });
});

module.exports = router;
