const express = require("express");
const {
  register,
  login,
  getProfile,
} = require("../../controllers/users/usersControllers");
const isLoggedIn = require("../../middlewares/isLoggedin");

const usersRouter = express.Router();
//Register route
usersRouter.post("/register", register);

//Login Route
usersRouter.post("/login", login);

//Profile route
usersRouter.get("/profile", isLoggedIn, getProfile);

module.exports = usersRouter;
