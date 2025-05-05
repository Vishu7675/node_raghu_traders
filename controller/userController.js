const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @des User registration
// @route  Post  api/user/register
// @Access Public
const userRegistration = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory.");
  }
  const availableUser = await User.findOne({ email });
  if (availableUser) {
    console.log(availableUser);
    res.status(400);
    throw new Error("Email already exist.");
  }
  // hashedPassword
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    res
      .status(201)
      .json({ id: user.id, email: user.email, username: user.username });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
  //   res.status(200).json(user);
});

// @des User login
// @route Post api/user/login
// @Access Public
const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1m",
      }
    );

    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

// @des User Info
// @route Get api/user/info
// @Access Private
const userInfo = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { userRegistration, userLogin, userInfo };
