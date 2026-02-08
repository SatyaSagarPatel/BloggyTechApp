const express = require("express");
const {
  createComment,
  deleteComment,
  updateComment,
} = require("../../controllers/comments/commentsController");

const isLoggedIn = require("../../middlewares/isLoggedin");

const commentsRouter = express.Router();

commentsRouter.post("/:postId", isLoggedIn, createComment);

commentsRouter.delete("/:commentId", isLoggedIn, deleteComment);
commentsRouter.put("/:commentId", isLoggedIn, updateComment);
module.exports = commentsRouter;
