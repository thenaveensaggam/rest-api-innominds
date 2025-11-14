const express = require("express");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");

const { validationResult } = require("express-validator");
const UserTable = require("../database/schema/userSchema");

const registerUser = async (request, response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }
  try {
    const { name, email, password } = request.body;

    // check if the user exists in the db
    const user = await UserTable.findOne({ email: email });
    if (user) {
      return response
        .status(400)
        .json({ errors: [{ msg: "User already exists" }] });
    }

    // encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // avatar image
    const avatar = await gravatar.url(email, {
      s: "200",
      r: "pg",
      d: "mm",
    });

    // save to db
    const newUser = await new UserTable({
      name,
      email,
      password: hashedPassword,
      avatar,
    }).save();

    if (newUser) {
      return response.status(200).json({
        message: "User is created successfully",
        data: newUser,
      });
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json({ errors: [{ msg: error.message }] });
  }
};

const loginUser = async (request, response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }
  try {
    const { email, password } = request.body;

    // check if the user exists in the db
    const user = await UserTable.findOne({ email: email });
    if (!user) {
      return response
        .status(400)
        .json({ errors: [{ msg: "Invalid Credentials Email" }] });
    }

    // check the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return response
        .status(400)
        .json({ errors: [{ msg: "Invalid Credentials Password" }] });
    }

    // create a token and send it to client
    const payload = {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
    const secretKey = process.env.JWT_SECRET;
    const token = await jwt.sign(payload, secretKey, { expiresIn: 360000 });
    if (!token) {
      return response
        .status(400)
        .json({ errors: [{ msg: "Token is not created" }] });
    }

    return response.status(200).json({
      message: "User is LoggedIn successfully",
      token: token,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ errors: [{ msg: error.message }] });
  }
};

const getUserInfo = async (request, response) => {
  try {
    const { id } = request.user;
    const user = await UserTable.findById(id).select("-password");
    if (!user) {
      return response.status(400).json({ errors: [{ msg: "User not found" }] });
    }
    return response.status(200).json({
      message: "User is found successfully",
      data: user,
    });
  } catch (error) {}
};

module.exports = { registerUser, loginUser, getUserInfo };
