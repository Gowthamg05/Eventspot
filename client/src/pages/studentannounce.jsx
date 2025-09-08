import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await axios.get('https://eventspot-2.onrender.com/studentview/announcement');
        const filtered = res.data.filter(a => {
          const target = a?.target?.trim().toLowerCase();
          return target === 'student' || target === 'students' || target === 'all';
        });
        setAnnouncements(filtered);
      } catch (err) {
        console.error('Failed to fetch announcements:', err);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
  <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
    {/* Back Button */}
    <button
      onClick={() => navigate(-1)}
      className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm sm:text-base"
      aria-label="Go back"
    >
      ← Back
    </button>

    {/* Heading */}
    <h1 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800 text-center sm:text-left">
      📢 Announcements for Students
    </h1>

    {/* Announcements List */}
    {announcements.length === 0 ? (
      <p className="text-gray-500 text-center sm:text-left">No announcements available.</p>
    ) : (
      <div className="space-y-4">
        {announcements.map((a, i) => (
          <div
            key={i}
            className="bg-white p-4 sm:p-5 rounded-lg shadow-sm border border-gray-200"
          >
            <h2 className="text-base sm:text-lg font-semibold text-gray-900">{a.title}</h2>
            <p className="text-sm sm:text-base text-gray-700 mt-1">{a.message}</p>
            <p className="text-xs sm:text-sm text-gray-400 mt-2">🎯 Target: {a.target}</p>
          </div>
        ))}
      </div>
    )}
  </div>
);

};

export default StudentAnnouncements;
