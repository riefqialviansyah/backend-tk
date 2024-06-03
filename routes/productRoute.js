const express = require("express");
const router = express.Router();

// import controller
const ProductController = require("../controllers/ProductController");

router.use(require("../middlewares/auth"));
router.get("/get", ProductController.getProducts);
router.get("/getOne/:id", ProductController.getOne);
router.post("/add", ProductController.addProduct);
router.put("/update/:id", ProductController.updateProduct);
router.delete("/delete/:id", ProductController.deleteProduct);

module.exports = router;
