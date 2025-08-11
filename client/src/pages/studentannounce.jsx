import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await axios.get('http://localhost:3001/studentview/announcement');
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
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        aria-label="Go back"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-6 text-gray-800">📢 Announcements for Students</h1>

      {announcements.length === 0 ? (
        <p className="text-gray-500">No announcements available.</p>
      ) : (
        announcements.map((a, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 mb-4"
          >
            <h2 className="text-lg font-semibold text-gray-900">{a.title}</h2>
            <p className="text-gray-700 mt-1">{a.message}</p>
            <p className="text-xs text-gray-400 mt-2">🎯 Target: {a.target}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default StudentAnnouncements;
