
const express = require('express');
const router = express.Router();
const Announcement = require('../model/announcement'); // Announcement model
const User = require('../model/user'); // Assuming you have a User model

// POST route to create a new announcement and send to the target audience
router.post('/announcement', async (req, res) => {
  const { title, message, target } = req.body;

  try {
    const newAnnouncement = new Announcement({ title, message, target });
    await newAnnouncement.save();

    let usersToNotify;
    if (target === 'all') {
      usersToNotify = await User.find();
    } else {
      usersToNotify = await User.find({ role: target });
    }

    usersToNotify.forEach(user => {
      console.log(`Sent to ${user.email}: ${title} - ${message}`);
    });

    // ✅ Always send valid JSON
    res.status(201).json({
      message: 'Announcement created and sent successfully',
      announcement: newAnnouncement,
    });
  } catch (error) {
    console.error('Server Error:', error);
    // ✅ Ensure even error responses return JSON
    res.status(500).json({ message: 'Error creating announcement', error: error.message });
  }
});
module.exports=router;