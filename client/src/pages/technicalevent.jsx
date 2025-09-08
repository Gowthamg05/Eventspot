
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const TechnicalEventForm = () => {
  const [eventData, setEventData] = useState({
    functionName: '',
    category: '',
    title: '',
    venue: '',
    time: '',
    date: '',
    description: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://eventspot-2.onrender.com/faculty/estore", eventData);
      toast.success("Event created successfully!");
      navigate("/faculty/dashboard");
    } catch (err) {
      console.error("Error creating event:", err);
      toast.error("Failed to create event");
    }
  };

  return (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-6">
    <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 sm:p-8">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center text-blue-700">
        Create Event
      </h2>

      {/* Back Button */}
      <button
        type="button"
        onClick={() => navigate("/faculty/dashboard")}
        className="mb-4 text-sm text-blue-600 hover:underline"
      >
        ← Back to Dashboard
      </button>

      <form onSubmit={handleSubmit} className="space-y-4 text-sm">
        {/* Function Name */}
        <div>
          <label htmlFor="functionName" className="block text-gray-600 mb-1">
            Function Name
          </label>
          <input
            type="text"
            name="functionName"
            placeholder="Function Name"
            value={eventData.functionName}
            onChange={handleChange}
            required
            className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Category Dropdown */}
        <div>
          <label htmlFor="category" className="block text-gray-600 mb-1">
            Category
          </label>
          <select
            name="category"
            value={eventData.category}
            onChange={handleChange}
            required
            className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">-- Select Category --</option>
            <option value="Technical">Technical</option>
            <option value="Non-Technical">Non-Technical</option>
          </select>
        </div>

        {/* Event Title */}
        <div>
          <label htmlFor="title" className="block text-gray-600 mb-1">
            Event Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter title"
            value={eventData.title}
            onChange={handleChange}
            required
            className="border px-2 py-1 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-gray-600 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="3"
            placeholder="Short description"
            value={eventData.description}
            onChange={handleChange}
            required
            className="border px-2 py-1 w-full rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Date & Time */}
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1">
            <label htmlFor="date" className="block text-gray-600 mb-1">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={eventData.date}
              onChange={handleChange}
              required
              className="border px-2 py-1 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="time" className="block text-gray-600 mb-1">
              Time
            </label>
            <input
              type="text"
              id="time"
              name="time"
              placeholder="e.g., 10:00 AM"
              value={eventData.time}
              onChange={handleChange}
              required
              className="border px-2 py-1 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Venue */}
        <div>
          <label htmlFor="venue" className="block text-gray-600 mb-1">
            Venue
          </label>
          <input
            type="text"
            id="venue"
            name="venue"
            placeholder="Enter venue"
            value={eventData.venue}
            onChange={handleChange}
            required
            className="border px-2 py-1 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Create Event
        </button>
      </form>
    </div>
  </div>
);

};

export default TechnicalEventForm;
