const mongoose = require("mongoose");

const programSchema = new mongoose.Schema(
  {
    functionName:{
      type:String,
      required:true,
      trim:true,
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
    venue: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Pending", // or "Approved", "Rejected"
    },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    results: {
      firstPrize: String,
      secondPrize: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Program", programSchema, "program");



