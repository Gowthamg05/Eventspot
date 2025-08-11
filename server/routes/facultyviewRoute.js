const express = require("express");
const router = express.Router();
const Announcement= require("../model/announcement");
router.get('/announcement', async (req, res) => {
  try {
    const announcements = await Announcement.find({
      target: { $in: ['all', 'faculty'] }
    }).sort({ createdAt: -1 }); // Sort newest first
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch announcements" });
  }
});
module.exports=router;