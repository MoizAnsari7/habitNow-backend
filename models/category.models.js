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

// Icon.js (Mongoose Schema)
const IconSchema = new mongoose.Schema({
    name: String,
    url: String    // Icon URL or path
});

module.exports = mongoose.model('Icon', IconSchema);

// Color.js (Mongoose Schema)
const ColorSchema = new mongoose.Schema({
    name: String,
    hexCode: String   // Color hex code
});

module.exports = mongoose.model('Color', ColorSchema);
