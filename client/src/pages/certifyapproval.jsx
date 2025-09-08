
import React, { useEffect, useState } from "react";
import axios from "axios";
import emailjs from "emailjs-com";
import { useNavigate } from "react-router-dom";

const CertificateApprovalPage = () => {
  const [certificates, setCertificates] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const res = await axios.get("https://eventspot-2.onrender.com/certifyfetch/certificate");
        setCertificates(res.data);
      } catch (err) {
        console.error("Error fetching certificates", err);
      }
    };

    fetchCertificates();
  }, []);

  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleApprove = async () => {
    const selectedStudents = certificates.filter((cert) => selectedIds.includes(cert._id));

    for (const student of selectedStudents) {
      try {
        await emailjs.send(
          "your_service_id",
          "your_template_id",
          {
            to_name: student.studentName,
            to_email: student.email,
            event_name: student.eventName,
            event_result: student.eventResult,
          },
          "your_public_key"
        );
        console.log(`Email sent to ${student.studentName}`);
      } catch (error) {
        console.error(`Error sending email to ${student.studentName}:`, error);
      }
    }

    alert("Emails sent to approved students!");
    setSelectedIds([]);
  };

  const goBack = () => {
    navigate("/faculty/dashboard");
  };

  // ✅ Updated to pass certificate data via navigate
  const handleMakeCertificate = (id) => {
    const selectedCertificate = certificates.find(cert => cert._id === id);
    navigate(`/make-certificate/${id}`, { state: selectedCertificate });
  };

return (
  <div className="p-4 max-w-full mx-auto">

    <h2 className="text-xl font-bold mb-4 text-center">📄 Certificate Approval</h2>

    <div className="mb-4 text-center">
      <button
        onClick={goBack}
        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
      >
        ← Back to Dashboard
      </button>
    </div>

    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border rounded-md text-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">Select</th>
            <th className="p-2 border">Student Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Event Name</th>
            <th className="p-2 border">Result</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {certificates.map((cert) => (
            <tr key={cert._id} className="hover:bg-gray-50">
              <td className="p-2 border text-center">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(cert._id)}
                  onChange={() => handleCheckboxChange(cert._id)}
                />
              </td>
              <td className="p-2 border truncate max-w-xs">{cert.studentName}</td>
              <td className="p-2 border truncate max-w-xs">{cert.email}</td>
              <td className="p-2 border truncate max-w-xs">{cert.eventName}</td>
              <td className="p-2 border">{cert.eventResult}</td>
              <td className="p-2 border text-center">
                <button
                  onClick={() => handleMakeCertificate(cert._id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Create
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="mt-4 text-center">
      <button
        onClick={handleApprove}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        Approve Selected
      </button>
    </div>

  </div>
);

};

export default CertificateApprovalPage;
