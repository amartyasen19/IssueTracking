const mongoose = require('mongoose');

// Directly set the MongoDB URI here
const MONGO_URI = 'mongodb+srv://19amartyasen:amartyasen@cluster0.78zcx.mongodb.net/issue-tracking?retryWrites=true&w=majority';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
