const express = require("express");
const router = express.Router();

//import middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

//controllers
const { createOrUpdateUser, currentUser } = require("../controllers/auth");

router.post("/create-or-update-user", authCheck, createOrUpdateUser);
router.post("/current-user", authCheck, currentUser);
router.post("/current-admin", authCheck, adminCheck, currentUser); //checking the user is admin or not

module.exports = router;
