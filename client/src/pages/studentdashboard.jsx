
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const StudentDashboard = () => {
//   const navigate = useNavigate();
//   const [student, setStudent] = useState({ name: '', email: '' });

//   useEffect(() => {
//     const stored = JSON.parse(localStorage.getItem('student'));
//     if (stored) {
//       setStudent(stored);
//     } else {
//       navigate('/student/dashboard');
//     }
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem('student');
//     navigate('/student/dashboard');
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-4 flex">
//       <div className="w-full ml-4 sm:ml-6">
//         <div className="flex justify-between items-center mb-4">
//           <h1 className="text-xl font-semibold text-gray-800">🎓 Student Dashboard</h1>
//           <button
//             onClick={handleLogout}
//             className="py-1 px-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
//           >
//             🔓 Logout
//           </button>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div
//             onClick={() => navigate('/events')}
//             className="bg-white p-3 rounded-lg shadow-md hover:shadow-lg hover:bg-blue-50 transition cursor-pointer"
//           >
//             <div className="text-2xl mb-1">📅</div>
//             <h2 className="text-base font-semibold text-gray-800 mb-1">View Events</h2>
//             <p className="text-xs text-gray-600">Click here to view the list of events.</p>
//           </div>

//           <div
//             onClick={() => navigate('/feedback')}
//             className="bg-white p-3 rounded-lg shadow-md hover:shadow-lg hover:bg-blue-50 transition cursor-pointer"
//           >
//             <div className="text-2xl mb-1">💬</div>
//             <h2 className="text-base font-semibold text-gray-800 mb-1">Provide Feedback</h2>
//             <p className="text-xs text-gray-600">Click here to submit your feedback.</p>
//           </div>

//           <div
//             onClick={() => navigate('/student/certificate')}
//             className="bg-white p-3 rounded-lg shadow-md hover:shadow-lg hover:bg-green-50 transition cursor-pointer"
//           >
//             <div className="text-2xl mb-1">📜</div>
//             <h2 className="text-base font-semibold text-gray-800 mb-1">Your Certificate</h2>
//             <p className="text-xs text-gray-600">Click here to view your certificate.</p>
//           </div>

//           <div
//             onClick={() => navigate('/student/announcements')}
//             className="bg-white p-3 rounded-lg shadow-md hover:shadow-lg hover:bg-yellow-50 transition cursor-pointer"
//           >
//             <div className="text-2xl mb-1">📢</div>
//             <h2 className="text-base font-semibold text-gray-800 mb-1">View Announcements</h2>
//             <p className="text-xs text-gray-600">See latest announcements from the admin.</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentDashboard;
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
    <div className="min-h-screen bg-gray-100 p-4 flex">
      <div className="w-full ml-4 sm:ml-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold text-gray-800">🎓 Student Dashboard</h1>
          <button
            onClick={handleLogout}
            className="py-1 px-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            🔓 Logout
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            onClick={() => navigate('/events')}
            className="bg-white p-3 rounded-lg shadow-md hover:shadow-lg hover:bg-blue-50 transition cursor-pointer"
          >
            <div className="text-2xl mb-1">📅</div>
            <h2 className="text-base font-semibold text-gray-800 mb-1">View Events</h2>
            <p className="text-xs text-gray-600">Click here to view the list of events.</p>
          </div>

          <div
            onClick={() => navigate('/feedback')}
            className="bg-white p-3 rounded-lg shadow-md hover:shadow-lg hover:bg-blue-50 transition cursor-pointer"
          >
            <div className="text-2xl mb-1">💬</div>
            <h2 className="text-base font-semibold text-gray-800 mb-1">Provide Feedback</h2>
            <p className="text-xs text-gray-600">Click here to submit your feedback.</p>
          </div>

          <div
            onClick={() => navigate('/student/certificate')}
            className="bg-white p-3 rounded-lg shadow-md hover:shadow-lg hover:bg-green-50 transition cursor-pointer"
          >
            <div className="text-2xl mb-1">📜</div>
            <h2 className="text-base font-semibold text-gray-800 mb-1">Your Certificate</h2>
            <p className="text-xs text-gray-600">Click here to view your certificate.</p>
          </div>

          <div
            onClick={() => navigate('/student/announcements')}
            className="bg-white p-3 rounded-lg shadow-md hover:shadow-lg hover:bg-yellow-50 transition cursor-pointer"
          >
            <div className="text-2xl mb-1">📢</div>
            <h2 className="text-base font-semibold text-gray-800 mb-1">View Announcements</h2>
            <p className="text-xs text-gray-600">See latest announcements from the admin.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
