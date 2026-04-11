const express = require("express");
const multer = require("multer");
const storage = require("../../utils/fileUpload");
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
  getPublicPosts,
} = require("../../controllers/posts/postsController");
const isLoggedIn = require("../../middlewares/isLoggedin");
const isAccountVerified = require("../../middlewares/isAccountVerified");
const postsRouter = express.Router();

const upload = multer({ storage });

//Create POST router
postsRouter.post(
  "/",
  isLoggedIn,
  isAccountVerified,
  upload.single("file"),
  createPost,
);

//Get ALL POSTS router
postsRouter.get("/", isLoggedIn, getAllPosts);

//get only 4 posts
postsRouter.get("/public", getPublicPosts);

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
