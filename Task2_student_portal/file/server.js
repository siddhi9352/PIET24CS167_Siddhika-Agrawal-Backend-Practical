const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

require('dotenv').config();

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());

app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
}));

app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Import files
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const User = require('./models/User');

// Register and Login routes
app.use('/', authRoutes);

// Protected Profile route
app.get('/profile', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Admin-only Students route
app.get('/students', authMiddleware, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({
            message: 'Access denied. Admin only'
        });
    }

    try {
        const students = await User.find({ role: 'student' })
            .select('-password');

        res.status(200).json(students);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Start server
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});