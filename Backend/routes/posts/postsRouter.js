const express = require("express");
const {
  createPost,
  getAllPosts,
  getPost,
  deletePost,
  updatePost,
} = require("../../controllers/posts/postsController");
const isLoggedIn = require("../../middlewares/isLoggedin");
const postsRouter = express.Router();

//Create POST router
postsRouter.post("/", isLoggedIn, createPost);

//Get ALL POSTS router
postsRouter.get("/", getAllPosts);

//Get a POST router
postsRouter.get("/:id", getPost);

//Delete POST router
postsRouter.delete("/:id", isLoggedIn, deletePost);

//UPDATE POST router
postsRouter.put("/:id", isLoggedIn, updatePost);

module.exports = postsRouter;
