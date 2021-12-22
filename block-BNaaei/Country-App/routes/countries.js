var express = require("express");
var router = express.Router();
var Country = require("../models/Country");
var State = require("../models/State");
var User = require("../models/User");

//create new country
router.post("/new", function (req, res, next) {
  var data = req.body;
  Country.create(data, (err, createdCountry) => {
    if (err) return next(err);
    res.status(200).json({ createdCountry });
  });
});

//List all countries in asc order.
// router.post("/list/:type", (req, res, next) => {
//   var type = req.params.type;
//   Country.find({}, (err, countries) => {
//     if (err) return next(err);

//     //all countries
//     if (type === "all") {
//       res.json({ countries });
//     }

//     //asc
//     if (type === "asc") {
//       countries = countries.sort(function (a, b) {
//         var nameA = a.name.toUpp
//         var nameB = b.name;
//       });
//     }
//   });
// });

router.get("/:id/update", (req, res, next) => {
  var countryId = req.params.id;
  Country.findById(countryId, (err, country) => {
    if (err) return next(err);
    res.status(200).json({ country });
  });
});

router.post("/:id/update", (req, res, next) => {
  var countryId = req.params.id;
  Country.findByIdAndUpdate(countryId, req.body, (err, upCountry) => {
    if (err) return next(err);
    res.status(200).json({ upCountry });
  });
});

// delete
router.get("/:id/delete", (req, res, next) => {
  var countryId = req.params.id;
  Country.findOneAndDelete(countryId, (err, deleteCountry) => {
    if (err) return next(err);
    res.status(200).json({ deleteCountry });
  });
});

// for a particular country, list all neighbouring countires

router.get("/:id/neighbouringCountires", (req, res, next) => {
  var countryId = req.params.id;
  Country.findById(countryId)
    .populate("neighbouring_countires")
    .exec((err, neighbouringCountires) => {
      if (err) return next(err);
      res.status(200).json({ neighbouringCountires });
    });
});

//list all religions present in entire country dataaset.

router.get("/list/religion", (req, res, next) => {
  Country.find({}, (err, country) => {
    if (err) return next(err);

    let religionList = country.reduce((acc, cv) => {
      cv.ethnicity.forEach((elm) => {
        acc.push(elm);
      });
      return acc;
    }, []);
    res.status(200).json({ religionList });
  });
});

//list countries based on religions.

router.get(":id/list/:id", (req, res, next) => {
  var id = req.params.id;
  Country.findById({ ethnicity: id }, (err, country) => {
    if (err) return next(err);
    res.status(200).json({ country });
  });
});

//list countries based on continent.

router.get("/list/continent/:name",(req,res,next)=>{
  var name = req.params.id
  Country.find({ continent: name }, (err, country)=>{
    if (err) return next(err);
    res.status(200).json({ country });
  })
})

//list countries based on population.

router.get("/list/population/:name",(req,res,next)=>{
  var name = req.params.id
  Country.find({ population: name }, (err, country)=>{
    if (err) return next(err);
    res.status(200).json({ country });
  })
})

module.exports = router;
