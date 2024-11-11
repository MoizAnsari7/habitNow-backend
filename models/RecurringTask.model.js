// RecurringTask.js (Mongoose Schema)
const mongoose = require('mongoose');

const RecurringTaskSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: String, required: true },
    subcategory: { type: String, enum: ['Yes/No', 'Checklist'], required: true },
    name: { type: String, required: true },
    description: { type: String },
    frequency: { type: String, enum: ['Daily', 'Weekly', 'Monthly', 'Yearly', 'Custom'], required: true },
    customFrequency: { type: Object },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    time: { type: String },
    reminders: [{ type: String }],
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' }
});

module.exports = mongoose.model('RecurringTask', RecurringTaskSchema);
