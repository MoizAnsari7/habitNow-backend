// RecurringTask.js (Mongoose Schema)
const mongoose = require('mongoose');

const RecurringTaskSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    category: {  type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
        name: { type: String, required: true },
    description: { type: String },
    frequency: { type: String },
    customFrequency: { type: Object },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    time: { type: String },
    reminders: [{ type: String }],
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' }
});

module.exports = mongoose.model('RecurringTask', RecurringTaskSchema);
