const asyncHandler = require("express-async-handler");
const Post = require("../../models/Posts/Post");
const Comment = require("../../models/Comments/Comment");

//@desc Create a new Comment
//@route POST /api/v1/comments
//access private

exports.createComment = asyncHandler(async (req, resp) => {
  //Get the payload
  const { message } = req.body;
  //Get the post id
  const postId = req.params.postId;

  //Create the comment
  const comment = await Comment.create({
    message,
    author: req?.userAuth?.id,
    postId,
  });

  //Associate comment with post
  const post = await Post.findByIdAndUpdate(
    postId,
    { $push: { comments: comment._id } },
    { new: true },
  );
  resp.status(201).json({
    status: "success",
    message: "Comment successfully created!",
    comment,
  });
});
