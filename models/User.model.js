// User.js (Mongoose Schema)
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    subscription: {       // Stores the current subscription type or null if not subscribed
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subscription',
        default: null
    },
    taskCount: {          // Tracks the number of tasks created by the user
        type: Number,
        default: 0
    }
});

// Password hashing middleware
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Method to check password
UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
