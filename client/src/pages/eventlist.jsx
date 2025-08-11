
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/list/estore')
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error('Error fetching events:', err));
  }, []);

  const filteredEvents = events.filter(event => {
    const matchCategory = categoryFilter === "All" || event.category === categoryFilter;
    const matchFunctionName = event.functionName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchFunctionName;
  });

  const handleApplyClick = (eventId) => {
    navigate(`/apply-event/${eventId}`);
  };
//apply the event there it shows the table 
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <button
        className="mb-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => navigate('/student/dashboard')}
      >
        ⬅ Back
      </button>

      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">📅 Events List</h1>

      <div className="flex flex-col md:flex-row justify-between mb-4 gap-3">
        <div>
          <label className="mr-2 font-medium text-gray-700">Category:</label>
          <select
            className="border rounded px-2 py-1"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Technical">Technical</option>
            <option value="Non-Technical">Non-Technical</option>
          </select>
        </div>

        <div>
          <label className="mr-2 font-medium text-gray-700">Function Name:</label>
          <input
            type="text"
            placeholder="Search by function name"
            className="border rounded px-2 py-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-4 py-2 text-sm">Function Name</th>
              <th className="border px-4 py-2 text-sm">Category</th>
              <th className="border px-4 py-2 text-sm">Title</th>
              <th className="border px-4 py-2 text-sm">Description</th>
              <th className="border px-4 py-2 text-sm">Date</th>
              <th className="border px-4 py-2 text-sm">Time</th>
              <th className="border px-4 py-2 text-sm">Venue</th>
              <th className="border px-4 py-2 text-sm">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <tr key={event._id} className="hover:bg-blue-50">
                  <td className="border px-4 py-2 text-sm">{event.functionName}</td>
                  <td className="border px-4 py-2 text-sm">{event.category}</td>
                  <td className="border px-4 py-2 text-sm">{event.title}</td>
                  <td className="border px-4 py-2 text-sm">{event.description}</td>
                  <td className="border px-4 py-2 text-sm">
                    {new Date(event.date).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2 text-sm">{event.time}</td>
                  <td className="border px-4 py-2 text-sm">{event.venue}</td>
                  <td className="border px-4 py-2 text-sm">
                    <button
                      onClick={() => handleApplyClick(event._id)}
                      className="text-blue-600 hover:underline"
                    >
                      Apply
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center text-gray-500 py-4">
                  No events available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventList;
