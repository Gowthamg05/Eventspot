// Add this to routes/certificate.js

const express = require("express");
const Certificate = require("../model/certificate"); // Ensure correct import
const router = express.Router();
router.get("/certificate/:id", async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) return res.status(404).send("Certificate not found");
    res.json(certificate);
  } catch (err) {
    console.error("Error fetching certificate by ID:", err);
    res.status(500).send("Server Error");
  }
});
module.exports=router