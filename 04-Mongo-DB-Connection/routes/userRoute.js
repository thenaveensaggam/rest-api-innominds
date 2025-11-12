const express = require("express");
const { body } = require("express-validator");
const { loginUser, registerUser } = require("../controller/userController");

const router = express.Router();

// logic
router.get("/", loginUser);

/**
 * @url : http://127.0.0.1:5000/user/register
 * @params : name, email, password
 * @method : post
 * @access : public
 */
router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is Required"),
    body("email").isEmail().withMessage("Email is Required"),
    body("password")
      .isStrongPassword()
      .withMessage("Strong Password is Required"),
  ],
  registerUser
);

module.exports = router;
