const express = require("express");
const Feedback = require("../model/feedback");
const router = express.Router();


router.post('/feedback', async (req, res) => {
  try {
    console.log('Received feedback:', req.body); // 👈 add this
    const newFeedback = new Feedback(req.body);
    await newFeedback.save();
    res.status(201).json({ message: 'Feedback saved successfully!' });
  } catch (error) {
    console.error('Error saving feedback:', error); // 👈 watch this in terminal
    res.status(500).json({ message: 'Error saving feedback', error });
  }
});


module.exports = router;