
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminEventTable = () => {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({ functionName: '', category: '' });
  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      const res = await axios.get('http://localhost:3001/afetch/estore', {
        params: filters,
      });
      console.log("Fetched data:", res.data);

      // Ensure res.data is always an array before setting
      if (Array.isArray(res.data)) {
        setEvents(res.data);
      } else {
        console.warn('API returned non-array data:', res.data);
        setEvents([]);
      }
    } catch (err) {
      console.error('Error fetching events:', err);
      setEvents([]); // fallback to empty list to avoid map error
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [filters]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Events Overview</h2>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Filter by Function Name"
          className="border p-2 rounded"
          value={filters.functionName}
          onChange={(e) =>
            setFilters({ ...filters, functionName: e.target.value })
          }
        />
        <select
          className="border p-2 rounded"
          value={filters.category}
          onChange={(e) =>
            setFilters({ ...filters, category: e.target.value })
          }
        >
          <option value="">All Categories</option>
          <option value="technical">Technical</option>
          <option value="non-technical">Non-Technical</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Function Name</th>
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Venue</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Time</th>
            </tr>
          </thead>
          <tbody>
            {events.length > 0 ? (
              events.map((event, idx) => (
                <tr key={idx} className="border-t hover:bg-gray-50">
                  <td className="p-2 border">{event.functionName}</td>
                  <td className="p-2 border">{event.title}</td>
                  <td className="p-2 border">{event.category}</td>
                  <td className="p-2 border">{event.description}</td>
                  <td className="p-2 border">{event.venue}</td>
                  <td className="p-2 border">{event.date}</td>
                  <td className="p-2 border">{event.time}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-4 text-gray-500">
                  No events found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        
        
      </div>
      <div className="mt-6">
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded-lg"
        >
           Back 
        </button>
      </div>
      
    </div>
    
  );
};

export default AdminEventTable;
