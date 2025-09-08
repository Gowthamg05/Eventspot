import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateEvent = ({ user }) => {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    venue: '',
    time: '',
    department: user?.department || '',
    createdBy: user?.email || '',
    queries: '',
    category: '', 
    subEvents: [], 
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleAddSubEvent = () => {
    setEventData({
      ...eventData,
      subEvents: [...eventData.subEvents, { name: '', description: '' }],
    });
  };

  const handleSubEventChange = (index, e) => {
    const updatedSubEvents = [...eventData.subEvents];
    updatedSubEvents[index][e.target.name] = e.target.value;
    setEventData({ ...eventData, subEvents: updatedSubEvents });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://eventspot-2.onrender.com/faculty/estore", eventData);
      toast.success("Event created successfully!");
      navigate("/faculty/dashboard");
    } catch (err) {
      console.error("Error creating event:", err);
      toast.error("Failed to create event");
    }
  };

  return (
  <div className="p-4 min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex justify-center items-center">
    <div className="w-full max-w-lg bg-white p-6 rounded-2xl shadow-lg">

      <h2 className="text-2xl font-bold mb-6 text-center">📅 Create Event</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={eventData.title}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
        />

        <textarea
          name="description"
          placeholder="Event Description"
          value={eventData.description}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm resize-none"
          rows="4"
        />

        <input
          type="date"
          name="date"
          value={eventData.date}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
        />

        <input
          type="text"
          name="time"
          placeholder="Event Time"
          value={eventData.time}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
        />

        <input
          type="text"
          name="venue"
          placeholder="Venue"
          value={eventData.venue}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
        />

        <textarea
          name="queries"
          placeholder="Any doubts or queries?"
          value={eventData.queries}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm resize-none"
          rows="3"
        />

        {/* Category Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            onClick={() => setEventData({ ...eventData, category: "Technical" })}
            className={`w-full py-2 rounded text-white ${eventData.category === 'Technical' ? 'bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            Technical
          </button>
          <button
            type="button"
            onClick={() => setEventData({ ...eventData, category: "Non-Technical" })}
            className={`w-full py-2 rounded text-white ${eventData.category === 'Non-Technical' ? 'bg-green-700' : 'bg-green-600 hover:bg-green-700'}`}
          >
            Non-Technical
          </button>
        </div>

        {/* Sub Events */}
        <div>
          {eventData.subEvents.map((subEvent, index) => (
            <div key={index} className="mb-4">
              <input
                type="text"
                name="name"
                placeholder="Sub-Event Name"
                value={subEvent.name}
                onChange={(e) => handleSubEventChange(index, e)}
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm mb-2"
              />
              <textarea
                name="description"
                placeholder="Sub-Event Description"
                value={subEvent.description}
                onChange={(e) => handleSubEventChange(index, e)}
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm resize-none"
                rows="3"
              />
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddSubEvent}
            className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
          >
            ➕ Add Sub-Event
          </button>
        </div>

        <input
          type="text"
          name="department"
          value={eventData.department}
          onChange={handleChange}
          readOnly
          className="w-full border p-3 rounded-lg bg-gray-100 text-sm"
        />

        <input
          type="text"
          name="createdBy"
          value={eventData.createdBy}
          readOnly
          className="w-full border p-3 rounded-lg bg-gray-100 text-sm"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 text-sm"
        >
          ✅ Create Event
        </button>
      </form>

    </div>
  </div>
);


};

export default CreateEvent;

