
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EventApprovalDashboard = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [functionNameFilter, setFunctionNameFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("https://eventspot-2.onrender.com/fetchevent/estore");
        const allEvents = response.data.events || [];
        setEvents(allEvents);
        setFilteredEvents(allEvents);
        setLoading(false);     
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Error fetching events. Please try again later.");
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    let filtered = events;

    if (functionNameFilter) {
      filtered = filtered.filter(event =>
        event.functionName.toLowerCase().includes(functionNameFilter.toLowerCase())
      );
    }

    if (categoryFilter) {
      filtered = filtered.filter(event => event.category === categoryFilter);
    }

    setFilteredEvents(filtered);
  }, [functionNameFilter, categoryFilter, events]);

  if (loading) return <div className="text-center mt-10 text-lg">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

return (
  <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4 flex flex-col items-center">
    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-6 text-center">
      🎓 Event Dashboard
    </h1>

    <button
      onClick={() => navigate("/faculty/dashboard")}
      className="mb-6 bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded-lg shadow"
    >
      ← Back
    </button>

    {/* Filters */}
    <div className="flex flex-col sm:flex-row flex-wrap gap-4 w-full max-w-lg mb-6">
      <input
        type="text"
        placeholder="Search Function Name"
        value={functionNameFilter}
        onChange={(e) => setFunctionNameFilter(e.target.value)}
        className="p-3 border border-gray-300 rounded-lg w-full sm:w-60 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        className="p-3 border border-gray-300 rounded-lg w-full sm:w-60 focus:outline-none focus:ring-2 focus:ring-purple-400"
      >
        <option value="">All Categories</option>
        <option value="Technical">Technical</option>
        <option value="Non-Technical">Non-Technical</option>
      </select>
    </div>

    <div className="mb-6 text-lg font-semibold text-gray-700">
      <p>Total Events: {filteredEvents.length}</p>
    </div>

    {/* Responsive Table */}
    <div className="overflow-x-auto w-full shadow-lg rounded-lg bg-white">
      <table className="min-w-full border border-gray-200 text-sm">
        <thead className="bg-indigo-600 text-white text-left text-sm uppercase tracking-wider">
          <tr>
            <th className="p-3">Function Name</th>
            <th className="p-3">Title</th>
            <th className="hidden sm:table-cell p-3">Description</th>
            <th className="p-3">Category</th>
          </tr>
        </thead>
        <tbody>
          {filteredEvents.map((event, index) => (
            <tr
              key={event._id}
              className={`transition duration-300 ease-in-out hover:bg-indigo-50 ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              }`}
            >
              <td className="p-3 font-medium text-gray-800 break-words">{event.functionName || "N/A"}</td>
              <td className="p-3 text-gray-700 break-words">{event.title || "N/A"}</td>
              <td className="hidden sm:table-cell p-3 text-gray-600 break-words">
                {event.description || "N/A"}
              </td>
              <td className="p-3 text-gray-600 break-words">{event.category || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

};

export default EventApprovalDashboard;
