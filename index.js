var express = require("express");
var cors = require("cors");
const multer = require("multer");
require("dotenv").config();

var app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

let upload = multer({ dest: "uploads/" });
app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  let file = req.file;

  res.json({ name: file.originalname, type: file.mimetype, size: file.size });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
