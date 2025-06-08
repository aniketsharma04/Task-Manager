const express = require("express");
const router = express.Router();
const { getAnalytics } = require("../controllers/analytics");
const wrapAsync = require("../middlewares/wrapAsync");
const { authorization } = require("../middlewares/authorization");

router.get("/", authorization, wrapAsync(getAnalytics));

module.exports = router;
