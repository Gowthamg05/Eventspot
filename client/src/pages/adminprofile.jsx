
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Megaphone,
  MessageSquareText,
  CalendarDays,
  Users,
  LogOut,
} from 'lucide-react';
import adminPhoto from '/pro.png'; // make sure the path is correct

const AdminProfile = () => {
  const navigate = useNavigate();  // Initialize useNavigate hook
  const [adminData] = useState({
    name: 'Admin Name',
    photo: adminPhoto,
    organizer: 'Event Coordinator',
  });

  const handleLogout = () => {
    console.log('Admin logged out');
    // Add logout logic if necessary (e.g., clear session, localStorage, etc.)
    navigate('/');  // Navigate to the home page after logout
  };

 return (
  <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-4 sm:p-8 flex flex-col md:flex-row gap-6">

    {/* Profile Section */}
    <div className="w-full md:w-1/4 bg-white rounded-3xl shadow-xl p-6 flex flex-col items-center hover:shadow-2xl transition">
      <img
        src={adminData.photo}
        alt="Profile"
        className="w-24 h-24 rounded-full border-4 border-blue-300 shadow-md mb-3"
      />
      <h2 className="text-xl font-bold text-gray-800 text-center">{adminData.name}</h2>
      <p className="text-sm text-gray-500 text-center">{adminData.organizer}</p>

      <button
        onClick={handleLogout}
        className="mt-6 w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium flex items-center justify-center gap-2"
      >
        <LogOut size={18} /> Logout
      </button>
    </div>

    {/* Dashboard Content */}
    <div className="w-full md:w-3/4">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 text-center mb-8 tracking-wide">
        Admin Dashboard
      </h1>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          to="/admin/announcements"
          className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl hover:bg-blue-50 transition"
        >
          <Megaphone className="text-blue-600 mb-3" size={36} />
          <h3 className="text-lg font-bold text-gray-800">Manage Announcements</h3>
          <p className="text-sm text-gray-500">
            Post and manage announcements for all users.
          </p>
        </Link>

        <Link
          to="/admin/feedback"
          className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl hover:bg-blue-50 transition"
        >
          <MessageSquareText className="text-green-600 mb-3" size={36} />
          <h3 className="text-lg font-bold text-gray-800">Manage Feedback</h3>
          <p className="text-sm text-gray-500">
            View and analyze feedback from faculty and students.
          </p>
        </Link>

        <Link
          to="/admin/events"
          className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl hover:bg-blue-50 transition"
        >
          <CalendarDays className="text-purple-600 mb-3" size={36} />
          <h3 className="text-lg font-bold text-gray-800">Event Overview</h3>
          <p className="text-sm text-gray-500">Get a detailed view of all events.</p>
        </Link>

        <Link
          to="/admin/users"
          className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl hover:bg-blue-50 transition"
        >
          <Users className="text-pink-600 mb-3" size={36} />
          <h3 className="text-lg font-bold text-gray-800">User Management</h3>
          <p className="text-sm text-gray-500">
            Manage user accounts like faculty and students.
          </p>
        </Link>
      </div>
    </div>
  </div>
);

};

export default AdminProfile;
