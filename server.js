const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const todoRoutes = require('./routes/todoRoutes');

const app = express();

dotenv.config(); // Load environment variables from .env file

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('MongoDB connected successfully');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Middleware to parse JSON request bodies
app.use('/api/todos', todoRoutes); // Use todo routes under /api/todos

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ message: 'Todo API Server is running!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app; // Export the app for testing purposes