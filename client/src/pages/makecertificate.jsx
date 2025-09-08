
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
      className="w-full max-w-[1000px] h-auto border-8 sm:border-[10px] border-blue-700 bg-white shadow-2xl px-4 sm:px-10 py-6 sm:py-8 relative text-center rounded-md"
      style={{ fontFamily: "'Times New Roman', serif", position: "relative" }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start mb-4 sm:mb-2">
        <img src="/mm.jpeg" alt="College Logo" className="w-20 h-20 sm:w-24 sm:h-24 mb-2 sm:mb-0 sm:mr-4" />
        <div className="text-center sm:text-left flex-1">
          <h1 className="text-xl sm:text-2xl font-extrabold uppercase text-gray-800 tracking-wide">
            M KUMARASAMY COLLEGE OF ENGINEERING
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 uppercase">
            (Autonomous) – Karur, Tamil Nadu – 639113
          </p>
        </div>
      </div>

      {/* Title */}
      <h2 className="text-2xl sm:text-4xl font-bold mt-4 sm:mt-6 underline decoration-blue-500">
        Certificate of Participation
      </h2>

      {/* Body */}
      <p className="mt-6 sm:mt-10 text-sm sm:text-lg text-gray-800 leading-relaxed">
        This is to certify that{" "}
        <span className="font-bold text-blue-800 text-base sm:text-xl">{studentName}</span> has participated in the event{" "}
        <span className="font-semibold text-green-700 text-sm sm:text-lg">"{eventName}"</span> and secured{" "}
        <span className="font-bold text-red-700">{eventResult}</span>, organized by the Department of EventSpotlight Team, MKCE.
      </p>

      {/* Message */}
      <p className="mt-4 sm:mt-8 italic text-sm sm:text-lg text-gray-700 font-medium">
        Congratulations on your outstanding performance and best wishes for continued success.
      </p>

      {/* Signature */}
      <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end mt-10 sm:mt-20 px-4 sm:px-6">
        <div></div>
        <div className="text-center sm:text-right mt-4 sm:mt-0">
          <p className="text-lg sm:text-xl font-semibold italic mb-1">Parthiban</p>
          <p className="font-medium text-gray-700 text-sm sm:text-base">Event Coordinator</p>
        </div>
      </div>

      {/* Watermark */}
      <div className="absolute inset-0 opacity-5">
        <img
          src="/mm.jpeg"
          alt="Watermark"
          className="w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      {/* Footer */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs sm:text-sm text-gray-500 text-center">
        M KUMARASAMY COLLEGE OF ENGINEERING | Department of EventSpotlight Team
      </div>

      {/* Button */}
      <div className="mt-6 sm:mt-10">
        <button
          onClick={handleSend}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 sm:px-6 py-2 sm:py-2.5 rounded"
        >
          Convert & Send Certificate
        </button>
      </div>
    </div>
  </div>
);

};

export default MakeCertificate;
