
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState({ name: '', email: '' });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('student'));
    if (stored) {
      setStudent(stored);
    } else {
      navigate('/student/dashboard');  // If no student data, navigate to login or dashboard
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('student');  // Clear student data from localStorage
    navigate('/');  // Navigate to the home page
  };

return (
  <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
    {/* Header */}
    <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
      <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-0">
        🎓 Student Dashboard
      </h1>
      <button
        onClick={handleLogout}
        className="py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition text-sm sm:text-base"
      >
        🔓 Logout
      </button>
    </div>

    {/* Dashboard Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div
        onClick={() => navigate('/events')}
        className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg hover:bg-blue-50 transition cursor-pointer"
      >
        <div className="text-3xl sm:text-4xl mb-2 text-center sm:text-left">📅</div>
        <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 text-center sm:text-left">
          View Events
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
          Click here to view the list of events.
        </p>
      </div>

      <div
        onClick={() => navigate('/feedback')}
        className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg hover:bg-blue-50 transition cursor-pointer"
      >
        <div className="text-3xl sm:text-4xl mb-2 text-center sm:text-left">💬</div>
        <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 text-center sm:text-left">
          Provide Feedback
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
          Click here to submit your feedback.
        </p>
      </div>

      <div
        onClick={() => navigate('/student/certificate')}
        className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg hover:bg-green-50 transition cursor-pointer"
      >
        <div className="text-3xl sm:text-4xl mb-2 text-center sm:text-left">📜</div>
        <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 text-center sm:text-left">
          Your Certificate
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
          Click here to view your certificate.
        </p>
      </div>

      <div
        onClick={() => navigate('/student/announcements')}
        className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg hover:bg-yellow-50 transition cursor-pointer"
      >
        <div className="text-3xl sm:text-4xl mb-2 text-center sm:text-left">📢</div>
        <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 text-center sm:text-left">
          View Announcements
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
          See latest announcements from the admin.
        </p>
      </div>
    </div>
  </div>
);

};

export default StudentDashboard;
