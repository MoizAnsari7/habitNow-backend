const Task = require('../models/Task');
const User = require('../models/User');

// Create Task
router.post('/tasks', async (req, res) => {
    const userId = req.user.id; // Assuming user ID is extracted from JWT
    try {
        const user = await User.findById(userId).populate('subscription');

        // Check if user has a subscription or has reached the task limit
        const taskLimit = user.subscription ? user.subscription.taskLimit : 10;
        if (user.taskCount >= taskLimit) {
            return res.status(403).send({ error: 'Task limit reached. Subscribe to create more tasks.' });
        }

        const task = new Task({ ...req.body, userId });
        await task.save();

        // Update user's task count
        user.taskCount += 1;
        await user.save();

        res.status(201).send(task);
    } catch (error) {
        res.status(500).send({ error: 'Failed to create task' });
    }
});
