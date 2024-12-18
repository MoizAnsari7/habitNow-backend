// Habit.js (Mongoose Schema)
const mongoose = require('mongoose');

const IconSchema = new mongoose.Schema({
    // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // category: { type: String, required: true },
    // subcategory: { type: String, enum: ['Yes/No', 'Numeric', 'Timer', 'Checklist'], required: true },
    name: { type: String, required: true },
    // description: { type: String },
    // frequency: { type: String, enum: ['Daily', 'Weekly', 'Monthly', 'Yearly', 'Custom'], required: true },
    // customFrequency: { type: Object },  // e.g., { days: [1, 3, 5] } for specific days of the week
    // startDate: { type: Date, required: true },
    // endDate: { type: Date },
    // time: { type: String },  // e.g., '08:00 AM'
    // reminders: [{ type: String }],  // Multiple reminders allowed
    // priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
    // tracking: {
    //     lastCompleted: { type: Date },
    //     streak: { type: Number, default: 0 },
    //     totalCompletions: { type: Number, default: 0 }
    // }
});

module.exports = mongoose.model('Icons', IconSchema);
