const { localAuthController } = require("../controllers/local.auth.controller.js");
const express = require("express");
const router = express.Router();

// Home route

router.post("/login", localAuthController.loginUser);
router.post("/register", localAuthController.registerUser);
router.post("/logout", localAuthController.logoutUser);

module.exports = router;
