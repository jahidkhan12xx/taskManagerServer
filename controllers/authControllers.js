const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signup = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(req.body);

    if (user) {
      return res.send({
        status: "fail",
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    // JWT

    const token = jwt.sign({ _id: newUser._id }, process.env.SECRET, {
      expiresIn: "90d",
    });

    res.status(201).json({
      status: "success",
      message: "User registered",
      token,
      newUser,
    });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "User doesn't exist",
      });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.send({
        status: "fail",
        message: "Incorrect email or password",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.SECRET, {
      expiresIn: "90d",
    });

    res.status(201).json({
      status: "success",
      message: "Logged in Successfully",
      token,
      userData: {
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  signup,
  login,
};
