// Category.js (Mongoose Schema)
const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    icon: String,        // Icon URL or identifier
    color: String,       // Color identifier or hex code
    type: {              // Type: default or custom
        type: String,
        enum: ['default', 'custom'],
        default: 'custom',
    },
    userId: {            // Only for custom categories
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: function() { return this.type === 'custom'; }
    }
});

module.exports = mongoose.model('Category', CategorySchema);

