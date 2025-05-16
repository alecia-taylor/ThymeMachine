// Description: This file contains the database connection using MongoDB
const mongoose = require('mongoose');

// Load environment variables from .env file
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB; // This function is exported to be used in other files
