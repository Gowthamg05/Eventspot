
import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const About = () => {
return (
  <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-12 font-inter text-gray-800">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

      {/* About the Project */}
      <div className="bg-white shadow-lg rounded-xl p-6 sm:p-8 border border-indigo-100">
        <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700 mb-4 border-b-2 border-indigo-400 inline-block pb-1">
          About the Project
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4 text-sm sm:text-base">
          <strong>EventSpotlight</strong> is a campus-centric event collaboration portal designed to simplify and streamline event workflows in educational institutions.
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm sm:text-base">
          <li><strong>Admins</strong> can approve/disapprove events and monitor institution-wide activity.</li>
          <li><strong>Organizer</strong> can create and categorize events into technical/non-technical types.</li>
          <li><strong>Students</strong> can register, view results, and download participation/winner certificates.</li>
          <li>Automated email alerts & certificate delivery enhance communication.</li>
          <li>Role-based dashboards ensure personalized experiences.</li>
          <li>Scalable for future inter-college collaboration & sponsor features.</li>
        </ul>
      </div>

      {/* About the Developer */}
      <div className="bg-white shadow-lg rounded-xl p-6 sm:p-8 border border-pink-100 text-center md:text-left">
        <h2 className="text-2xl sm:text-3xl font-bold text-pink-700 mb-4 border-b-2 border-pink-400 inline-block pb-1">
          About the Developer
        </h2>

        <img
          src="/gowtham-1.jpg"
          alt="Gowtham"
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover mx-auto md:mx-0 mb-4 border-4 border-pink-300"
        />

        <p className="text-gray-700 leading-relaxed mb-4 text-sm sm:text-base">
          Hi, I’m <strong className="text-blue-700">Gowtham</strong>, the developer of EventSpotlight. I'm currently pursuing MCA and passionate about solving real-world problems through full-stack web development.
          <br /><br />
          This project reflects my vision to simplify event management using tools like React, Node.js, and MongoDB.
        </p>

        {/* Skills Section */}
        <h3 className="text-lg sm:text-xl font-semibold text-pink-600 mb-2">Skills Used:</h3>
        <div className="flex flex-wrap justify-center md:justify-start gap-2 text-sm sm:text-base mb-6">
          {[
            'React.js', 'Node.js', 'Express.js', 'MongoDB',
            'Tailwind CSS', 'JWT Auth', 'Role-based Access'
          ].map(skill => (
            <span
              key={skill}
              className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Social Icons */}
        <div className="flex justify-center md:justify-start gap-6 text-2xl">
          <a
            href="https://www.linkedin.com/in/gowthamm05/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:text-blue-900 transition"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/Gowthamg05"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 hover:text-black transition"
          >
            <FaGithub />
          </a>
        </div>
      </div>

    </div>
  </div>
);

};

export default About;
