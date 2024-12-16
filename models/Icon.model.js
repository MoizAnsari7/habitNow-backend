// Habit.js (Mongoose Schema)
const mongoose = require('mongoose');

const IconSchema = new mongoose.Schema({
    name: String,
    url: String    // Icon URL or path
});

module.exports = mongoose.model('Icons', IconSchema);
