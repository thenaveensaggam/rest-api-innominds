const express = require("express");
const jwt = require("jsonwebtoken");

const verifyToken = async (request, response, next) => {
  try {
    const token = request.headers["x-auth-token"];
    if (!token) {
      return response
        .status(401)
        .json({ errors: [{ msg: "No token, authorization denied" }] });
    }
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      return response
        .status(401)
        .json({ errors: [{ msg: "No secret key, authorization denied" }] });
    }

    const decodeToken = await jwt.verify(token, secretKey);
    if (!decodeToken) {
      return response
        .status(401)
        .json({ errors: [{ msg: "Token is not valid" }] });
    }

    request.user = decodeToken.user;
    next();
  } catch (error) {
    return response.status(500).json({ errors: [{ msg: error.message }] });
  }
};

module.exports = verifyToken;
