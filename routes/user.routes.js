const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');
const Subscription = require('../models/Subscription');

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


// List available subscriptions
router.get('/subscriptions', async (req, res) => {
    try {
        const subscriptions = await Subscription.find();
        res.send(subscriptions);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch subscriptions' });
    }
});

module.exports = router;