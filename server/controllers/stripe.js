const User = require("../models/user");
const Cart = require("../models/cart");
const Product = require("../models/product");
const Coupon = require("../models/coupon");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

exports.createPaymentIntent = async (req, res) => {
  // console.log(req.body)
  const { couponApplied } = req.body;
  // return
  //to apply coupon
  //to do calculate price
  //1. find user
  const user = await User.findOne({ email: req.user.email }).exec();
  //2. get user cart total
  const { cartTotal, totalAfterDiscount } = await Cart.findOne({
    orderedBy: user._id,
  }).exec();
  //console.log("CART TOTAL ", cartTotal, "AFTER DISCOUNT", totalAfterDiscount);

  //create payment intent with order amount and currency
  let finalAmount = 0;
  if (couponApplied && totalAfterDiscount) {
    finalAmount = (totalAfterDiscount * 100);
  } else {
    finalAmount = (cartTotal * 100);
  }
  const paymentIntent = await stripe.paymentIntents.create({
    amount: finalAmount, //to convert value in cent
    currency: "aud",
  });
  res.send({
    clientSecret: paymentIntent.client_secret,cartTotal, totalAfterDiscount, payable: finalAmount
  });
};
