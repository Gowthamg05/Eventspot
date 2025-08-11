const express = require('express');
const router = express.Router();
const Estore = require('../model/estore')
const Application = require('../model/application');





router.get('/application', async (req, res) => {
    try {
      const applications = await Application.find().populate('eventId');
      res.json(applications);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to fetch applications" });
    }
  });
  
  module.exports = router;