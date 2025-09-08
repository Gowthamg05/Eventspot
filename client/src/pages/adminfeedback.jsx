
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({
    functionName: '',
    category: ''
  });

  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    axios.get('https://eventspot-2.onrender.com/afeed/feedback')
      .then(res => {
        const feedbackList = Array.isArray(res.data) ? res.data : [];
        setFeedbacks(feedbackList);
        setFiltered(feedbackList);
      })
      .catch(err => {
        console.error('Error fetching feedback:', err);
        setFeedbacks([]);
        setFiltered([]);
      });
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);

    const filteredData = feedbacks.filter(fb => {
      return (
        (newFilters.functionName === '' || fb.functionName.toLowerCase().includes(newFilters.functionName.toLowerCase())) &&
        (newFilters.category === '' || fb.category === newFilters.category)
      );
    });

    setFiltered(filteredData);
  };

  const handleBackClick = () => {
    navigate('/admin/dashboard'); // Navigate back to admin dashboard
  };

  return (
  <div className="min-h-screen p-4 sm:p-6 bg-gradient-to-br from-gray-100 to-blue-100">
    <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-black mb-10 drop-shadow">
      Feedback Management
    </h1>

    {/* Back Button */}
    <div className="mb-6 flex justify-start">
      <button
        onClick={handleBackClick}
        className="px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
      >
        Back to Dashboard
      </button>
    </div>

    {/* Filters */}
    <div className="mb-10 flex flex-col sm:flex-row justify-center gap-4">
      <input
        type="text"
        name="functionName"
        placeholder="Search by Function Name"
        className="w-full sm:w-1/3 px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={filters.functionName}
        onChange={handleFilterChange}
      />
      <select
        name="category"
        className="w-full sm:w-1/4 px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={filters.category}
        onChange={handleFilterChange}
      >
        <option value="">All Categories</option>
        <option value="technical">Technical</option>
        <option value="non-technical">Non-Technical</option>
      </select>
    </div>

    {/* Feedback Cards */}
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {filtered.length > 0 ? (
        filtered.map((fb, index) => (
          <div
            key={index}
            className="bg-white border-l-4 border-blue-500 p-4 sm:p-5 rounded-2xl shadow-lg hover:shadow-xl transition duration-300"
          >
            <h3 className="text-lg sm:text-xl font-bold text-blue-700 mb-1">
              {fb.functionName}
            </h3>
            <p className="text-sm font-semibold text-gray-600 mb-2">
              Title: {fb.title}
            </p>
            <p className="text-sm text-gray-500 mb-3 italic">
              Category: {fb.category}
            </p>
            <p className="text-gray-700 text-sm">{fb.feedback}</p>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 col-span-full text-lg">
          No feedbacks found with the selected filters.
        </p>
      )}
    </div>
  </div>
);

};

export default AdminFeedback;
