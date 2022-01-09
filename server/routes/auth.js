const express = require("express");
const router = express.Router();

//import middlewares
const {authCheck} =require('../middlewares/auth')

//controllers
const {createOrUpdateUser} = require('../controllers/auth')

const mymiddleware=(req,res,next)=>{
console.log("I am a middleware")
    next()
}
router.post("/create-or-update-user", authCheck, createOrUpdateUser);

module.exports = router;
