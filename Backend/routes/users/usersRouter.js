const express = require("express");
const {
  register,
  login,
  getProfile,
  blockUser,
  unblockUser,
  viewOtherProfile,
  followingUser,
  unFollowingUser,
} = require("../../controllers/users/usersControllers");
const isLoggedIn = require("../../middlewares/isLoggedin");

const usersRouter = express.Router();
//Register route
usersRouter.post("/register", register);

//Login Route
usersRouter.post("/login", login);

//Profile route
usersRouter.get("/profile", isLoggedIn, getProfile);

//Block User route
usersRouter.put("/block/:userIdToBlock", isLoggedIn, blockUser);

//UnBlock User route
usersRouter.put("/unblock/:userIdToUnBlock", isLoggedIn, unblockUser);

//View another profile User route
usersRouter.get(
  "/view-another-profile/:userProfileId",
  isLoggedIn,
  viewOtherProfile,
);

//Follow User route
usersRouter.put("/following/:userIdToFollow", isLoggedIn, followingUser);

//UnFollow User route
usersRouter.put("/unfollowing/:userIdToUnFollow", isLoggedIn, unFollowingUser);

module.exports = usersRouter;
