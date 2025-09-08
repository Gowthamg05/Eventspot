
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AnnouncementDashboard = () => {
  const [form, setForm] = useState({ title: '', message: '', target: 'all' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAnnouncement = {
      title: form.title,
      message: form.message,
      target: form.target,
    };

    try {
      const response = await fetch('https://eventspot-2.onrender.com/announce/announcement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAnnouncement),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        toast.error(errorData.message || 'Failed to send announcement');
        return;
      }

      await response.json();
      toast.success('Announcement sent successfully');
      setForm({ title: '', message: '', target: 'all' });
    } catch (error) {
      toast.error('Error sending announcement');
    }
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-8 px-4 sm:py-12 sm:px-6 font-inter">

    <div className="max-w-xl sm:max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-blue-100">

      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-indigo-700">
          📢 Create Announcement
        </h2>
        <p className="mt-2 text-gray-600 text-sm sm:text-base">
          Send announcements to students, faculty, or everyone at once.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Title Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="Enter announcement title"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Message Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows="4"
            required
            placeholder="Write your message here..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Target Audience */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience</label>
          <select
            name="target"
            value={form.target}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="all">All</option>
            <option value="faculty">Faculty</option>
            <option value="students">Students</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
          <button
            type="submit"
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-lg transition"
          >
            Send Announcement
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/dashboard')}
            className="w-full sm:w-auto bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg"
          >
            ⬅ Back
          </button>
        </div>

      </form>
    </div>

    <ToastContainer position="top-center" autoClose={3000} />
  </div>
);

};

export default AnnouncementDashboard;
