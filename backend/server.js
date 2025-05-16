const recipeRoutes = require('./routes/recipes');
const commentRoutes = require('./routes/comments');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

const Recipe = require('./models/Recipe');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/recipes', require('./routes/recipes'));
app.use('/api/comments', require('./routes/comments'));

const PORT = process.env.PORT || 5050;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));




