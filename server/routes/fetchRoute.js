const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Estore = require("../model/estore");

router.get("/estore", async (req, res) => {
  try {
    const events = await Estore.find();
    if (!events || events.length === 0) {
      return res.status(404).json({ message: "No events found" });
    }
    res.status(200).json({ events });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Error fetching events" });
  }
});

module.exports = router;