// routes/applyRoute.js
const express = require('express');
const router = express.Router();
const Application = require('../model/application');
const Estore = require('../model/estore'); // Assuming the 'Estore' model is being used for events

// POST - Apply for an event
router.post('/application', async (req, res) => {
  const { eventId, name, email, department } = req.body;

  try {
    // Check if the event exists
    const event = await Estore.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Create a new application
    const newApplication = new Application({
      eventId,
      name,
      email,
      department,
    });

    // Save application to the database
    await newApplication.save();

    // Respond with a success message
    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (err) {
    console.error('Error submitting application:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

