const express = require("express");
const router = express.Router();
const { User } = require("../model/user");
const { Exercise } = require("../model/exercise");

// Users
router.get("/", (req, res) => {
  User.find()
    .select({ _id: 1, username: 1 })
    .exec()
    .then((users) => res.send(users))
    .catch((err) => {
      return res.json({ success: false, error: err });
    });
});

router.post("/", (req, res) => {
  let username = req.body.username;
  let user = new User({ username: username });

  User.findOne({ username: username })
    .then((foundUser) => {
      if (foundUser) {
        res.json({ username: foundUser.username, _id: foundUser._id });
      } else {
        user
          .save()
          .then((data) => res.json({ username: data.username, _id: data._id }))
          .catch((err) => {
            return res.json({ success: false, error: err });
          });
      }
    })
    .catch((err) => {
      return res.json({ success: false, error: err });
    });
});
// End users

// Exercise
router.post("/:_id/exercises", (req, res) => {
  var user_id = req.params._id;

  User.findById(user_id)
    .then((user) => {
      if (user) {
        const exercise = new Exercise({
          username: user.username,
          description: req.body.description,
          duration: req.body.duration,
          date: req.body.date ?? new Date().toISOString().split("T")[0],
        });

        exercise
          .save()
          .then((data) =>
            res.json({
              _id: user_id,
              username: data.username,
              description: data.description,
              duration: data.duration,
              date: new Date(data.date).toDateString(),
            })
          )
          .catch((err) => {
            return res.json({ success: false, error: err });
          });
      } else {
        return res.json({ success: false, message: "No user found!" });
      }
    })
    .catch((err) => {
      return res.json({ success: false, error: err });
    });
});
// End exercise

// Logs
router.get("/:_id/logs", (req, res) => {
  var user_id = req.params._id;
  var filter = {};

  User.findById(user_id)
    .then((user) => {
      if (user) {
        filter.username = user.username;
        if (req.query.from && req.query.to) {
          filter.date = {
            $gte: req.query.from,
            $lte: req.query.to,
          };
        }

        Exercise.find(filter)
          .select({ _id: 0, description: 1, duration: 1, date: 1 })
          .sort({ date: 1 })
          .limit(Math.abs(req.query.limit) ?? 0)
          .exec()
          .then((logs) => {
            res.json({
              username: user.username,
              count: logs.length,
              _id: user_id,
              log: logs,
            });
          });
      } else {
        return res.json({ success: false, message: "No user found!" });
      }
    })
    .catch((err) => {
      return res.json({ success: false, error: err });
    });
});
// End Logs

module.exports = router;
