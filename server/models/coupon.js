const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;
const couponSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      uppercase: true,
      required: "Name is required",
      minlength: [6, "Too short"],
      maxlength: [12, "Too long"],
    },
    expiry: {
      Type: Date,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
  },
  { timeseries: true }
);

module.exports = mongoose.model("Coupon", couponSchema);
