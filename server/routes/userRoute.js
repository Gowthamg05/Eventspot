const express = require('express');
const router = express.Router();
const User = require('../model/user'); 

// GET route to retrieve faculty and student users
router.get('/save', async (req, res) => {
  try {
    // Fetch faculty and students from the 'save' collection
    const faculty = await User.find({ role: 'faculty' });
    const students = await User.find({ role: 'student' });

    res.status(200).json({ faculty, students }); // Sending both groups in response
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users', error });
  }
});

module.exports = router;
