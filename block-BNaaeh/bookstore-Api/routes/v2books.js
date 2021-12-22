var express = require("express");
var router = express.Router();
var User = require("../models/User");
var Book = require("../models/Book");
var Comment = require("../models/Comment");

// list of books
router.get("/", (req, res, next) => {
  Book.find({}, (err, books) => {
    if (err) return next(err);
    res.json({ books });
  });
});

//new book
router.post("/", (req, res, next) => {
  Book.create(req.body, (err, createdBook) => {
    if (err) return next(err);
    res.json({ CreatedBook });
  });
});

//updated book
router.put("/:id", (req, res, next) => {
  var id = req.params.id;
  Book.findByIdAndUpdate(id, req.body, (err, updateBooks) => {
    if (err) return next(err);
    res.json({ updateBooks });
  });
});

//delete book
router.get("/:id/delete", (req, res, next) => {
  var id = req.params.id;
  Book.findByIdAndDelete(id, (err, deleteBook) => {
    if (err) return next(err);
    res.json({ deleteBook });
  });
});

//add comment

router.get("/:id/comments", (req, res, next) => {
  var id = req.params.id;
  Book.findById(id)
    .populate("comments")
    .exec((err, book) => {
      if (err) return next(err);
      res.json({ book });
    });
});

//create comment
router.post("/:id/comment/new", (req, res, next) => {
  var id = req.params.id;
  req.body.bookId = id;
  Comment.create(req.body, (err, createComment) => {
    if (err) return next(err);
    User.findByIdAndUpdate(
      id,
      { $push: { comments: createComment.id } },
      (err, updatedComment) => {
        if (err) return next(err);
        res.json({ createComment, updatedComment });
      }
    );
  });
});

//edit comment

router.get("/:id/comment/edit/:commId", (req, res, next) => {
  var bookId = req.params.id;
  var commentId = req.params.commentId;
  var data = req.body;
  Comment.findById(commentId, (err, comment) => {
    if (err) return next(err);
    res.json({ comment });
  });
});

router.post("/:id/comment/edit/:commId", (req, res, next) => {
  var commentId = req.params.id;
  var data = req.body;
  Comment.findByIdAndUpdate(commentId.data, (err, upComment) => {
    if (err) return next(err);
    res.json({ upComment });
  });
});

router.get("/:id/comment/delete/:commId", (req, res, next) => {
  var bookId = req.params.id;
  var commentId = req.params.commentId;
  Comment.findOneAndDelete(commentId, (err, deleteComment) => {
    if (err) return next(err);
    User.findByIdAndUpdate(
      deleteComment.bookId,
      { $pull: { comments: comment.id } },
      (err, book) => {
        if (err) return next(err);
        res.json({ book });
      }
    );
  });
});

module.exports = router;
