const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware to read JSON data
app.use(express.json());

// Logger Middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected Successfully'))
    .catch(err => console.log('MongoDB Connection Error:', err));

// Import Book Routes
const bookRoutes = require('./routes/bookRoutes');

// Use Book Routes
app.use('/books', bookRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Start Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});