// Import required modules
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User.model');
const Subscription = require('../models/Subscription.model');
const { authenticateToken } = require('../middlewares/auth.middleware');

// Register
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = new User({ username, email, password });
        await user.save();
        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).send({ error: 'Registration failed', details: error.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).send({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.send({ token, user });
    } catch (error) {
        res.status(500).send({ error: 'Login failed', details: error.message });
    }
});

// List available subscriptions (Protected route)
router.get('/subscriptions', authenticateToken, async (req, res) => {
    try {
        const subscriptions = await Subscription.find();
        res.send(subscriptions);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch subscriptions' });
    }
});

// Example of fetching user details (Protected route)
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).send({ error: 'User not found' });

        res.send(user);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch user profile' });
    }
});

module.exports = router;
