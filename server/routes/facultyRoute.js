const express = require("express");
const router = express.Router();
const Estore = require("../model/estore");

// Create event
router.post("/estore", async (req, res) => {
  try {
    const { functionName, category, title, venue, time, date, description } = req.body;

    console.log("📦 Received Event Data:", req.body);

    // Check required fields
    if (!functionName || !category || !title || !venue || !time || !date || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Convert date string to actual Date object (important!)
    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    const newEvent = new Estore({
      functionName,
      category,
      title,
      venue,
      time,
      date: parsedDate,
      description,
    });

    await newEvent.save();

    console.log("✅ Event saved successfully!");
    res.status(201).json({ message: "Event created successfully" });
  } catch (error) {
    console.error("❌ Create Event Error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

module.exports = router;


router.get("/estore", async (req, res) => {
  try {
    const { functionName, category } = req.query;

    const query = {};

    // Filter by functionName (using regex for case-insensitive search)
    if (functionName) {
      query.functionName = { $regex: new RegExp(functionName, "i") };
    }

    
    if (category) {
      query.category = { $regex: new RegExp(category.trim(), "i") };
    }
    

    const events = await Estore.find(query);

    res.status(200).json({ events });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Error fetching events" });
  }
});



// Update event status (approved, rejected, etc.)
router.put("/faculty/estore/:id", async (req, res) => {
  const { id } = req.params;

  // Check if the ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid event ID" });
  }

  try {
    const updatedEvent = await Estore.findByIdAndUpdate(id, req.body, {
      new: true,            // return the updated document
      runValidators: true,  // run schema validators
    });

    if (!updatedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error("Error while updating event:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
