// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Import route handlers
const userRoutes = require('./routes/userRoutes');
const statsRoutes = require('./routes/statsRoutes');

// Import middleware
const { notFound, errorHandler } = require('./utils/errorHandler');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connection established'))
.catch((err) => console.error('MongoDB connection error:', err));

// Middleware for parsing JSON bodies
app.use(express.json());

// User and Stats routes
app.use('/api/users', userRoutes);
app.use('/api/stats', statsRoutes);

// Use custom error handling middleware
app.use(notFound); // Catch 404 errors
app.use(errorHandler); // Catch all other errors

// Define the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
