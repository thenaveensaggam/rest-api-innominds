const express = require("express");

const router = express.Router();

// logic
router.get("/", (request, response) => {
  response.status(200);
  response.json({
    message: "Welcome to USER Router GET",
  });
});

router.post("/", (request, response) => {
  response.status(200);
  response.json({
    message: "Welcome to USER Router POST",
  });
});

module.exports = router;
