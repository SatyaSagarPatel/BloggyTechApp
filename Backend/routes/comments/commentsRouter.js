const express = require("express");
const {
  createComment,
} = require("../../controllers/comments/commentsController");

const isLoggedIn = require("../../middlewares/isLoggedin");

const commentsRouter = express.Router();

commentsRouter.post("/:postId", isLoggedIn, createComment);
module.exports = commentsRouter;
