import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginAction } from "../../redux/slices/users/userSlices";
import { useSelector } from "react-redux";
import LoadingComponent from "../Alert/LoadingComponent";
import ErrorMsg from "../Alert/ErrorMsg";
import SuccessMsg from "../Alert/SuccessMsg";
const Login = () => {
  const dispatch = useDispatch(); //action communicate karwayega
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
    console.log(formData);
    dispatch(
      loginAction({ username: formData.username, password: formData.password }),
    );
    //reset form
    setFormData({
      password: "",
      username: "",
    });
  };
  //store the data
  const { userAuth, loading, error, success } = useSelector(
    (state) => state.users,
  );
  console.log("loading", loading);

  //Redirect to Profile Page
  useEffect(() => {
    if (userAuth?.userInfo?.token) {
      navigate("/user-profile");
    }
  }, [userAuth?.userInfo?.token]);
  return (
    <section className="py-10 xl:pb-56 bg-white overflow-hidden">
      <div className="pb-8 container px-4 mx-auto bg-green-200 w-1/2 rounded-xl">
        <div className="text-center max-w-md mx-auto">
          <a className="mb-5 inline-block" href="#">
            <img src="flaro-assets/logos/flaro-logo-black-xl.svg" alt="pic" />
          </a>
          <h2 className="mb-4 text-6xl md:text-7xl text-center">
            Login to your account
          </h2>
          <p className="mb-12 font-medium text-lg text-gray-600">
            Enter your Details below.
          </p>
          {/*Display error*/}
          {error && <ErrorMsg message={error.message || error} />}
          {/*Display success */}
          {success && <SuccessMsg message="Login Successfull" />}
          <form onSubmit={handleSubmit}>
            <label className="block mb-5">
              <input
                className="px-4 py-3.5 w-full text-gray-500 font-medium border-2 rounded-xl"
                id="signUpInput2-1"
                type="text"
                placeholder="Enter Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </label>
            <label className="block mb-5">
              <input
                className="px-4 py-3.5 w-full text-gray-500 font-medium border-2 rounded-xl"
                id="signUpInput2-3"
                type="password"
                placeholder="Enter Your Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </label>
            {loading ? (
              <LoadingComponent />
            ) : (
              <button
                className="mb-8 py-4 px-9 w-full text-white font-semibold bg-blue-700 rounded-xl"
                type="submit"
              >
                Login Account
              </button>
            )}

            <p className="font-medium">
              <span className="m-2">Forget Password?</span>
              <Link
                className="text-indigo-600 hover:text-indigo-700"
                to="/forget-password"
              >
                Reset Password
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
