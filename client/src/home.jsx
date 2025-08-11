
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
    <div className="bg-white min-h-screen flex flex-col items-center p-8 font-sans">
      {/* Container for Title and Image */}
      <div className="flex flex-col lg:flex-row items-center justify-between w-full">
        {/* Left Side: Title */}
        <div className="lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0">
          <h1 className="text-6xl font-extrabold text-pink-800 mb-4">EventSpotlight</h1>
          <p className="text-xl md:text-2xl font-medium text-gray-700 mb-8 tracking-wide leading-snug">
            Elevating Campus Events to the Next Level
          </p>
        </div>

        {/* Right Side: Image */}
        <div className="lg:w-1/2 mt-8 lg:mt-0">
          <img
            src="event.jpeg"
            alt="Event Spotlight"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Why Choose This Platform Section */}
      <div className="w-full mt-12 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 tracking-tight">Why Choose Our Platform?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
          {[
            {
              icon: <FaUser />,
              title: 'User-Friendly Interface',
              desc: 'Our platform offers an intuitive interface that makes it easy for users to navigate and access features seamlessly.',
              color: 'text-red-600',
            },
            {
              icon: <FaShieldAlt />,
              title: 'Secure and Reliable',
              desc: 'We ensure your data is safe with advanced security protocols, and our platform runs with high reliability.',
              color: 'text-green-600',
            },
            {
              icon: <FaHeadset />,
              title: '24/7 Customer Support',
              desc: 'Our dedicated support team is available around the clock to assist you with any questions or issues you may encounter.',
              color: 'text-violet-600',
            },
            {
              icon: <FaDatabase />,
              title: 'Avoid Data Redundancy',
              desc: 'Minimize data duplication and ensure consistency across all records with our smart data management features.',
              color: 'text-yellow-600',
            },
            {
              icon: <FaChartPie />,
              title: 'Real-Time Views',
              desc: 'Get instant access to data updates and live views for improved decision-making and efficiency.',
              color: 'text-orange-600',
            },
            {
              icon: <FaFileExcel />,
              title: 'Excel-Based Reports',
              desc: 'Export detailed reports in Excel format for analysis, sharing, and storage.',
              color: 'text-blue-600',
            },
            {
              icon: <FaEye />,
              title: 'Visual Insights',
              desc: 'Leverage visual dashboards and charts to quickly understand event performance and trends.',
              color: 'text-green-600',
            },
            {
              icon: <FaHandshake />,
              title: 'Collaboration Tools',
              desc: 'Collaborate effectively with team members and departments to streamline event coordination.',
              color: 'text-rose-600',
            },
            {
              icon: <FaLayerGroup />,
              title: 'Scalable Architecture',
              desc: 'Our platform is designed to scale as your needs grow, handling increasing traffic and data.',
              color: 'text-purple-600',
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gray-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 cursor-pointer"
            >
              <div className={`text-4xl mb-4 ${item.color}`}>{item.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 tracking-tight">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed text-base">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center mt-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 tracking-tight">Ready to Get Started?</h2>
        <Link to="/signup">
          <div className="bg-blue-600 text-white py-3 px-8 rounded-full text-lg md:text-xl font-semibold shadow-lg cursor-pointer hover:bg-blue-700 transition duration-300 inline-block tracking-wide">
            Join Us Today
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
