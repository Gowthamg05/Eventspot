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
    <div className="p-6 max-w-lg mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={eventData.title}
          onChange={handleChange}
          required
          className="border p-2 w-full rounded"
        />
        <textarea
          name="description"
          placeholder="Event Description"
          value={eventData.description}
          onChange={handleChange}
          required
          className="border p-2 w-full rounded"
        />
        <input
          type="date"
          name="date"
          value={eventData.date}
          onChange={handleChange}
          required
          className="border p-2 w-full rounded"
        />
        <input
          type="text"
          name="time"
          placeholder="Event Time"
          value={eventData.time}
          onChange={handleChange}
          required
          className="border p-2 w-full rounded"
        />
        <input
          type="text"
          name="venue"
          placeholder="Venue"
          value={eventData.venue}
          onChange={handleChange}
          required
          className="border p-2 w-full rounded"
        />
        <textarea
          name="queries"
          placeholder="Ask any doubts or queries regarding the event"
          value={eventData.queries}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        
        {/* Category Selection */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => setEventData({ ...eventData, category: "Technical" })}
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Technical
          </button>
          <button
            type="button"
            onClick={() => setEventData({ ...eventData, category: "Non-Technical" })}
            className="w-full bg-green-600 text-white py-2 rounded"
          >
            Non-Technical
          </button>
        </div>

        {/* Sub Events for the selected category */}
        <div>
          {eventData.subEvents.map((subEvent, index) => (
            <div key={index} className="mb-4">
              <input
                type="text"
                name="name"
                placeholder="Sub-Event Name"
                value={subEvent.name}
                onChange={(e) => handleSubEventChange(index, e)}
                className="border p-2 w-full mb-2 rounded"
              />
              <textarea
                name="description"
                placeholder="Sub-Event Description"
                value={subEvent.description}
                onChange={(e) => handleSubEventChange(index, e)}
                className="border p-2 w-full mb-2 rounded"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddSubEvent}
            className="bg-gray-600 text-white py-2 px-4 rounded"
          >
            Add Sub-Event
          </button>
        </div>

        <input
          type="text"
          name="department"
          value={eventData.department}
          onChange={handleChange}
          readOnly
          className="border p-2 w-full rounded bg-gray-100"
        />
        <input
          type="text"
          name="createdBy"
          value={eventData.createdBy}
          readOnly
          className="border p-2 w-full rounded bg-gray-100"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;

