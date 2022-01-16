const express = require("express");
const router = express.Router();

//import middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

//controllers
const { create, listAll} = require("../controllers/product");

//routs
router.post("/product", authCheck, adminCheck, create);
router.get("/products/:count", listAll);//products/100



module.exports = router;
