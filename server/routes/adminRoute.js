const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Estore = require("../model/estore");


//Admin fetch the event... 

router.get('/estore', async (req, res) => {
  try {
    const { functionName, category } = req.query;
    const filter = {};

    // Case-insensitive partial match for functionName
    if (functionName) {
      filter.functionName = { $regex: new RegExp(functionName, "i") };
    }

    // Case-insensitive exact match for category (handles "Technical" or "Non-Technical")
    if (category) {
      filter.category = { $regex: new RegExp(`^${category.trim()}$`, "i") };
    }

    const events = await Estore.find(filter);
    res.status(200).json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json([]);
  }
});

 module.exports = router;
