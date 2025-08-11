
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { User, PlusCircle, FileText, CheckCircle, UserCircle } from "lucide-react"; // Added UserCircle for icon
import { toast, ToastContainer } from "react-toastify"; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import the toast styles

const FacultyDashboard = () => {
  const [userProfile, setUserProfile] = useState({
    name: "Organizer",
    organizer: "Event Organizer",
  });

  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("Logged out successfully!"); // Display toast message
    setTimeout(() => {
      navigate("/"); // Navigate to home page after the toast disappears
    }, 1000); // 2 seconds delay to show the toast
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        await axios.get("http://localhost:3001/faculty/estore");
        // If needed, handle the response here
      } catch (error) {
        console.error("Error fetching event stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex">
      {/* ToastContainer to display toasts */}
      <ToastContainer />

      {/* Left Sidebar: Profile Section */}
      <div className="w-1/4 bg-white p-4 rounded-lg shadow-md">
        <div className="text-center mb-4">
          {/* Replaced the img tag with UserCircle icon */}
          <UserCircle className="w-20 h-20 text-gray-600 mx-auto mb-2" />
          <h2 className="text-lg font-semibold text-gray-800 mt-2">{userProfile.name}</h2>
          <p className="text-gray-600 text-xs mb-2">{userProfile.organizer}</p>

          <button
            onClick={handleLogout}
            className="w-full py-1.5 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            <User className="inline mr-2" /> Logout
          </button>
        </div>
      </div>

      {/* Right Side: Dashboard Content */}
      <div className="w-3/4 ml-6">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          🎓 Organizer Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to="/createevent/technical"
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg hover:bg-blue-50 transition"
          >
            <PlusCircle className="text-4xl mb-2" />
            <h2 className="text-lg font-semibold text-gray-800 mb-1">Create Event</h2>
            <p className="text-gray-600 text-xs">
              Start a new event for your department with all details.
            </p>
          </Link>

          <Link
            to="/faculty/certificate-approval"
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg hover:bg-blue-50 transition"
          >
            <CheckCircle className="text-4xl mb-2" />
            <h2 className="text-lg font-semibold text-gray-800 mb-1">Certificate Approval</h2>
            <p className="text-gray-600 text-xs">
              Approve certificates for verified students.
            </p>
          </Link>

          <Link
            to="/faculty/events"
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg hover:bg-blue-50 transition"
          >
            <FileText className="text-4xl mb-2" />
            <h2 className="text-lg font-semibold text-gray-800 mb-1">Event List</h2>
            <p className="text-gray-600 text-xs">
              Check events students applied and manage them.
            </p>
          </Link>

          <Link
            to="/fetchevent/approve-events"
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg hover:bg-blue-50 transition"
          >
            <CheckCircle className="text-4xl mb-2" />
            <h2 className="text-lg font-semibold text-gray-800 mb-1">View Event</h2>
            <p className="text-gray-600 text-xs">
              Approve or reject events created by faculty members.
            </p>
          </Link>

          <Link
            to="/faculty/announcements"
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg hover:bg-blue-50 transition"
          >
            <FileText className="text-4xl mb-2" />
            <h2 className="text-lg font-semibold text-gray-800 mb-1">View Announcements</h2>
            <p className="text-gray-600 text-xs">
              See announcements posted by the admin for faculty.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
