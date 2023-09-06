const express = require("express");
const router = express.Router();

router.get("/whoami", (req, res) => {
  let ipAddress =
    req.headers["x-forwarded-for"]?.split(",").shift() ||
    req.socket.remoteAddress;
  let software = req.headers["user-agent"];
  let language = req.headers["accept-language"];

  res.json({
    ipaddress: ipAddress,
    language: language,
    software: software,
  });
});

module.exports = router;
