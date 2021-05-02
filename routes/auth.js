const router = require("express").Router();
const User = require("../model/User");
const Joi = require("@hapi/joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//registration
const registrationSchema = Joi.object({
  name: Joi.string().min(6).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

//validate the data
router.post("/register", async (req, res) => {
  const { error } = registrationSchema.validate(req.body);
  if (error) res.status(400).send(error.details[0].message);

  //check if user is already present
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email Exists");

  //Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.json({ user: user._id });
  } catch (error) {
    res.send(err);
  }
});

//Login
const loginSchema = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

//validate the data
router.post("/login", async (req, res) => {
  //check if user is already present
  const user1 = await User.findOne({ email: req.body.email });
  //Email exists or not
  if (!user1) return res.status(400).send("Email is not found");
  //password matches or not
  const validPassword = await bcrypt.compare(req.body.password, user1.password);
  if (!validPassword) return res.status(400).send("Password is incorrect");

  //create and asign a token
  const token = jwt.sign({ _id: user1._id }, process.env.TOKEN_SECRET);
  res.header("auth_token", token).send(token);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.json({ user: user._id });
  } catch (error) {
    res.send(err);
  }
});

module.exports = router;
