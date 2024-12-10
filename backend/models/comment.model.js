const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: String,
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  },
  { timestamps: true }
);

const CommentModel = mongoose.model("comment", CommentSchema);
module.exports = CommentModel;
