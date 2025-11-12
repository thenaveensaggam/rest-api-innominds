const express = require("express");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const loginUser = (request, response) => {
  response.status(200);
  response.json({
    message: "Welcome to USER Router GET",
  });
};

const registerUser = async (request, response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }
  // to read the form data
  const { name, email, password } = request.body;

  // encrypt the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  response.status(200);
  response.json({
    message: "Welcome to USER Router POST",
    formData: {
      name: name,
      email: email,
      hashedPassword: hashedPassword,
      password: password,
    },
  });
};

module.exports = {
  registerUser,
  loginUser,
};
