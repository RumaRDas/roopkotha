const express = require("express");
const router = express.Router();

//import middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");
//controllers
const { upload, remove } = require("../controllers/cloudinary");

router.post("/uploadimages", authCheck, adminCheck, upload);
router.post("/removeimage", authCheck, adminCheck, romove);
module.exports = router;
