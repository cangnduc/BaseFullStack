const googleAuthRoutes = require("./google.auth.route.js");
const localAuthRoutes = require("./local.auth.route.js");
const { indexController } = require("../controllers/index.controller.js");
const express = require("express");
const { authenticated } = require("../middlewares/auth.middleware.js");
const router = express.Router();
const jwt = require("jsonwebtoken");

// Home route
router.post("/refreshToken", indexController.refreshToken);
router.use("/local", localAuthRoutes);
router.use("/google", googleAuthRoutes);
router.get("/check-token", (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json({ authenticated: false });

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
    if (err) return res.status(401).json({ authenticated: false });
    res.status(200).json({authenticated:true})
  });
});
module.exports = router;
