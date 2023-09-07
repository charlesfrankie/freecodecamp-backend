const mongoose = require("mongoose");

const urlShortnerSchema = new mongoose.Schema(
  {
    short_url: { type: String, required: true },
    original_url: { type: String, required: true },
  },
  { timestamps: true }
);

exports.URLShortener = mongoose.model("URLShortener", urlShortnerSchema);
