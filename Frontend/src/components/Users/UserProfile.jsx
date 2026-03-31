import React from "react";
import { FaCamera } from "react-icons/fa";

const UserProfile = () => {
  const user = {
    name: "Ricardo Cooper",
    phone: "(555) 123-4567",
    email: "ricardocooper@example.com",
    title: "Senior Front-End Developer",
    team: "Product Development",
    location: "San Francisco",
    sits: "Oasis, 4th floor",
    salary: "$145,000",
    birthday: "June 8, 1990",
    about:
      "Tincidunt quam neque in cursus viverra orci, dapibus nec tristique.",
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Cover Section */}
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470"
          className="w-full h-64 object-cover"
          alt=""
        />

        {/* Cover Upload Icon */}
        <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow">
          <FaCamera size={16} />
        </button>

        {/* Profile Header */}
        <div className="max-w-6xl mx-auto px-6">
          <div className="relative flex items-end -mt-14">
            {/* Avatar */}
            <div className="relative">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                className="w-32 aspect-square rounded-full object-cover border-4 border-white"
                alt=""
              />

              {/* Avatar Upload Icon */}
              <button className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow">
                <FaCamera size={14} />
              </button>
            </div>

            {/* Username + Buttons */}
            <div className="ml-6 flex justify-between items-end w-full pb-2">
              {/* Username slightly lower */}
              <h2 className="text-2xl font-bold">{user.name}</h2>

              {/* Action Buttons */}
              <div className="space-x-2">
                <button className="px-4 py-2 border rounded-lg text-sm">
                  👁 20
                </button>

                <button className="px-4 py-2 border rounded-lg text-sm">
                  Unblock
                </button>

                <button className="px-4 py-2 border rounded-lg text-sm">
                  Block
                </button>

                <button className="px-4 py-2 border rounded-lg text-sm">
                  Follow
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="max-w-6xl mx-auto px-6 py-10 bg-white">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Left */}
          <div className="space-y-6">
            <div>
              <p className="text-gray-500 text-sm">Phone</p>
              <p>{user.phone}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Title</p>
              <p>{user.title}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Location</p>
              <p>{user.location}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Salary</p>
              <p>{user.salary}</p>
            </div>
          </div>

          {/* Right */}
          <div className="space-y-6">
            <div>
              <p className="text-gray-500 text-sm">Email</p>
              <p>{user.email}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Team</p>
              <p>{user.team}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Sits</p>
              <p>{user.sits}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Birthday</p>
              <p>{user.birthday}</p>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="mt-10">
          <h3 className="text-lg font-semibold mb-2">About</h3>
          <p className="text-gray-600">{user.about}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
