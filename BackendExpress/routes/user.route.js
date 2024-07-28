//const { index } = require("../controllers/index.controller.js");
const express = require("express");
const router = express.Router();
const {userController} = require("../controllers/user.controller.js");
const { isLogin, isAdmin, autherized } = require("../middlewares/auth.middleware.js");
// Home route

router.get("/", autherized('admin'),  userController.getUsers);
router.get("/:id", autherized(["admin", "user"]), userController.getUserById);
router.post("/", userController.addUser);
router.put("/:id",autherized(['admin','user']), userController.updateUser);
router.delete("/:id",autherized(['admin']), userController.deleteUser);
module.exports = router;
