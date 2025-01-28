const express = require('express');
const cors = require('cors');
const issueRoutes = require('./routes/issueRoutes');
const errorHandler = require('./middlewares/errorHandler');
const connectDB = require('./config/db'); // Updated connectDB
require('dotenv').config(); // Load .env variables

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse incoming JSON requests
app.use('/uploads', express.static('uploads')); // Serve uploaded images

// Routes
app.use('/api/issues', issueRoutes);

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
