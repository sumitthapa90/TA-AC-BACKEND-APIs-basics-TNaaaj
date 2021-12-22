var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var commentSchema = new Schema(
  {
    content: { type: String },
    likes: { type: Number, default: 0 },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    bookId: { type: Schema.Types.ObjectId, ref: "Book" },
  },
  { timestamps: true }
);

var Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
