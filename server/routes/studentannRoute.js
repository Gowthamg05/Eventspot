// const express = require('express');
// const router = express.Router();
// const Announcement = require('../model/announcement');

// // Route to fetch announcements for students or all users
// router.get('/announcement', async (req, res) => {
//   try {
//     const studentAnnouncements = await Announcement.find({
//       target: { $in: ['student', 'students', 'all'] }
//     }).sort({ createdAt: -1 });

//     res.json(studentAnnouncements);
//   } catch (error) {
//     console.error('Error fetching student announcements:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const Announcement = require('../model/announcement');

// Route to fetch announcements for students or all users
router.get('/announcement', async (req, res) => {
  try {
    const studentAnnouncements = await Announcement.find({
      $or: [
        { target: { $regex: /^student[s]?$/i } },  // Matches 'student' or 'students' case-insensitive
        { target: { $regex: /^all$/i } }
      ]
    }).sort({ createdAt: -1 });

    res.json(studentAnnouncements);
  } catch (error) {
    console.error('Error fetching student announcements:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
