const express = require('express');
const router = express.Router();
const Estore = require('../model/estore');

// this route for apply the event based upon the eventid
//automatically it choose the fucntionName and titile

router.get('/estore/:eventId', async (req, res) => {
    const { eventId } = req.params;
    try {
      const event = await Estore.findById(eventId); // Fetch a specific event
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
      res.json(event);
    } catch (error) {
      console.error('Error fetching event:', error);
      res.status(500).json({ message: 'Error fetching event' });
    }
  });
  
  module.exports = router;