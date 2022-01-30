const express = require("express");
const router = express.Router();

//import middlewares

const { authCheck } = require("../middlewares/auth");

//controller
const { userCart, getUserCart, emptyCart} =require('../controllers/user')

router.post('/user/cart', authCheck, userCart) //save user card

router.get('/user/cart', authCheck, getUserCart) //get Cart

router.delete('/user/cart', authCheck, emptyCart) //empty Cart
// router.get("/user", (req, res) => {
//   res.json({
//     data: "Hit user API endpoint ...... ",
//   });
// });

module.exports = router;
