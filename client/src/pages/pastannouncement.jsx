import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PastAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('announcements');
    if (stored) {
      setAnnouncements(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">📜 Past Announcements</h2>
          <button
            onClick={() => navigate('/admin/announcements')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Back
          </button>
        </div>

        {announcements.length === 0 ? (
          <p className="text-gray-500 italic">No announcements found.</p>
        ) : (
          <div className="space-y-4">
            {announcements.map((a, i) => (
              <div
                key={i}
                className="bg-white border rounded-lg p-4 shadow hover:shadow-md transition"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{a.title}</h3>
                  <span className="text-sm text-gray-500">{a.date}</span>
                </div>
                <p className="mt-2 text-gray-700">{a.message}</p>
                <div className="text-sm text-blue-600 mt-2">Target: {a.target}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PastAnnouncements;
