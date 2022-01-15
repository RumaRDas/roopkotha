const express = require("express");
const router = express.Router();

//import middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

//controllers
const {
  create,
  read,
  update,
  remove,
  list,
} = require("../controllers/product");

//routs
router.post("/product", authCheck, adminCheck, create);
router.get("/products", list);
router.get("/product/:slug", read);
router.put("/product/:slug", authCheck, adminCheck, update);
router.delete("/product/:slug", authCheck, adminCheck, remove);

module.exports = router;
