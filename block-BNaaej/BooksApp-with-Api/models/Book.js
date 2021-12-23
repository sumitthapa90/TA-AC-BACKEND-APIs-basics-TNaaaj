var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var bookSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    category: [String],
    tags: [String],
    price: { type: Number },
    author: { String },
  },
  { timestamps: true }
);

var Book = mongoose.model("Book", bookSchema);

module.exports = Book;
