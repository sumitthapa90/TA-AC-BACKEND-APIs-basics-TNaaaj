let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let userSchema = new Schema({
  name: { type: String },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

let User = mongoose.model("User", userSchema);

module.exports = User;
