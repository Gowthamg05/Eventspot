
import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import emailjs from "emailjs-com";
import html2canvas from "html2canvas";

const MakeCertificate = () => {
  const location = useLocation();
  const certificateRef = useRef(null);
  const { studentName, eventName, eventResult, email } = location.state || {};

  const handleSend = async () => {
    try {
      // Convert certificate div to image
      const canvas = await html2canvas(certificateRef.current, { scale: 2 });
      const imageData = canvas.toDataURL("image/jpeg");

      // Download image (optional for testing)
      const link = document.createElement("a");
      link.href = imageData;
      link.download = `${studentName}_Certificate.jpg`;
      link.click();

      // Prepare EmailJS parameters
      const templateParams = {
        to_name: studentName,
        to_email: email,
        event_name: eventName,
        event_result: eventResult,
        // certificate_image: imageData, // This won't work directly unless you host the image
      };

      // Send email
      await emailjs.send(
        "service_qc101yo",      // your service ID
        "template_90u1xam",     // your template ID
        templateParams,
        "nWsn3MESK8nChifdu"     // your public key
      );

      alert("✅ Certificate sent successfully!");
    } catch (error) {
      console.error("❌ Failed to send certificate", error);
      alert("❌ Failed to send certificate. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-radial from-gray-100 via-white to-gray-300 px-4 py-10">
      <div
        ref={certificateRef}
        className="w-[1000px] h-auto border-[10px] border-blue-700 bg-white shadow-2xl px-10 py-8 relative text-center rounded-md"
        style={{ fontFamily: "'Times New Roman', serif", position: "relative" }}
      >
        {/* Header */}
        <div className="flex items-center justify-start mb-2">
          <img src="/mm.jpeg" alt="College Logo" className="w-24 h-24 mr-4" />
          <div className="text-center flex-1">
            <h1 className="text-2xl font-extrabold uppercase text-gray-800 tracking-wide">
              M KUMARASAMY COLLEGE OF ENGINEERING
            </h1>
            <p className="text-sm text-gray-600 uppercase">
              (Autonomous) – Karur, Tamil Nadu – 639113
            </p>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-4xl font-bold mt-6 underline decoration-blue-500">
          Certificate of Participation
        </h2>

        {/* Body */}
        <p className="mt-10 text-lg text-gray-800 leading-relaxed">
          This is to certify that{" "}
          <span className="font-bold text-blue-800 text-xl">{studentName}</span> has participated in the event{" "}
          <span className="font-semibold text-green-700 text-lg">"{eventName}"</span> and secured{" "}
          <span className="font-bold text-red-700">{eventResult}</span>, organized by the Department of EventSpotlight Team, MKCE.
        </p>

        {/* Message */}
        <p className="mt-8 italic text-lg text-gray-700 font-medium">
          Congratulations on your outstanding performance and best wishes for continued success.
        </p>

        {/* Signature */}
        <div className="flex justify-between items-end mt-20 px-6">
          <div></div>
          <div className="text-right">
            <p className="text-xl font-semibold italic mb-1">Parthiban</p>
            <p className="font-medium text-gray-700">Event Coordinator</p>
          </div>
        </div>

        {/* Watermark */}
        <div className="absolute inset-0 opacity-5">
          <img
            src="/mm.jpeg"
            alt="Watermark"
            className="w-[400px] h-[400px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
        </div>

        {/* Footer */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-gray-500">
          M KUMARASAMY COLLEGE OF ENGINEERING | Department of EventSpotlight Team
        </div>

        {/* Button */}
        <div className="mt-10">
          <button
            onClick={handleSend}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded"
          >
            Convert & Send Certificate
          </button>
        </div>
      </div>
    </div>
  );
};

export default MakeCertificate;
