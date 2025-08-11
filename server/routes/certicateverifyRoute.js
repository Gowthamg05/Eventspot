
const express = require("express");
const router = express.Router();
const Application = require("../model/application");
const Estore = require("../model/estore");

// POST /verify/application
router.post("/application", async (req, res) => {
  const { email } = req.body;

  try {
    // Find application by email
    const application = await Application.findOne({ email: email.trim().toLowerCase() });

    if (!application) {
      return res.json({ found: false, message: "❌ You're not registered for any event." });
    }

    // If the application exists, you can return a success message or event info if needed
    res.json({ found: true, verifiedEventName: "Your registered event name (if needed)" });

  } catch (err) {
    console.error("Error verifying application:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;
