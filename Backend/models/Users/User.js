const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin"],
      default: "user",
    },
    password: {
      type: String,
      required: true,
    },
    lastlogin: {
      type: Date,
      default: Date.now(),
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    accountLevel: {
      type: String,
      enum: ["Bronze", "Silver", "Gold"],
      default: "Bronze",
    },
    profilePicture: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
    },
    location: {
      type: String,
    },
    notificationType: {
      email: {
        type: String,
      },
    },
    gender: {
      type: String,
      enum: ["male", "female", "not to say", "non-binary"],
    },
    profileViewers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    followers: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    blockedUsers: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    posts: [{ type: mongoose.Types.ObjectId, ref: "Post" }],
    likedPosts: [{ type: mongoose.Types.ObjectId, ref: "Postr" }],
    passwordResetToken: {
      type: String,
    },
    passwordResetExpires: {
      type: Date,
    },
    accountVerificationToken: {
      type: String,
    },
    accountVerificationExpires: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

//models creation
const User = mongoose.model("User", userSchema);
module.exports = User;
