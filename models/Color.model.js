// Habit.js (Mongoose Schema)
const mongoose = require('mongoose');

const ColorSchema = new mongoose.Schema({
    name: String,
    hexCode: String   // Color hex code
});

module.exports = mongoose.model('Colors', ColorSchema);
