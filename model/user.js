const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
});

exports.User = mongoose.model("User", userSchema);
