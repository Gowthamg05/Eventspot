
import React, { useState } from "react";
import axios from "axios";

const CertificateVerifier = () => {
  const [email, setEmail] = useState("");
  const [event, setEvent] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://eventspot-2.onrender.com/student/certificate/verify", {
        email,
        event_name: event,
      });

      if (res.data.found) {
        setVerified(true);
        setError("");
      } else {
        setVerified(false);
        setError("❌ You have not attended this event.");
      }
    } catch (err) {
      console.error("Verification failed:", err);
      setError("Server error. Please try again.");
    }
  };

  return (
  <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">

    <h2 className="text-2xl font-bold mb-6 text-center">🎓 Certificate Access Form</h2>

    <form onSubmit={handleVerify} className="space-y-4">

      <div>
        <label className="block font-semibold text-sm mb-1">Email</label>
        <input
          type="email"
          className="border px-3 py-2 w-full rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block font-semibold text-sm mb-1">Event Name</label>
        <input
          type="text"
          className="border px-3 py-2 w-full rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={event}
          onChange={(e) => setEvent(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Verify
      </button>
    </form>

    {verified && (
      <div className="mt-4 text-center">
        <a
          href={`https://eventspot-2.onrender.com/student/certificate/download?email=${email}&event=${event}`}
          className="inline-block bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
          download
        >
          📥 Download Certificate
        </a>
      </div>
    )}

    {error && (
      <p className="text-red-500 mt-4 text-center text-sm">{error}</p>
    )}
    
  </div>
);

};

export default CertificateVerifier;

