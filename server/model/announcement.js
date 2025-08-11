const mongoose = require('mongoose');

// Define the schema for Announcement
const announcementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    target: {
      type: String,
      enum: ['all', 'faculty', 'students'],
      required: true,
    },
    date: {
      type: Date,
      default: Date.now, // Automatically set the current date
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the model based on the schema
const Announcement = mongoose.model('Announcement', announcementSchema);

module.exports = Announcement;
