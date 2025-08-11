
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
      const response = await axios.post("http://localhost:3001/faculty/estore", eventData);
      toast.success("Event created successfully!");
      navigate("/faculty/dashboard");
    } catch (err) {
      console.error("Error creating event:", err);
      toast.error("Failed to create event");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center text-blue-700">Create Event</h2>

      {/* Back Button */}
      <button
        type="button"
        onClick={() => navigate("/faculty/dashboard")}
        className="mb-4 text-sm text-blue-600 hover:underline"
      >
        ← Back to Dashboard
      </button>

      <form onSubmit={handleSubmit} className="space-y-3 text-sm">
        
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
            className="border p-2 w-full rounded"
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
            className="border p-2 w-full rounded"
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
            className="border border-gray-300 px-2 py-1 w-full rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
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
            rows="2"
            placeholder="Short description"
            value={eventData.description}
            onChange={handleChange}
            required
            className="border border-gray-300 px-2 py-1 w-full rounded text-sm resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Date & Time */}
        <div className="flex gap-2">
          <div className="flex-1">
            <label htmlFor="date" className="block text-gray-600 mb-1">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={eventData.date}
              onChange={handleChange}
              required
              className="border border-gray-300 px-2 py-1 w-full rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="time" className="block text-gray-600 mb-1">Time</label>
            <input
              type="text"
              id="time"
              name="time"
              placeholder="e.g., 10:00 AM"
              value={eventData.time}
              onChange={handleChange}
              required
              className="border border-gray-300 px-2 py-1 w-full rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
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
            className="border border-gray-300 px-2 py-1 w-full rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-1.5 rounded text-sm hover:bg-blue-700 transition"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default TechnicalEventForm;
