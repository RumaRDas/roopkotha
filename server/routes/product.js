const express = require("express");
const router = express.Router();

//import middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

//controllers
const { create, listAll, remove} = require("../controllers/product");

//routs
router.post("/product", authCheck, adminCheck, create);
router.get("/products/:count", listAll);//products/100
router.delete("/product/:slug", authCheck, adminCheck, remove);


module.exports = router;
