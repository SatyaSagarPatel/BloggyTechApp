import React from "react";
import { Link } from "react-router-dom";

const PublicNavbar = () => {
  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Left */}
          <div className="flex items-center space-x-8">
            <img src="/logo.png" alt="logo" className="w-10 h-10" />

            <Link
              className="font-medium text-gray-800 border-b-2 border-indigo-500 pb-1"
              to="/"
            >
              Home
            </Link>

            <Link className="text-gray-600 hover:text-black" to="/posts">
              Posts
            </Link>

            <Link className="text-gray-600 hover:text-black" to="/login">
              Login
            </Link>

            <Link className="text-gray-600 hover:text-black" to="/register">
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default PublicNavbar;
