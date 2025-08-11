
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true, enum: ['admin', 'faculty', 'student'] },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    department: { type: String },
    registerNumber: { type: String },
    year: { type: String }
}, {
    timestamps: true
});

// Specify collection name 'save'
const User = mongoose.model('User', userSchema, 'save');

module.exports = User;
