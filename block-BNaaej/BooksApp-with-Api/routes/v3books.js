var express = require("express");
var router = express.Router();
var Book = require("../models/Book");

//GET /api/books - list of all books
router.get("/", function (req, res, next) {
  Book.find({}, (err, book) => {
    if (err) return next(err);
    res.status(200).json({ book });
  });
});

//GET /api/books/:id - get single book

router.get("/:id", (req, res, next) => {
  var id = req.params.id;
  Book.findById(id, (err, book) => {
    if (err) return next(err);
    res.status(200).json({ book });
  });
});

//POST /api/books - create a book

router.post("/", (req, res, next) => {
  Book.create(req.body, (err, createBook) => {
    if (err) return next(err);
    res.status(200).json({ createBook });
  });
});

//PUT /api/books/:id - update a book

router.put("/:id", (req, res, next) => {
  var id = req.params.id;
  Book.findByIdAndUpdate(id, req.body, (err, updateBook) => {
    if (err) return next(err);
    res.status(200).json({ updateBook });
  });
});

//DELETE /api/books/:id - delete a book

router.get("/:id/delete", (req, res) => {
  var id = req.params.id;
  Book.findByIdAndDelete(id, (err, deleteBook) => {
    if (err) return next(err);
    res.status(200).json({ deleteBook });
  });
});

// list all comment

router.get("/:id/comments", (req, res, next) => {
  var bookId = req.params.id;
  Book.findById(bookId)
    .populate("comments")
    .exec((err, book) => {
      if (err) return next(err);
      res.status(200).json({ book });
    });
});

//add comment
router.post("/:id/comment/new", (req, res, next) => {
  var id = req.params.id;
  var data = req.body;
  Comment.create(data, (err, comment) => {
    if (err) return next(err);
    User.findByIdAndUpdate(
      id,
      { $push: { comments: comment.id } },
      (err, updateComment) => {
        if (err) return next(err);
        res.status(200).json({ comment, updateComment });
      }
    );
  });
});

//edit comment

router.get("/:id/comment/edit/:commId", (req, res, next) => {
  var bookId = req.params.id;
  var commId = req.params.commId;
  Comment.findById(commId, (err, editComment) => {
    if (err) return next(err);
    res.status(200).json({ editComment });
  });
});

// update comment

router.post("/:id/comment/edit/:commId", (req, res, next) => {
  var bookId = req.params.id;
  var commId = req.params.commId;

  Comment.findByIdAndUpdate(commId, req.body, (err, upComment) => {
    if (err) return next(err);
    res.status(200).json({ upComment });
  });
});

//delete comment

router.get("/:id/comment/delete/:commId", (req, res, next) => {
  var commId = req.params.commId;
  Comment.findByIdAndDelete(commId, (err, deleteComment) => {
    if (err) return next(err);
    User.findByIdAndUpdate(
      commId,
      { $pull: { comments: deleteComment.id } },
      (err, updateUser) => {
        if (err) return next(err);
        res.status(200).json({ upComment, deleteComment });
      }
    );
  });
});

//create a category

router.get("list/by/:category", function (res, res, next) {
  var categoryId = req.params.categoryId;
  Book.find({ category: categoryId }, (err, books) => {
    if (err) return next(err);
    res.status(200).json({ books });
  });
});

//count books for each category

// router.get("/count/by/:category", (req, res, next) => {
//   Book.find({}, (err, books) => {
//     if (err) return next(err);

//     var count = books.reduce((acc, cv) => {
//       acc.push(cv.category);
//       return acc;
//     }, []);
//   });
// });

//list of books by auther

router.get("/list/by/:author", (req, res, next) => {
  var authorId = req.params.id;

  Book.findById(authorId)
    .populate("books")
    .exec((err, user) => {
      if (err) return next(err);
      res.json({ books: user.books });
    });
});

////list of all tags

router.get("/list/tags", (req, res, next) => {
  Book.find({}, (err, books) => {
    if (err) return next(err);

    var tags = books.reduce((acc, cv) => {
      acc.push(cv.tags);
      return acc;
    }, []);

    res.json({ tags });
  });
});

//filter books by tags

router.get("/list/tags/:name", (req, res, next) => {
  var name = req.params.name;

  Books.find({ tags: name }, (err, book) => {
    if (err) return next(err);
    res.json({ book });
  });
});


module.exports = router;
