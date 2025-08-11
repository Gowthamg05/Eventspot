
const mongoose = require("mongoose");

const programSchema = new mongoose.Schema({
  functionname: {
    type: String,
    required:true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
  },
  venue: {
    type: String,
    required: true,
    trim: true,
  },
}, {
  timestamps: true // optional: adds createdAt and updatedAt fields
});

module.exports = mongoose.model("Program", programSchema, "program");

