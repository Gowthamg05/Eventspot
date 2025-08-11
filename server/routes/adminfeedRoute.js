
const express = require("express");
const Feedback = require("../model/feedback");
const router = express.Router();

router.get('/feedback', async (req, res) => {
  try {
    const feedbacks = await Feedback.find(); // Fetch all feedbacks
    res.status(200).json(feedbacks); // Send array response
  } catch (err) {
    console.error('Error fetching feedbacks:', err);
    res.status(500).json({ error: 'Failed to fetch feedbacks' });
  }
});

module.exports = router;
