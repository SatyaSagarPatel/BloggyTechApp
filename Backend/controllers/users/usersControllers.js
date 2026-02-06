//@desc Register new User
//@route POST /api/v1/users/register
//@access public
const User = require("../../models/Users/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../../utils/generateToken");
const asyncHandler = require("express-async-handler");
exports.register = asyncHandler(async (req, resp, next) => {
  //   resp.json({ message: "User registration controller executed" });

  const { username, password, email } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    throw new Error("User Already Existed");
  }
  const newUser = new User({ username, email, password });
  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(password, salt);
  await newUser.save();
  resp.json({
    status: "success",
    message: "User registered succesfully",
    _id: newUser?.id,
    username: newUser?.username,
    email: newUser?.email,
    role: newUser?.role,
  });
});

//@desc Login new User
//@route POST /api/v1/users/login
//@access public
exports.login = asyncHandler(async (req, resp, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error("Invalid Credentials");
  }
  let isMatched = await bcrypt.compare(password, user?.password);
  if (!isMatched) {
    throw new Error("Invalid Credentials");
  }
  user.lastlogin = new Date();
  await user.save();
  resp.json({
    status: "success",
    email: user?.email,
    _id: user?._id,
    username: user?.username,
    role: user?.role,
    token: generateToken(user),
  });
});

//@desc Profile view
//@route GET /api/v1/users/profile/:id
//@access private
exports.getProfile = asyncHandler(async (req, resp, next) => {
  // console.log("Rec:", req.userAuth);

  const user = await User.findById(req.userAuth.id);
  resp.json({
    status: "success",
    message: "profile fetched",
    user,
  });
});
