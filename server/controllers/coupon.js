const Coupon = require("../models/coupon");

//create, remove, list
exports.create = async (req, res) => {
  try {
    const { name, expiry, discount } = req.body;
    res.json(await new Coupon({ name, expiry, discount }).save());
  } catch (err) {
    console.log("Coupon  err --->", err);
    res.status(400).send("Create Coupon fail");
  }
};
exports.list = async (req, res) =>
  res.json(await Coupon.find({}).sort({ createdAt: -1 }).exec()); // find list by latest update

exports.remove = async (req, res) => {
  try {
    const deleted = await Coupon.findByIdAndDelete(req.params.couponId).exec();
    res.json(" Coupon deleted successfuly ");
    //   res.json(deleted);
  } catch (err) {
    //console.log(err);
    res.status(400).send("Coupon delete failed");
  }
};
