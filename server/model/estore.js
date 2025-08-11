
const mongoose = require("mongoose");

const estoreSchema = new mongoose.Schema(
  {
    functionName: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ["Technical", "Non-Technical"],
      required: true,
    },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    time: { type: String, required: true, trim: true },
    venue: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Estore", estoreSchema, "estore");
