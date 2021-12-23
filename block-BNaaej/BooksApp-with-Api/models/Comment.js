var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var commentSchema = new Schema(
  {
    content: { type: String },
    Book: { type: mongoose.Types.ObjectId, ref: "Book" },
    createdBy: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

var Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
