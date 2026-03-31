import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorMsg from "../Alert/ErrorMsg";
import { useDispatch, useSelector } from "react-redux";
import SuccessMsg from "../Alert/SuccessMsg";
import LoadingComponent from "../Alert/LoadingComponent";
import { registerAction } from "../../redux/slices/users/userSlices";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });
  //handle form change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      registerAction({
        username: formData.username,
        password: formData.password,
        email: formData.email,
      }),
    );
    //reset form
    setFormData({
      email: "",
      password: "",
      username: "",
    });
  };

  //store the data

  const { user, error, loading, success } = useSelector((state) => state.users);
  //Redirect to login page
  useEffect(() => {
    if (user?.status === "success") {
      navigate("/login");
    }
  }, [user?.status]);
  return (
    // <form className="w-full lg:w-1/2 ">
    //   <div className="flex flex-col items-center p-10 xl:px-24 xl:py-24">
    //     <img
    //       className="relative -top-2 -mt-16 mb-6 h-16"
    //       src="flex-ui-assets/logos/flex-circle-green.svg"
    //       alt=""
    //     />
    //     <h2 className="mb-4 text-2xl md:text-3xl text-coolGray">
    //       Join Our Community
    //     </h2>
    //     </div>
    // </form>
    <div className="w-full lg:w-1/2 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-10"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Join our community
          </h2>
          {error && <ErrorMsg message={error.message} />}
          {success && <SuccessMsg message="Registration successfull" />}
          <p className="text-gray-500 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing.
          </p>
        </div>

        {/* Username */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        {loading ? (
          <LoadingComponent />
        ) : (
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Get Started
          </button>
        )}

        {/* Button */}

        {/* Sign In */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 font-medium">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
