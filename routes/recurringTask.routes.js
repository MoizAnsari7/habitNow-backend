const express = require('express');
const router = express.Router();
const RecurringTask = require('../models/RecurringTask.model'); // Adjust the path based on your file structure
const {authenticateToken} = require('../middlewares/auth.middleware');
// Create a new recurring task
router.post('/recurring-task', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const {
            category,
            name,
            description,
            frequency,
            customFrequency,
            startDate,
            endDate,
            time,
            reminders,
            priority,
        } = req.body;

        // Create a new task
        const recurringTask = new RecurringTask({
            userId,
            category,
            name,
            description,
            frequency,
            customFrequency,
            startDate,
            endDate,
            time,
            reminders,
            priority,
        });

        await recurringTask.save();
        res.status(201).json({ message: 'Recurring task created successfully', recurringTask });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error creating recurring task' });
    }
});

// Get all recurring tasks
router.get('/recurring-tasks', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const recurringTasks = await RecurringTask.find({userId}).populate('userId category');
        res.status(200).json({message:"Fecthed",recurringTasks});
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error fetching recurring tasks' });
    }
});

// Get a specific recurring task by ID
router.get('/recurring-task/:id', async (req, res) => {
    try {
        const task = await RecurringTask.findById(req.params.id).populate('userId category');
        if (!task) {
            return res.status(404).json({ message: 'Recurring task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error fetching the recurring task' });
    }
});

// Update a recurring task
router.put('/recurring-task/:id', async (req, res) => {
    try {
        const updatedTask = await RecurringTask.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ message: 'Recurring task not found' });
        }
        res.status(200).json({ message: 'Recurring task updated successfully', updatedTask });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error updating recurring task' });
    }
});

// Delete a recurring task
router.delete('/recurring-task/:id', async (req, res) => {
    try {
        const task = await RecurringTask.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Recurring task not found' });
        }
        res.status(200).json({ message: 'Recurring task deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error deleting recurring task' });
    }
});

module.exports = router;
