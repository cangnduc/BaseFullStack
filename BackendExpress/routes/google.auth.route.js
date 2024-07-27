const { googleAuthController } = require("../controllers/google.auth.controller.js");
const express = require("express");
const router = express.Router();

// Home route

router.get("/", googleAuthController.googleLogin);
router.get("/callback", googleAuthController.googleCallback);

router.get('/success', googleAuthController.googleSuccess);
module.exports = router;
