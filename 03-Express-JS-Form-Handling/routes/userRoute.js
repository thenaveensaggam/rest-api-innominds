const express = require("express");

const router = express.Router();

// logic
router.get("/", (request, response) => {
  response.status(200);
  response.json({
    message: "Welcome to USER Router GET",
  });
});

router.post("/register", (request, response) => {
  // to read the form data
  const formData = request.body;

  response.status(200);
  response.json({
    message: "Welcome to USER Router POST",
    formData: formData,
  });
});

module.exports = router;
