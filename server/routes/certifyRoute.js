
const express = require('express');
const router = express.Router();
const Application = require('../model/application'); // Applied students model
const Estore = require('../model/estore'); // Events model

// GET: Fetch applied students with estore details
router.get("/application", async (req, res) => {
  try {
    // Fetch all applications
    const applications = await Application.find();

    // Fetch all events from estore collection
    const estore = await Estore.find();

    // Enrich applications with functionName and title from estore
    const enrichedApplications = applications.map((app) => {
      // Find the matching event using eventId
      const event = estore.find((e) => e._id.toString() === app.eventId.toString());

      // Add event details to the application
      return {
        ...app.toObject(),
        functionName: event?.functionName || "N/A",
        title: event?.title || "N/A",
      };
    });

    // Return the enriched data
    res.json(enrichedApplications);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
