import React, { useEffect } from "react";
import { FaCamera } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfileAction } from "../../redux/slices/users/userSlices";
import LoadingComponent from "../Alert/LoadingComponent";
import ErrorMsg from "../Alert/ErrorMsg";

const UserProfile = () => {
  const dispatch = useDispatch();

  const { profile, loading, error } = useSelector((state) => state?.users);

  useEffect(() => {
    dispatch(getUserProfileAction());
  }, [dispatch]);

  if (loading) return <LoadingComponent />;
  if (error) return <ErrorMsg message={error?.message} />;

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
                src={profile?.profilePicture || "https://randomuser.me/api/portraits/men/32.jpg"}
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
              <h2 className="text-2xl font-bold">{profile?.username || "Unknown"}</h2>

              {/* Action Buttons */}
              <div className="space-x-2">
                <button className="px-4 py-2 border rounded-lg text-sm">
                  👁 {profile?.profileViewers?.length || 0}
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
                <button className="px-4 py-2 border rounded-lg text-sm">
                  Unfollow
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
              <p className="text-gray-500 text-sm">Email</p>
              <p>{profile?.email || "N/A"}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Role</p>
              <p>{profile?.role || "N/A"}</p>
            </div>
          </div>

          {/* Right */}
          <div className="space-y-6">
            <div>
              <p className="text-gray-500 text-sm">Location</p>
              <p>{profile?.location || "N/A"}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Account Level</p>
              <p>{profile?.accountLevel || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="mt-10">
          <h3 className="text-lg font-semibold mb-2">About</h3>
          <p className="text-gray-600">{profile?.bio || "No bio available."}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
