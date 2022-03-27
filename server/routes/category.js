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
  getSubcate,
  readlist,
} = require("../controllers/category");

//routs
router.post("/category", authCheck, adminCheck, create);
router.get("/categories", list);

router.get("/category/:slug", read);
router.get("/category/list/:slug", readlist);
router.put("/category/:slug", authCheck, adminCheck, update);
router.delete("/category/:slug", authCheck, adminCheck, remove);
router.get("/category/subcates/:_id", getSubcate);

module.exports = router;
