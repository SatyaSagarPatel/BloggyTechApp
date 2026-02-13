const express = require("express");
const {
  createPost,
  getAllPosts,
  getPost,
  deletePost,
  updatePost,
  likePost,
  disLikePost,
  clapPost,
  schedulePost,
} = require("../../controllers/posts/postsController");
const isLoggedIn = require("../../middlewares/isLoggedin");
const isAccountVerified = require("../../middlewares/isAccountVerified");
const postsRouter = express.Router();

//Create POST router
postsRouter.post("/", isLoggedIn, isAccountVerified, createPost);

//Get ALL POSTS router
postsRouter.get("/", isLoggedIn, getAllPosts);

//Get a POST router
postsRouter.get("/:id", getPost);

//Delete POST router
postsRouter.delete("/:id", isLoggedIn, deletePost);

//UPDATE POST router
postsRouter.put("/:id", isLoggedIn, updatePost);

//LIKE POST router
postsRouter.put("/like/:postId", isLoggedIn, likePost);

//DISLIKE POST router
postsRouter.put("/dislike/:postId", isLoggedIn, disLikePost);

//Clap POST router
postsRouter.put("/claps/:postId", isLoggedIn, clapPost);

//Schedule A POST router
postsRouter.put("/schedule/:postId", isLoggedIn, schedulePost);

module.exports = postsRouter;
