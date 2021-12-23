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

module.exports = router;
