const Product = require("../models/product");
const User = require("../models/user");
const Cart = require("../models/cart");

exports.userCart = async (req, res) => {
  // console.log("USER_CART", req.body); // { cart };
  const { cart } = req.body;
  const products = [];
  const user = await User.findOne({ email: req.user.email }).exec();
  //check if cart with logged in user id already exist
  const cartExistByThisUser = await Cart.findOne({
    orderedBy: user._id,
  }).exec();
  if (cartExistByThisUser) {
    cartExistByThisUser.remove();
    //  console.log("remove old cart");
  }
  for (let i = 0; i < cart.length; i++) {
    let object = {};
    object.product = cart[i]._id;
    object.count = cart[i].count;
    object.color = cart[i].color;
    //get price for creating total
    let { price } = await Product.findById(cart[i]._id).select("price").exec();
    object.price = price;

    //pushing the product object to cart
    products.push(object);
  }
  console.log("PRODUCTS", products);
  let cartTotal = 0;
  for (let i = 0; i < products.length; i++) {
    cartTotal = cartTotal + products[i].price * products[i].count;
  }
  //console.log("CART TOTAL", cartTotal);
  let newCart = await new Cart({
    products,
    cartTotal,
    orderedBy: user._id,
  }).save();
  // console.log("new Cart---->", newCart);
  res.json({ ok: true }); //after user click ok then it will work
};

exports.getUserCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();
  const cart = await Cart.findOne({ orderBy: user._id })
    .populate("products.product", "_id title price totalAfterDiscount")
    .exec();
  const { products, cartTotal, totalAfterDiscount } = cart;
  res.json({ products, cartTotal, totalAfterDiscount });
};
