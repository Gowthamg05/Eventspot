
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import the necessary CSS for toast notifications

const Certificate = () => {
  const [email, setEmail] = useState('');
  const [checking, setChecking] = useState(false);
  const [matched, setMatched] = useState(false);
  const [error, setError] = useState('');
  const [verifiedEventName, setVerifiedEventName] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [eventResult, setEventResult] = useState('');
  const [eventName, setEventName] = useState('');
  const [events, setEvents] = useState([]);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [certificateReady, setCertificateReady] = useState(false);

  const certificateRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('https://eventspot-2.onrender.com/event/estore');
        if (Array.isArray(res.data.events)) {
          setEvents(res.data.events);
        } else {
          console.error('Unexpected data format:', res.data);
        }
      } catch (err) {
        console.error('Error fetching events:', err);
      }
    };

    const stored = JSON.parse(localStorage.getItem('student'));
    if (stored?.email) {
      setEmail(stored.email);
    }

    fetchEvents();
  }, []);

  const handleCheck = async (e) => {
    e.preventDefault();
    setChecking(true);
    setMatched(false);
    setError('');
    setVerifiedEventName('');

    try {
      const res = await axios.post('https://eventspot-2.onrender.com/verify/application', { email });
      if (res.data.found) {
        setMatched(true);
        setVerifiedEventName(res.data.verifiedEventName || 'Event info not needed');
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      console.error('Error during verification:', err);
      setError('Something went wrong while checking your data.');
    } finally {
      setChecking(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);

    try {
      const res = await axios.post('https://eventspot-2.onrender.com/upload/certificate', {
        email,
        eventName,
        studentName,
        eventResult,
      });

      if (res.data.success) {
        toast.success('Certificate details saved successfully!'); // Show success toast
        setCertificateReady(true);
      } else {
        setError('Something went wrong while saving the certificate details.');
      }
    } catch (err) {
      console.error('Error submitting certificate details:', err);
      setError('Error submitting certificate details.');
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleGenerateCertificate = async () => {
    if (!certificateRef.current) return;
    const canvas = await html2canvas(certificateRef.current, { scale: 2 });
    const image = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = image;
    link.download = `${studentName}_Certificate.jpg`;
    link.click();

    toast.success('Certificate downloaded successfully!'); // Show success toast after download
  };

  const handleSend = async () => {
    if (!certificateRef.current) return;
    const canvas = await html2canvas(certificateRef.current, { scale: 2 });
    const image = canvas.toDataURL('image/jpeg');

    try {
      await axios.post('https://eventspot-2.onrender.com/send-certificate', {
        email,
        image,
        studentName,
      });

      toast.success('Certificate sent to your email!'); // Show success toast after sending
    } catch (err) {
      console.error('Error sending certificate:', err);
      toast.error('Failed to send certificate.'); // Show error toast if sending fails
    }
  };

  return (
  <div className="flex justify-center items-center min-h-screen bg-gradient-radial from-gray-100 via-white to-gray-300 px-4 py-10">

    {!matched && !showForm ? (
      <div className="w-full max-w-sm border-4 border-blue-700 bg-white shadow-lg p-6 rounded-md text-center">
        <h2 className="text-lg font-bold mb-4">🎓 Verify Your Email</h2>
        <form onSubmit={handleCheck} className="space-y-4">
          <div className="text-left">
            <label className="block font-semibold text-sm mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border rounded px-3 py-2 bg-gray-100"
            />
          </div>
          <button
            type="submit"
            disabled={checking}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {checking ? 'Checking...' : 'Verify'}
          </button>
        </form>
        {error && <p className="mt-3 text-red-600 text-sm">{error}</p>}
      </div>

    ) : (
      <div className="w-full max-w-xl border-4 border-blue-700 bg-white shadow-2xl p-6 rounded-md relative">

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate('/student/dashboard')}
          className="absolute top-4 left-4 bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300 transition"
        >
          ← Back to Dashboard
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">🎓 Fill Certificate Details</h2>

        {matched && verifiedEventName && !showForm && (
          <div className="flex justify-center mb-6">
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Fill Certificate Details
            </button>
          </div>
        )}

        {showForm && (
          <form onSubmit={handleFormSubmit} className="space-y-4 text-left">

            <div>
              <label className="block font-semibold text-sm mb-1">Email</label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full border rounded px-3 py-2 bg-gray-100"
              />
            </div>

            <div>
              <label className="block font-semibold text-sm mb-1">Event Name</label>
              <select
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                required
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Select Event</option>
                {events.map((ev) => (
                  <option key={ev._id} value={ev.title}>
                    {ev.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-sm mb-1">Student Name</label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block font-semibold text-sm mb-1">Event Result</label>
              <select
                value={eventResult}
                onChange={(e) => setEventResult(e.target.value)}
                required
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Select Result</option>
                <option value="First">First</option>
                <option value="Second">Second</option>
                <option value="Participant">Participant</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={formSubmitting}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              {formSubmitting ? 'Submitting...' : 'Submit Details'}
            </button>

          </form>
        )}

        {certificateReady && (
          <div className="mt-8">

            <div
              ref={certificateRef}
              className="w-full max-w-md mx-auto border-8 border-blue-700 bg-white shadow-lg p-6 rounded relative"
              style={{ fontFamily: "'Times New Roman', serif" }}
            >
              <div className="flex flex-col items-center justify-center mb-4">
                <img src="/mm.jpeg" alt="College Logo" className="w-24 h-24 mb-2" />
                <h1 className="text-xl font-extrabold uppercase text-gray-800 text-center tracking-wide">
                  M KUMARASAMY COLLEGE OF ENGINEERING
                </h1>
                <p className="text-sm text-gray-600 uppercase text-center">
                  (Autonomous) – Karur, Tamil Nadu – 639113
                </p>
              </div>

              <h2 className="text-2xl font-bold text-center mt-4 underline decoration-blue-500">
                Certificate of Participation
              </h2>

              <p className="mt-6 text-gray-800 text-center leading-relaxed">
                This certifies that{' '}
                <span className="font-bold text-blue-800">{studentName}</span> participated in{' '}
                <span className="font-semibold text-green-700">"{eventName}"</span> and secured{' '}
                <span className="font-bold text-red-700">{eventResult}</span>.
              </p>

              <p className="mt-4 italic text-center text-gray-700 font-medium">
                Congratulations on your achievement!
              </p>

              <div className="mt-6 text-right">
                <p className="font-semibold italic">Parthiban</p>
                <p className="text-gray-700">Event Coordinator</p>
              </div>

              <div className="absolute inset-0 opacity-5">
                <img
                  src="/mm.jpeg"
                  alt="Watermark"
                  className="w-48 h-48 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                />
              </div>

              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 text-center">
                M KUMARASAMY COLLEGE OF ENGINEERING | Department of EventSpotlight Team
              </div>
            </div>

            <div className="mt-4 text-center">
              <button
                onClick={handleGenerateCertificate}
                className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800"
              >
                ⬇️ Download Certificate
              </button>
            </div>
          </div>
        )}
      </div>
    )}

    <ToastContainer />
  </div>
);

};

export default Certificate;
