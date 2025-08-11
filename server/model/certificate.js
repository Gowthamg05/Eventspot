const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  eventName: {
    type: String,
    required: true,
  },
  studentName: {
    type: String,
    required: true,
  },
  eventResult: {
    type: String,
    enum: ['First', 'Second', 'Participant'],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Certificate', certificateSchema);

