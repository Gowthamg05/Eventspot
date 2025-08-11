
import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaHome,
  FaInfoCircle,
  FaEnvelope,
  FaRocket,
  FaCalendarAlt,
} from 'react-icons/fa';

const Header = () => (
  <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 shadow-md font-inter rounded-b-lg">
    <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
      
      {/* Logo / Title */}
      <div className="flex items-center gap-2 text-3xl font-black tracking-tight">
        <FaCalendarAlt className="text-white" />
        <span className="text-white">Event_</span>
      </div>

      {/* Navigation */}
      <nav className="flex items-center space-x-6 text-sm sm:text-base font-medium">
        <Link
          to="/"
          className="flex items-center gap-2 text-white hover:text-indigo-300 transition-colors duration-300"
        >
          <FaHome className="text-lg" />
          Home
        </Link>

        <Link
          to="/about"
          className="flex items-center gap-2 text-white hover:text-indigo-300 transition-colors duration-300"
        >
          <FaInfoCircle className="text-lg" />
          About Us
        </Link>

        <Link
          to="/contact"
          className="flex items-center gap-2 text-white hover:text-indigo-300 transition-colors duration-300"
        >
          <FaEnvelope className="text-lg" />
          Contact
        </Link>

        {/* Get Started Button */}
        <Link
          to="/signup"
          className="ml-4 flex items-center gap-2 bg-white text-indigo-700 font-semibold px-4 py-2 rounded-full border border-white hover:bg-indigo-50 hover:border-indigo-200 transition duration-300 shadow-sm"
        >
          <FaRocket className="text-sm" />
          Get Started
        </Link>
      </nav>
    </div>
  </header>
);

export default Header;
