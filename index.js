require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const URLShortenerRoute = require("./routes/url-shortener");

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.use("/api/shorturl", URLShortenerRoute);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database connection is ready..."))
  .catch((err) => console.log(err));

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
