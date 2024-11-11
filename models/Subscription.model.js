// Subscription.js (Mongoose Schema)
const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    taskLimit: { type: Number, default: Infinity } // Unlimited tasks by default for subscribed users
});

module.exports = mongoose.model('Subscription', SubscriptionSchema);
