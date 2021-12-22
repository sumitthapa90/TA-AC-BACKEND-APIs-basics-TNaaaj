var express = require("express");
var router = express.Router();
var Country = require("../models/Country");
var State = require("../models/State");
var User = require("../models/User");

router.get("/list/:type", (req, res, next) => {
  let type = req.params.type;

  State.find({}, (err, states) => {
    if (err) return next(err);

    //to list all countries
    if (type === "all") {
      return res.json({ states });
    }
    //to list in asccending order
    if (type === "asc") {
      states = states.sort(function (a, b) {
        var nameA = a.name.toUpperCase();
        var nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      });

      return res.json({ states });
    }

    //to list in desc order
    if (type === "desc") {
      states = states.sort(function (a, b) {
        var nameA = a.name.toUpperCase();
        var nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return 1;
        }
        if (nameA > nameB) {
          return -1;
        }

        // names must be equal
        return 0;
      });

      return res.json({ states });
    }
  });
});

//list all states in an ascending order of their population

router.get("/listAsc/byPopulation", (req, res, next) => {
  State.find({}, (err, state) => {
    if (err) return next(err);
    state = state.sort(function (a, b) {
      return a.population, b.population;
    });

    res.status(200).json({ state });
  });
});

//for a particular state, list all neighbouring states

router.get("/:id/neighbour", (req, res, next) => {
  var stateId = req.params.id;
  State.findById(stateId)
    .populate("neighbouring_states")
    .exec((err, neighbouring_states) => {
      if (err) return next(err);
      res.status(200).json({ neighbouring_states });
    });
});

router.get("/:id/delete", (req, res, next) => {
  var stateId = req.params.id;
  State.findByIdAndDelete(stateId, (err, deleteState) => {
    if (err) return next(err);
    Country.findByIdAndUpdate(
      deleteState.country,
      { $pull: { state: deleteState.id } },
      (err, updateCountry) => {
        if (err) return next(err);
        res.status(200).json({ deleteState, updateCountry });
      }
    );
  });
});

module.exports = router;
