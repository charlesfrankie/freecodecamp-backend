const express = require("express");
const router = express.Router();
const { URLShortener } = require("../model/short-url");
const shortURLGenerator = require("../utils/helper.js").shortURLGenerator;
const isValidUrl = require("../utils/helper.js").isValidUrl;

router.get("/:short_url", (req, res) => {
  let short_url = req.params.short_url;

  URLShortener.findOne({ short_url: short_url })
    .then((data) => {
      if (data) {
        res.redirect(data.original_url);
      } else {
        res.json({ message: "No URL found!" });
      }
    })
    .catch((err) => {
      return res.json({ error: err });
    });
});

router.post("/", (req, res) => {
  let original_url = req.body.url;

  if (isValidUrl(original_url)) {
    URLShortener.findOne({ original_url: original_url })
      .then((data) => {
        // If have existing original URL
        if (data) {
          res.json({
            original_url: data.original_url,
            short_url: data.short_url,
          });
        }
        // If no, create new and return short url
        else {
          let urlShortener = new URLShortener({
            short_url: shortURLGenerator(),
            original_url: original_url,
          });

          urlShortener
            .save()
            .then((data) => {
              res.json({
                original_url: data.original_url,
                short_url: data.short_url,
              });
            })
            .catch((err) => {
              return res.json({ success: false, error: err });
            });
        }
      })
      .catch((err) => {
        return res.json({ success: false, error: err });
      });
  } else {
    return res.json({ error: "invalid url" });
  }
});

module.exports = router;
