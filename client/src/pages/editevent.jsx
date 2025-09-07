
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";


const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState({
    functionName: "",
    title: "",
    date: "",
    time: "",
    venue: "",
    category: "",
  });
  const [error, setError] = useState(""); // For error handling

  // Fetch event details
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`https://eventspot-2.onrender.com/faculty/estore/${id}`);
        setEvent(res.data);
      } catch (err) {
        console.error("Error fetching event:", err);
        setError("Failed to fetch event details.");
      }
    };
    fetchEvent();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

 
  const [isUpdating, setIsUpdating] = useState(false);

const handleUpdate = async (e) => {
  e.preventDefault();
  setIsUpdating(true);

  try {
    const response = await axios.put(`https://eventspot-2.onrender.com/faculty/estore/${id}`, event);
    alert("Event updated successfully!");
    navigate("/view-events", { replace: true });
  } catch (err) {
    console.error("Update failed:", err);
    setError("Update failed. Please try again.");
  } finally {
    setIsUpdating(false);
  }
};


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        ✏️ Edit Event
      </h2>
      <form
        onSubmit={handleUpdate}
        className="max-w-xl mx-auto bg-white p-6 rounded shadow"
      >
        {["functionName", "title", "venue", "category"].map((field, idx) => (
          <input
            key={idx}
            type="text"
            name={field}
            value={event[field]}
            onChange={handleChange}
            placeholder={`Enter ${field}`}
            className="w-full mb-4 p-2 border rounded"
            required
          />
        ))}

        <input
          type="date"
          name="date"
          value={event.date?.split("T")[0] || ""}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <input
          type="time"
          name="time"
          value={event.time}
          onChange={handleChange}
          className="w-full mb-6 p-2 border rounded"
          required
        />

        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Update
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
          >
            
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEvent;
