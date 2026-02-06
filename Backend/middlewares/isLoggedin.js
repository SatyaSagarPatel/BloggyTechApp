const jwt = require("jsonwebtoken");
const User = require("../models/Users/User");
const isLoggedIn = (req, resp, next) => {
  console.log("isLoggedIn executed!");
  //fetch token from request
  const token = req.headers.authorization?.split(" ")[1];
  console.log("Token", token);

  //verify token
  jwt.verify(token, "secretkey", async (err, decoded) => {
    // console.log("decoded:", decoded);
    //if unsuccessful, then send the error message
    if (err) {
      const error = new Error(err?.message);
      next(err);
    } else {
      const userId = decoded?.user.id;
      const user = await User.findById(userId).select(
        "username email role _id",
      );
      //   console.log("user", user);
      req.userAuth = user;
      //if successful, then pass the user object to next path
      next();
    }
  });

  //   next();
};
module.exports = isLoggedIn;
