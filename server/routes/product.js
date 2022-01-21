const express = require("express");
const router = express.Router();

//import middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

//controllers
const {
  create,
  listAll,
  remove,
  read,
  update,
  list,
  productsCount,
  productStar,
} = require("../controllers/product");

//routs
router.post("/product", authCheck, adminCheck, create);
router.get("/products/total", productsCount);
router.get("/products/:count", listAll); //products/100
router.delete("/product/:slug", authCheck, adminCheck, remove);
router.get("/product/:slug", read);
router.put("/product/:slug", authCheck, adminCheck, update);

router.post("/products", list);

//Rating from user
router.put("/product/star/:productId", authCheck, productStar);



module.exports = router;
