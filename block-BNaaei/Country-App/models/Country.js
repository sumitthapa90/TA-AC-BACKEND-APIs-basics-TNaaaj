var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var countrySchema = new Schema(
  {
    name: { type: String },
    states: { type: mongoose.Types.ObjectId, ref: "State" },
    neighbouring_countires: { type: mongoose.Types.ObjectId, ref: "Country" },
    continent: { type: String },
    population: { type: Number },
    area: { type: Number },
    ethnicity: [String],
  },
  { timestamps: true }
);

var Country = mongoose.model("Country", countrySchema);

module.exports = Country;
