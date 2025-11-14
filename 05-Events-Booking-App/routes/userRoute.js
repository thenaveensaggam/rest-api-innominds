const express = require("express");
const {
  registerUser,
  loginUser,
  getUserInfo,
} = require("../controller/userController");
const { body } = require("express-validator");
const verifyToken = require("../middleware/tokenMiddleware");

const router = express.Router();

/**
 * @usage : Register a User
 * @url : http://127.0.0.1:5000/user/register
 * @method : POST
 * @access : PUBLIC
 * @fields : name , email , password
 */
router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is Required"),
    body("email").isEmail().withMessage("Enter a Proper Email"),
    body("password").isStrongPassword().withMessage("Password is Required"),
  ],
  registerUser
);

/**
 * @usage : Login a User
 * @url : http://127.0.0.1:5000/users/login
 * @method : POST
 * @access : PUBLIC
 * @fields : email , password
 */
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Enter a Proper Email"),
    body("password").isStrongPassword().withMessage("Password is Required"),
  ],
  loginUser
);

/**
 * @usage : Get a User
 * @url : http://127.0.0.1:5000/users/me
 * @method : GET
 * @access : PRIVATE
 * @fields : no-fields
 */
router.get("/me", verifyToken, getUserInfo);

module.exports = router;
