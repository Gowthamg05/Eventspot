
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
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">🎓 Certificate Access Form</h2>
      <form onSubmit={handleVerify}>
        <div className="mb-3">
          <label className="block font-semibold">Email</label>
          <input
            type="email"
            className="border px-2 py-1 w-full rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="block font-semibold">Event Name</label>
          <input
            type="text"
            className="border px-2 py-1 w-full rounded"
            value={event}
            onChange={(e) => setEvent(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Verify
        </button>
      </form>

      {verified && (
        <div className="mt-4">
          <a
            href={`https://eventspot-2.onrender.com/student/certificate/download?email=${email}&event=${event}`}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            download
          >
            📥 Download Certificate
          </a>
        </div>
      )}

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default CertificateVerifier;

