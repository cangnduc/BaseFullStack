//const { index } = require("../controllers/index.controller.js");
const express = require("express");
const router = express.Router();
const { productController } = require("../controllers/product.controller.js");
const { isLogin, isAdmin, isUser } = require("../middlewares/auth.middleware.js");
// Home route
const upload = require("../middlewares/upload.middleware.js");
//const { addproduct } = require("../services/addProduct.js");
router.get("/",isLogin, productController.getProducts);
router.post("/", upload.single("image"), productController.addProduct);
router.get("/:id", productController.getProductDetails);
// router.get("/addproduct", (req, res) => {
//   addproduct();
// });
module.exports = router;
