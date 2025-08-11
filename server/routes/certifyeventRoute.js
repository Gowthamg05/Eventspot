// routes/faculty.js
const express = require('express');
const router = express.Router();
const Estore = require('../model/estore');

// GET all events
router.get('/estore', async (req, res) => {
  try {
    // Changed `name` to `title`
    const events = await Estore.find({}, 'title'); // Only return title field
    res.json({ events });
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ message: "Error fetching events" });
  }
});

module.exports = router;
