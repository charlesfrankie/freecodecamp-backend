const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  let unix, utc;

  unix = +new Date(Date.now());
  utc = new Date(Date.now()).toUTCString();

  res.json({ unix: unix, utc: utc });
});

router.get("/:date", (req, res) => {
  let unix, utc;
  let date = req.params.date;

  unix = !isNaN(date) ? +date : +new Date(date);
  utc = !isNaN(date)
    ? new Date(+date).toUTCString()
    : new Date(date).toUTCString();

  if (utc == "Invalid Date" || unix == null) {
    return res.json({ error: "Invalid Date" });
  }

  res.json({ unix: unix, utc: utc });
});

module.exports = router;
