const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;
const cartSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: "Product",
        },
        count: Number,
        color: String,
        price: Number,
        size: String,
      },
    ],
    cartTotal: Number,
    totalAfterDiscount: Number,
    orderedBy: { type: ObjectId, ref: "User" },
  },
  { timeseries: true }
);

module.exports = mongoose.model("Cart", cartSchema);
