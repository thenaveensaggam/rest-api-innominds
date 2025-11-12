const express = require("express");
const { getApi, postAPI } = require("../controller/apiController");

const router = express.Router();

// logic
router.get("/", getApi);

router.post("/", postAPI);

module.exports = router;
