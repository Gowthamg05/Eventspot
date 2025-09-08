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
  <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6">
    <div className="max-w-3xl sm:max-w-4xl mx-auto space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">📜 Past Announcements</h2>
        <button
          onClick={() => navigate('/admin/announcements')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full sm:w-auto text-center"
        >
          Back
        </button>
      </div>

      {/* Announcements List */}
      {announcements.length === 0 ? (
        <p className="text-center text-gray-500 italic">No announcements found.</p>
      ) : (
        <div className="space-y-4">
          {announcements.map((a, i) => (
            <div
              key={i}
              className="bg-white border rounded-lg p-4 shadow hover:shadow-md transition flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2"
            >
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{a.title}</h3>
                <p className="mt-1 text-gray-700 text-sm sm:text-base">{a.message}</p>
              </div>
              <div className="mt-2 sm:mt-0 text-sm sm:text-base text-gray-500 text-right">
                <div>{a.date}</div>
                <div className="text-blue-600">Target: {a.target}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

};

export default PastAnnouncements;
