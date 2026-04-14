import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
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
            <Link to="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center rounded-lg bg-indigo-100 p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-indigo-600"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625zM7.5 15a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 15zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H8.25z"
                    clipRule="evenodd"
                  />
                  <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
                </svg>
              </div>
              <span className="text-xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                BloggyTech
              </span>
            </Link>

            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive
                  ? "font-medium text-gray-800 border-b-2 border-indigo-500 pb-1"
                  : "text-gray-600 hover:text-black"
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/posts"
              end
              className={({ isActive }) =>
                isActive
                  ? "font-medium text-gray-800 border-b-2 border-indigo-500 pb-1"
                  : "text-gray-600 hover:text-black"
              }
            >
              Posts
            </NavLink>
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
                    to="/user-profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    Your Profile
                  </Link>

                  <Link
                    to="/settings"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setOpen(false)}
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
