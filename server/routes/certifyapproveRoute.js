// // routes/certificate.js

// const express = require("express");
// const Certificate=require("../model/certificate");
// const router = express.Router();




// router.get("/certificate", async (req, res) => {
//   try {
//     const certificates = await Certificate.find();
//     res.json(certificates);
//   } catch (err) {
//     console.error("DB error:", err);
//     res.status(500).send("Server Error");
//   }
// });

// module.exports = router;
// routes/certificate.js

const express = require("express");
const Certificate = require("../model/certificate"); // Ensure correct import
const router = express.Router();

// Fetch certificate data (email, studentName, eventName, eventResult)
router.get("/certificate", async (req, res) => {
  try {
    // Fetch certificates from the database
    const certificates = await Certificate.find();
    // Send back the fetched certificates as JSON
    res.json(certificates);
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
