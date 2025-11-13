const express = require("express");
const {
  uploadEvent,
  getEventById,
  getFreeEvents,
  getPaidEvents,
} = require("../controller/eventController");

const router = express.Router();

/**
 * @usage : Upload an event
 * @url : http://127.0.0.1:5000/events/upload
 * @method : POST
 * @access : PRIVATE
 * @fields : name, image, price, date, type, description
 */
router.post("/upload", uploadEvent);

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
