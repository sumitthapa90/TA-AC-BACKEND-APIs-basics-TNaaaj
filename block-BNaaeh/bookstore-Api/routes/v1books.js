var express = require("express");
var router = express.Router();
var User = require("../models/User");
var Book = require("../models/Book");

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

// book by id
router.get("/:id", (req, res, next) => {
  var id = req.params.id;
  Book.findById(id, (err, books) => {
    if (err) return next(err);
    res.json({ books });
  });
});

//updated book
router.get("/:id", (req, res, next) => {
  var id = req.params.id;
  Book.findByIdAndUpdate(id, req.body, (err, updateBooks) => {
    if (err) return next(err);
    res.json({ updateBooks });
  });
});

//delete Book

router.get("/:id/delete", (req, res, next) => {
  var id = req.params.id;
  Book.findByIdAndDelete(id, (err, deleteBook) => {
    if (err) return next(err);
    res.json({ deleteBook });
  });
});

module.exports = router;
