const RecurringTask = require('../models/RecurringTask');

router.post('/recurring-tasks', async (req, res) => {
    const { userId, category, subcategory, name, description, frequency, customFrequency, startDate, endDate, time, reminders, priority } = req.body;

    try {
        const recurringTask = new RecurringTask({
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

        await recurringTask.save();
        res.status(201).send({ message: 'Recurring task created successfully', recurringTask });
    } catch (error) {
        res.status(400).send({ error: 'Failed to create recurring task', details: error.message });
    }
});


module.exports = router;