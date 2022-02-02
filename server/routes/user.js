const express = require("express");
const router = express.Router();

//import middlewares

const { authCheck } = require("../middlewares/auth");

//controller
const {
  userCart,
  getUserCart,
  emptyCart,
  saveAddress,
  applyCouponToUserCart,
  createOrder
} = require("../controllers/user");

router.post("/user/cart", authCheck, userCart); //save user card

router.get("/user/cart", authCheck, getUserCart); //get Cart

router.delete("/user/cart", authCheck, emptyCart); //empty Cart
// router.get("/user", (req, res) => {
//   res.json({
//     data: "Hit user API endpoint ...... ",
//   });
// });
router.post("/user/address", authCheck, saveAddress);
//coupon
router.post('/user/cart/coupon', authCheck, applyCouponToUserCart)

//Router for order 
router.post('/user/order', authCheck, createOrder)
module.exports = router;
