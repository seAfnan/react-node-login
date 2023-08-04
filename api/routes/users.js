const { User, validateUser } = require("../models/user");
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return false;
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered");

  user = new User(_.pick(req.body, ["name", "email", "password"]));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.generateAuthToken();

  // res.send(_.pick(user, ["_id", "name", "email"]));
  res.send(token);
});

router.get("/register", (req, res) => {
  User.find().then((data) => {
    res.json(data);
  });
});

module.exports = router;
