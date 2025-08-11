
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ApplyEvent = () => {
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState({});
  const [formData, setFormData] = useState({ name: '', email: '', department: '' });
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3001/eve/estore/${eventId}`)
      .then(res => res.json())
      .then(data => setEventDetails(data))
      .catch(err => console.error('Error fetching event details:', err));
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser) {
        setFormData(prev => ({
          ...prev,
          email: storedUser.email || '',
          name: storedUser.name || '',
        }));
      }
  
  }, [eventId]);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/apply/application', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventId, ...formData }),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success('Application submitted successfully!', {
          position: 'top-center',
          autoClose: 3000,
        });
        setTimeout(() => navigate('/events'), 3500);
      })
      .catch((err) => {
        toast.error('Failed to submit application. Try again.', {
          position: 'top-center',
        });
        console.error('Error submitting application:', err);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-md shadow border border-gray-200">
        <button
          className="mb-4 text-sm text-blue-600 hover:underline"
          onClick={() => navigate(-1)}
        >
          ⬅ Back
        </button>

        <h1 className="text-xl font-semibold text-center text-gray-800 mb-6">
          Apply for {eventDetails.title}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Function Name</label>
            <input
              type="text"
              value={eventDetails.functionName || ''}
              className="w-full border border-gray-300 rounded-sm px-3 py-1.5 text-sm bg-gray-100"
              disabled
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Event Title</label>
            <input
              type="text"
              value={eventDetails.title || ''}
              className="w-full border border-gray-300 rounded-sm px-3 py-1.5 text-sm bg-gray-100"
              disabled
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Your Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-sm px-3 py-1.5 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-sm px-3 py-1.5 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-sm px-3 py-1.5 text-sm"
              required
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 rounded-sm"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>

      {/* Toast container */}
      <ToastContainer />
    </div>
  );
};

export default ApplyEvent;
