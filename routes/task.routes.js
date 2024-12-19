const express = require('express');
const router = express.Router();
const Task = require('../models/Task.model');
const User = require('../models/User.model');
const { authenticateToken } = require('../middlewares/auth.middleware');

// Middleware to check task limits
const checkTaskLimit = async (req, res, next) => {
    try {
        const userId = req.user.id; // Assuming JWT middleware adds user ID to req.user
        const user = await User.findById(userId).populate('subscription');

        // Check user's task limit
        const taskLimit = user.subscription ? user.taskCount : 10;
        if (user.taskCount >= taskLimit) {
            return res.status(403).send({ error: 'Task limit reached. Upgrade your subscription to create more tasks.' });
        }

        req.user = user; // Attach user object for later use
        next();
    } catch (error) {
        console.log("EEERRRORRR" , error);
        
        res.status(500).send({ error: 'Failed to check task limit' });
    }
};

// -------------------- CREATE TASK --------------------
router.post('/tasks',authenticateToken, checkTaskLimit, async (req, res) => {
    const { name, description, date, time, reminders, priority } = req.body;
    const userId = req.user.id;

    try {
        const task = new Task({
            userId,
            name,
            description,
            date,
            time,
            reminders,
            priority
        });

        await task.save();

        // Update user's task count
        req.user.taskCount += 1;
        await req.user.save();

        res.status(201).send({ message: 'Task created successfully', task });
    } catch (error) {
        res.status(500).send({ error: 'Failed to create task', details: error.message });
    }
});

// -------------------- GET ALL TASKS --------------------
router.get('/tasks',authenticateToken, async (req, res) => {
    const userId = req.user.id; // JWT middleware provides user ID
    try {
        const tasks = await Task.find();
        res.status(200).send({message:"Fetch",tasks});
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch tasks', error });
    }
});

// -------------------- GET TASK BY ID --------------------
router.get('/tasks/:id', async (req, res) => {
    const taskId = req.params.id;

    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).send({ error: 'Task not found' });
        }
        res.status(200).send(task);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch task' });
    }
});

// -------------------- UPDATE TASK --------------------
router.put('/tasks/:id', async (req, res) => {
    const taskId = req.params.id;
    const updates = req.body;

    try {
        const task = await Task.findByIdAndUpdate(taskId, updates, { new: true });
        if (!task) {
            return res.status(404).send({ error: 'Task not found' });
        }
        res.status(200).send({ message: 'Task updated successfully', task });
    } catch (error) {
        res.status(500).send({ error: 'Failed to update task' });
    }
});

// -------------------- DELETE TASK --------------------
router.delete('/tasks/:id', async (req, res) => {
    const taskId = req.params.id;

    try {
        const task = await Task.findByIdAndDelete(taskId);
        if (!task) {
            return res.status(404).send({ error: 'Task not found' });
        }

        // Update user's task count
        const user = await User.findById(task.userId);
        if (user) {
            user.taskCount -= 1;
            await user.save();
        }

        res.status(200).send({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).send({ error: 'Failed to delete task' });
    }
});

module.exports = router;
