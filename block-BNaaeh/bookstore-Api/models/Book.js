var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var bookSchema = new Schema(
  {
    name: { type: String },
    description: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    comments: [{type: Schema.Types.ObjectId, ref: "Comment"}]
  },
  { timestamps: true }
);

var Book = mongoose.model("Book", bookSchema);

module.exports = Book;
