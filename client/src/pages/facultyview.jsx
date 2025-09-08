
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FacultyViewAnnouncement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get("https://eventspot-2.onrender.com/facultyview/announcement");
        setAnnouncements(response.data);
      } catch (err) {
        console.error("Failed to load announcements:", err);
      }
    };

    fetchAnnouncements();
  }, []);

 return (
  <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
    <div className="max-w-3xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
          📢 Faculty Announcements
        </h1>
        {/* Back Button */}
        <button
          onClick={() => navigate("/faculty/dashboard")}
          className="text-sm sm:text-base text-blue-600 hover:underline"
        >
          ← Back to Dashboard
        </button>
      </div>

      {announcements.length === 0 ? (
        <p className="text-center text-gray-500">No announcements found.</p>
      ) : (
        <div className="space-y-4">
          {announcements.map((a, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 sm:p-6 hover:shadow-lg transition"
            >
              <h2 className="text-base sm:text-lg font-bold text-gray-700">
                {a.title}
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mt-1">{a.message}</p>
              <span className="text-xs sm:text-sm text-blue-500 mt-2 inline-block">
                Target: {a.target.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

};

export default FacultyViewAnnouncement;
