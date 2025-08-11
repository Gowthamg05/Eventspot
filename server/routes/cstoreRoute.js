
// const express = require('express');
// const router = express.Router();
// const Certificate=require('../model/certificate');
// router.post("/certificate", async (req, res) => {
//   const { email, eventName, studentName, eventResult } = req.body;

//   try {
//     // Save certificate details in the database
//     const certificate = new Certificate({
//       email,
//       eventName,
//       studentName,
//       eventResult,
//     });

//     await certificate.save();
//     res.json({ success: true, message: "Certificate details saved successfully." });
//   } catch (err) {
//     console.error("Error saving certificate details:", err);
//     res.status(500).json({ success: false, message: "Error saving certificate details." });
//   }
// });
const express = require('express');
const router = express.Router();
const Certificate = require('../model/certificate');

// POST: Save certificate details
router.post('/certificate', async (req, res) => {
  const { email, eventName, studentName, eventResult } = req.body;

  // Basic validation
  if (!email || !eventName || !studentName || !eventResult) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  try {
    const certificate = new Certificate({
      email,
      eventName,
      studentName,
      eventResult,
    });

    await certificate.save();

    res.status(201).json({
      success: true,
      message: 'Certificate details saved successfully.',
      data: certificate, // optional: return saved data
    });
  } catch (err) {
    console.error('Error saving certificate details:', err);
    res.status(500).json({
      success: false,
      message: 'Server error while saving certificate details.',
    });
  }
});

module.exports = router;
