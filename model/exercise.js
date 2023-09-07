const mongoose = require("mongoose");

const exerciseSchema = mongoose.Schema({
  username: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: String, required: false },
});

exports.Exercise = mongoose.model("Exercise", exerciseSchema);
