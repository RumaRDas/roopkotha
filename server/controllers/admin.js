const Order = require("../models/order");


exports.orders = async (req, res) => {
  const allOrders = await Order.find({})
    .sort("-createdAt")
    .populate("products.product")
    .populate("orderedBy");
  res.json(allOrders);
  console.log("Backend res--->", allOrders);
};

exports.orderStatus = async (req, res) => {
  const { orderId, orderStatus } = req.body;
  const updated = await Order.findByIdAndUpdate(
    orderId,
    { orderStatus },
    { new: true }
  ).exec();
  res.json(updated);
};
