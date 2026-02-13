const asyncHandler = require("express-async-handler");
const Post = require("../../models/Posts/Post");
const User = require("../../models/Users/User");
const Category = require("../../models/Categories/Category");

//@desc Create a new post
//@route POST /api/v1/posts
//@access private

exports.createPost = asyncHandler(async (req, resp, next) => {
  //Get the payload
  const { title, content, categoryId } = req.body;

  //Check if post is present
  const postFound = await Post.findOne({ title: title });
  if (postFound) {
    let error = new Error("Post already existing");
    next(error);
    return;
  }

  //Create post object
  const post = await Post.create({
    title,
    content,
    category: categoryId,
    author: req?.userAuth?._id,
  });

  //Update user by adding post in it
  const user = await User.findByIdAndUpdate(
    req?.userAuth?._id,
    { $push: { posts: post._id } },
    { new: true },
  );

  //Update category by adding post in it
  const catg = await Category.findByIdAndUpdate(
    categoryId,
    { $push: { posts: post._id } },
    { new: true },
  );

  //send the response
  resp.json({
    status: "success",
    message: "Post successfully created",
    post,
    user,
    catg,
  });
});

//@desc Get All Posts
//@route GET /api/v1/posts
//@access private

exports.getAllPosts = asyncHandler(async (req, resp) => {
  // //fetch all the posts from the DB
  // const allPosts = await Post.find({});
  // //send the response

  //Get the current user
  const currentUserId = req.userAuth._id;

  //Get the current time
  const currentDateTime = new Date();

  //Get all those users who have blocked the current user
  const usersBlockingCurrentUser = await User.find({
    blockedUsers: currentUserId,
  });
  //Extract the id of the Users who have blocked the current user
  const blockingUsersIds = usersBlockingCurrentUser.map(
    (userobj) => userobj._id,
  );

  const query = {
    author: { $nin: blockingUsersIds },
    $or: [
      { scheduledPublish: { $lte: currentDateTime }, scheduledPublish: null },
    ],
  };

  //fetch those posts whose author is not in blockingUsersIds
  const allPosts = await Post.find(query);

  resp.json({
    status: "success",
    message: "All posts succesfully fetched",
    allPosts,
  });
});

//@desc Get Single Post
//@route GET /api/v1/posts/:id
//@access public

exports.getPost = asyncHandler(async (req, resp) => {
  //get the id
  const postId = req.params.id;

  //fetch the post corresponding to this postId
  const post = await Post.findById(postId);

  if (post) {
    resp.json({
      status: "success",
      message: "Post successfully fetched",
      post,
    });
  } else {
    resp.json({
      status: "success",
      message: "No Post available for given Id",
      post,
    });
  }
});

//@desc Delete Post
//@route DELETE /api/v1/posts/:id
//@access private

exports.deletePost = asyncHandler(async (req, resp) => {
  //Get the id
  const postId = req.params.id;

  //Delete this post from the DB
  await Post.findByIdAndDelete(postId);

  //send the response
  resp.json({
    status: "success",
    message: "Post succesfully deleted",
  });
});

//@desc Update Post
//@route PUT /api/v1/posts/:id
//@access private

exports.updatePost = asyncHandler(async (req, resp) => {
  //Get the id
  const postId = req.params.id;

  //Get the post object from req
  const post = req.body;

  //Update this post in the DB
  const updatedPost = await Post.findByIdAndUpdate(postId, post, {
    new: true,
    runValidators: true,
  });

  //send the response
  resp.json({
    status: "success",
    message: "Post succesfully updated",
    updatedPost,
  });
});

//@desc like a post
//@route PUT /api/v1/posts/like/:postId
//@access private

exports.likePost = asyncHandler(async (req, resp, next) => {
  //Get the id of the post
  const { postId } = req.params;
  //Get the current user
  const currentUserId = req.userAuth._id;
  //search the post
  const post = await Post.findById(postId);
  if (!post) {
    let error = new Error("Post  not found");
    next(error);
    return;
  }
  //Add the currentUserId to likes array
  await Post.findByIdAndUpdate(
    postId,
    { $addToSet: { likes: currentUserId } },
    { new: true },
  );

  //Remove the currentUserId to dislikes array
  post.dislikes = post.dislikes.filter(
    (userId) => userId.toString() !== currentUserId.toString(),
  );
  //resave the post
  await post.save();
  resp.json({
    status: "success",
    message: "Post liked successfully",
  });
});

//@desc dislike a Post
//@route PUT /api/v1/posts/dislike/:postId
//@access private

exports.disLikePost = asyncHandler(async (req, resp, next) => {
  //Get the id of the post
  const { postId } = req.params;
  //Get the current user
  const currentUserId = req.userAuth._id;
  //search the post
  const post = await Post.findById(postId);
  if (!post) {
    let error = new Error("Post  not found");
    next(error);
    return;
  }
  //Add the currentUserId to likes array
  await Post.findByIdAndUpdate(
    postId,
    { $addToSet: { dislikes: currentUserId } },
    { new: true },
  );

  //Remove the currentUserId to dislikes array
  post.likes = post.likes.filter(
    (userId) => userId.toString() !== currentUserId.toString(),
  );
  //resave the post
  await post.save();
  resp.json({
    status: "success",
    message: "Post disliked successfully",
  });
});

//@desc Clap A Post
//@route PUT /api/v1/posts/claps/:postId
//@access private

exports.clapPost = asyncHandler(async (req, resp, next) => {
  //Get the id of the post
  const { postId } = req.params;
  //search the post
  const post = await Post.findById(postId);
  if (!post) {
    let error = new Error("Post not found");
    next(error);
    return;
  }
  //Implement claps
  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    { $inc: { claps: 1 } },
    { new: true },
  );
  //send the response
  resp.json({
    status: "success",
    message: "Post clapped successfully",
    updatedPost,
  });
});

//@desc Schedule A Post
//@route PUT /api/v1/posts/schedule/:postId
//@access private

exports.schedulePost = asyncHandler(async (req, resp, next) => {
  //Get the data
  const { postId } = req.params;
  const { scheduledPublish } = req.body;
  //Check if postId and scheduledPublish are present
  if (!postId || !scheduledPublish) {
    let error = new Error("PostId and Schedule Date are required");
    next(error);
    return;
  }
  //Find the post post from DB
  const post = await Post.findById(postId);
  if (!post) {
    let error = new Error("Post not found");
    next(error);
    return;
  }
  //Check if the currentUser is author
  if (post.author.toString() !== req.userAuth._id.toString()) {
    let error = new Error("You can schedule only your post");
    next(error);
    return;
  }
  const scheduleDate = new Date(scheduledPublish);
  const currentDate = new Date();
  if (scheduleDate < currentDate) {
    let error = new Error("Scheduled date cannot be previous date");
    next(error);
    return;
  }
  post.scheduledPublished = scheduleDate;
  await post.save();
  //send the response
  resp.json({
    status: "success",
    message: "Post Scheduled successfully",
    post,
  });
});
