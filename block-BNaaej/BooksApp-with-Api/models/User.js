var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    books: { type: mongoose.Types.ObjectId, ref: "Book" },
    comments: { type: mongoose.Types.ObjectId, ref: "Comment" },
  },
  { timestamps: true }
);

var User = mongoose.model("User", userSchema);

module.exports = User;
