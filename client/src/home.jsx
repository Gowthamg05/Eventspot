
import { Link } from 'react-router-dom';
import React from 'react';
import {
  FaUser,
  FaShieldAlt,
  FaHeadset,
  FaDatabase,
  FaChartPie,
  FaFileExcel,
  FaEye,
  FaHandshake,
  FaLayerGroup,
} from 'react-icons/fa';

const Home = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col items-center p-4 sm:p-8 font-sans">
  {/* Container for Title and Image */}
  <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-8">
    {/* Left Side: Title */}
    <div className="lg:w-1/2 text-center lg:text-left">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-pink-800 mb-4">
        EventSpotlight
      </h1>
      <p className="text-lg sm:text-xl md:text-2xl font-medium text-gray-700 mb-6 sm:mb-8 tracking-wide leading-snug">
        Elevating Campus Events to the Next Level
      </p>
    </div>

    {/* Right Side: Image */}
    <div className="lg:w-1/2 w-full">
      <img
        src="event.jpeg"
        alt="Event Spotlight"
        className="rounded-lg shadow-lg w-full h-auto object-cover"
      />
    </div>
  </div>

  {/* Why Choose This Platform Section */}
  <div className="w-full mt-12 text-center px-2 sm:px-0">
    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 tracking-tight">
      Why Choose Our Platform?
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
      {[
        { icon: <FaUser />, title: 'User-Friendly Interface', desc: 'Intuitive interface for easy navigation.', color: 'text-red-600' },
        { icon: <FaShieldAlt />, title: 'Secure and Reliable', desc: 'Data safe with advanced security protocols.', color: 'text-green-600' },
        { icon: <FaHeadset />, title: '24/7 Customer Support', desc: 'Dedicated support team always available.', color: 'text-violet-600' },
        { icon: <FaDatabase />, title: 'Avoid Data Redundancy', desc: 'Minimize duplication and ensure consistency.', color: 'text-yellow-600' },
        { icon: <FaChartPie />, title: 'Real-Time Views', desc: 'Instant access to live data for efficiency.', color: 'text-orange-600' },
        { icon: <FaFileExcel />, title: 'Excel-Based Reports', desc: 'Export detailed reports for analysis.', color: 'text-blue-600' },
        { icon: <FaEye />, title: 'Visual Insights', desc: 'Visual dashboards to track event performance.', color: 'text-green-600' },
        { icon: <FaHandshake />, title: 'Collaboration Tools', desc: 'Coordinate effectively with your team.', color: 'text-rose-600' },
        { icon: <FaLayerGroup />, title: 'Scalable Architecture', desc: 'Platform scales as your needs grow.', color: 'text-purple-600' },
      ].map((item, index) => (
        <div
          key={index}
          className="bg-gray-100 p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105 cursor-pointer"
        >
          <div className={`text-3xl sm:text-4xl mb-3 sm:mb-4 ${item.color}`}>{item.icon}</div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{item.desc}</p>
        </div>
      ))}
    </div>
  </div>

  {/* CTA Section */}
  <div className="text-center mt-12 sm:mt-16 px-2 sm:px-0">
    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 tracking-tight">
      Ready to Get Started?
    </h2>
    <Link to="/signup">
      <div className="bg-blue-600 text-white py-2 sm:py-3 px-6 sm:px-8 rounded-full text-base sm:text-lg md:text-xl font-semibold shadow-lg cursor-pointer hover:bg-blue-700 transition duration-300 inline-block tracking-wide">
        Join Us Today
      </div>
    </Link>
  </div>
</div>

  );
};

export default Home;
