//const { index } = require("../controllers/index.controller.js");

const express = require("express");
const router = express.Router();

// Home route

router.get("/", (req, res) => {
    res.send("Welcome to the BackendExpress API!");
});
router.use('/auth', require('./auth.js'));
router.use('/user', require('./user.route.js'));
router.use('/product', require('./product.route.js'));
module.exports = router;
