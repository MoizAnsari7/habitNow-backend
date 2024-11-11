// Task.js (Mongoose Schema)
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    time: { type: String },  // e.g., '08:00 AM'
    reminders: [{ type: String }],
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' }
});

module.exports = mongoose.model('Task', TaskSchema);
