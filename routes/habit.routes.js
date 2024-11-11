const express = require('express');
const router = express.Router();
const Habit = require('../models/Habit');

// Create a new Habit
router.post('/habits', async (req, res) => {
    const { userId, category, subcategory, name, description, frequency, customFrequency, startDate, endDate, time, reminders, priority } = req.body;

    try {
        const habit = new Habit({
            userId,
            category,
            subcategory,
            name,
            description,
            frequency,
            customFrequency,
            startDate,
            endDate,
            time,
            reminders,
            priority
        });

        await habit.save();
        res.status(201).send({ message: 'Habit created successfully', habit });
    } catch (error) {
        res.status(400).send({ error: 'Failed to create habit', details: error.message });
    }
});


// Retrieve habits
router.get('/habits', async (req, res) => {
    try {
        const habits = await Habit.find({ userId: req.user.id });
        res.send(habits);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update habit progress
router.patch('/habits/:id', async (req, res) => {
    try {
        const habit = await Habit.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(habit);
    } catch (error) {
        res.status(400).send(error);
    }
});


// Delete habit
router.delete('/habits/:id', async (req, res) => {
    try {
        await Habit.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
