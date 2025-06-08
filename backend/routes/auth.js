const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth");
const wrapAsync = require("../middlewares/wrapAsync");

router.post("/register", wrapAsync(authControllers.registerUser));
router.post("/login", wrapAsync(authControllers.loginUser));

module.exports = router;
