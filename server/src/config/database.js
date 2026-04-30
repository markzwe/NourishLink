const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Remove deprecated options - they're now default in Mongoose 6+
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error.message);
    // Don't exit - let server start without DB for now
  }
};

module.exports = connectDB;
