const express = require('express');
const router = express.Router();
const Estore = require('../model/estore'); // ✅ Make sure the path is correct

// GET all events from estore collection


//this route is used for show the list to the students
router.get('/estore', async (req, res) => {
  try {
    const events = await Estore.find(); // ✅ Corrected model usage
    res.json(events);
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
