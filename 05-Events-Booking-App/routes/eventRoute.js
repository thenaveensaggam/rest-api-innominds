const express = require("express");
const {
  uploadEvent,
  getEventById,
  getFreeEvents,
  getPaidEvents,
} = require("../controller/eventController");
const verifyToken = require("../middleware/tokenMiddleware");
const { body, validationResult } = require("express-validator");

const router = express.Router();

/**
 * @usage : Upload an event
 * @url : http://127.0.0.1:5000/events/upload
 * @method : POST
 * @access : PRIVATE
 * @fields : name, image, price, date, type, description
 */
router.post(
  "/upload",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("imageUrl").notEmpty().withMessage("ImageUrl is required"),
    body("price").notEmpty().withMessage("Price is required"),
    body("date").notEmpty().withMessage("Date is required"),
    body("type").notEmpty().withMessage("Type is required"),
    body("description").notEmpty().withMessage("Description is required"),
  ],
  verifyToken,
  uploadEvent
);

/**
 * @usage : Get all Free Events
 * @url : http://127.0.0.1:5000/events/free
 * @method : GET
 * @access : PUBLIC
 * @fields : no-fields
 */
router.get("/free", getFreeEvents);

/**
 * @usage : Get all PAID Events
 * @url : http://127.0.0.1:5000/events/paid
 * @method : GET
 * @access : PUBLIC
 * @fields : no-fields
 */
router.get("/paid", getPaidEvents);

/**
 * @usage : Get An Event by Id
 * @url : http://127.0.0.1:5000/events/:eventId
 * @method : GET
 * @access : PUBLIC
 * @fields : no-fields
 */
router.get("/:eventId", getEventById);

module.exports = router;
