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
} = require("../controllers/subcate");

//routs
router.post("/subcate", authCheck, adminCheck, create);
router.get("/subcate", list);
router.get("/subcate/:slug", read);
router.put("/subcate/:slug", authCheck, adminCheck, update);
router.delete("/subcate/:slug", authCheck, adminCheck, remove);

module.exports = router;
