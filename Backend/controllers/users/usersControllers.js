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

//@desc block user
//@route PUT /api/v1/users/block/userIdToBlock
//@access private

exports.blockUser = asyncHandler(async (req, resp) => {
  const userIdToBlock = req.params.userIdToBlock;

  //check weather user is found in DB or not
  const userToBlock = await User.findById(userIdToBlock);

  if (!userToBlock) {
    let error = new Error("User to block not found!");
    next(error);
    return;
  }

  //Get the current user id
  const userBlocking = req?.userAuth?._id;

  //Check if it self  blocking
  if (userBlocking.toString() === userIdToBlock.toString()) {
    let error = new Error("Can't block yourself");
    next(error);
    return;
  }

  //Get the current user from DB
  const currentUser = await User.findById(userBlocking);

  //Check wheather the userIdToBlock is already blocked
  if (currentUser.blockedUsers.includes(userIdToBlock)) {
    let error = new Error("Already Blocked!");
    next(error);
    return;
  }

  currentUser.blockedUsers.push(userIdToBlock);
  await currentUser.save();
  resp.json({
    status: "success",
    message: "User Blocked Successfully",
  });
});

//@desc UnBlock user
//@route PUT /api/v1/users/unblock/userIdToUnBlock
//@access private

exports.unblockUser = asyncHandler(async (req, resp, next) => {
  const userIdToUnBlock = req.params.userIdToUnBlock;
  const userToUnBlock = await User.findById(userIdToUnBlock);
  if (!userToUnBlock) {
    let error = new Error("User to unblock not found!");
    next(error);
    return;
  }
  const userUnBlocking = req?.userAuth?._id;
  const currentUser = await User.findById(userUnBlocking);
  // Check if user to unblock is already blocked
  if (!currentUser.blockedUsers.includes(userIdToUnBlock)) {
    let error = new Error("User not blocked");
    next(error);
    return;
  }
  //Remove the uer  from the current user blockedUsers array
  currentUser.blockedUsers = currentUser.blockedUsers.filter((id) => {
    return id.toString() !== userIdToUnBlock;
  });
  //update DB
  await currentUser.save();
  resp.json({
    status: "success",
    message: "User UnBlocked successfully",
  });
});
