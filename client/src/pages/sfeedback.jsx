
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FeedbackForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    functionName: '',
    title: '',
    category: '',
    feedback: '',
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch('https://eventspot-2.onrender.com/feed/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('✅ Feedback submitted successfully!');
        setTimeout(() => navigate('/student/dashboard'), 2000); // Wait for toast before navigating
      } else {
        toast.error('❌ Failed to submit feedback.');
      }
    } catch (err) {
      console.error('Feedback error:', err);
      toast.error('🚫 Error submitting feedback.');
    }
  };

  return (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-6">
    <ToastContainer position="top-center" autoClose={2000} />
    <div className="bg-white p-6 sm:p-8 rounded-md shadow-md w-full max-w-md">
      
      {/* Heading */}
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800 text-center sm:text-left">
        📝 Submit Feedback
      </h2>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="text-sm sm:text-base text-blue-600 hover:text-blue-800 mb-4"
      >
        ← Back
      </button>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Function Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Function Name</label>
          <input
            type="text"
            name="functionName"
            value={formData.functionName}
            onChange={handleChange}
            required
            className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-sm sm:text-base"
          />
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-sm sm:text-base"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-sm sm:text-base"
          >
            <option value="">Select</option>
            <option value="technical">Technical</option>
            <option value="non-technical">Non-Technical</option>
            <option value="organization">Organization</option>
          </select>
        </div>

        {/* Feedback */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Feedback</label>
          <textarea
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
            required
            className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-sm sm:text-base"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm sm:text-base"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  </div>
);

};

export default FeedbackForm;

