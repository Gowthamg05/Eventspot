
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_qc101yo",       // Your EmailJS Service ID
        "template_nzweh23",      // Your Template ID
        form.current,
        "nWsn3MESK8nChifdu"      // Your Public Key
      )
      .then(
        () => {
          toast.success("📨 Message sent successfully!");
          form.current.reset();
        },
        (error) => {
          toast.error("❌ Something went wrong. Try again.");
          console.error(error.text);
        }
      );
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex justify-center items-center p-4">

    <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-xl">

      <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">📩 Get in Touch</h2>

      <form ref={form} onSubmit={sendEmail} className="space-y-4">

        <div>
          <label className="block text-gray-600 text-sm mb-1">Name</label>
          <input
            type="text"
            name="user_name"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block text-gray-600 text-sm mb-1">Email</label>
          <input
            type="email"
            name="user_email"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-gray-600 text-sm mb-1">Message</label>
          <textarea
            name="message"
            rows="4"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm resize-none"
            placeholder="Type your message..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition text-sm"
        >
          Send Message
        </button>

      </form>

    </div>

    <ToastContainer position="top-right" autoClose={2000} />
    
  </div>
);

};

export default Contact;
