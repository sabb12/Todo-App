const express = require("express");
const router = express.Router();
const controller = require("../controller/CMain");

// GET /api-server/user
router.get("/", controller.getUser);
module.exports = router;
