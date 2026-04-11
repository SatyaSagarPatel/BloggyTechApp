import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { LogoutAction } from "../../redux/slices/users/userSlices";

const PrivateNavbar = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(LogoutAction());
    window.location.reload();
  };

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Left Side */}
          <div className="flex items-center space-x-8">
            <img src="/logo.png" alt="logo" className="w-10 h-10" />

            <Link
              className="font-medium border-b-2 border-indigo-500 pb-1"
              to="/"
            >
              Home
            </Link>

            <Link className="text-gray-600 hover:text-black" to="/posts">
              Posts
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-6 relative">
            <Link
              to="/add-post"
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              <FaPlus />
              Add New Post
            </Link>
            <div className="relative">
              {/* Avatar */}
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="profile"
                className="w-10 h-10 rounded-full object-cover cursor-pointer"
                onClick={() => setOpen(!open)}
              />

              {/* Dropdown */}
              {open && (
                <div className="absolute right-0 top-14 w-40 bg-white border rounded-lg shadow-md">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Your Profile
                  </Link>

                  <Link
                    to="/settings"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Settings
                  </Link>

                  <button
                    onClick={logoutHandler}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default PrivateNavbar;
