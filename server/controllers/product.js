const Product = require("../models/product");
const slugify = require("slugify");
const { find } = require("../models/product");

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.title);

    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (err) {
    console.log(err);
    //  res.status(400).send("Create category fail");
    res.status(400).json({
      err: err.message,
    });
  }
};
exports.listAll = async (req, res) => {
  const products = await Product.find({})
    .limit(parseInt(req.params.count))
    .populate("category") // for getting detiles for category and sub category we need to use populate
    .populate("subcates")
    .sort([["createdAt", "desc"]])
    .exec();
  res.json(products);
};

//res.json(await Product.find({}).sort({ createdAt: -1 }).exec()); // find list by latest update

exports.read = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug })
    .populate("category")
    .populate("subcates")
    .exec();
  res.json(product);
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Product.findOneAndRemove({
      slug: req.params.slug,
    }).exec();
    res.json(" Product deleted successfuly ");
    //   res.json(deleted);
  } catch (err) {
    //console.log(err);
    res.status(400).send("Product delete failed");
  }
};

exports.update = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updated = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    ).exec();
    res.json(updated);
  } catch (err) {
    console.log("PRODUCT UPDATE EROR ::", err);
    res.status(400).json({ err: err.massage });
  }
  //res.status(400).send("Product Update Failed")
};

// Without pagination...........................
// exports.list = async (req, res) => {
//   try {
//     // createdAt/updatedAt, desc/asc, 3
//     const { sort, order, limit } = req.body;
//     const products = await Product.find({})
//       .populate("category")
//       .populate("subcates")
//       .sort([[sort, order]])
//       .limit(limit)
//       .exec();

//     res.json(products);
//   } catch (err) {
//     console.log(err);
//   }
// };

// With pagination...........................
exports.list = async (req, res) => {
  // console.table(req.body)
  try {
    // createdAt/updatedAt, desc/asc, 3
    const { sort, order, page } = req.body;
    const currentPage = page || 1;
    const perPage = 3;
    const products = await Product.find({})
      .skip((currentPage - 1) * perPage)
      .populate("category")
      .populate("subcates")
      .sort([[sort, order]])
      .limit(perPage)
      .exec();

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

exports.productsCount = async (req, res) => {
  let total = await Product.find({}).estimatedDocumentCount().exec();
  res.json(total);
};

exports.productStar = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec(); //getting the product that are rating
  const user = await User.findOne({ email: req.params.user.email }).exec(); //geting the loged in user giving rating

  const { star } = req.body; // geting the rating  value 1 to 5
  //who is updating

  //check if currently logged in user , have already added rating to this product
  let existingRatingObject = product.ratings.find(
    (ele) => ele.postedBy.toString() === user._id.toString()
  );
  //if user havent left rating yet, push it
  if (existingRatingObject === undefined) {
    // finding loged in user is
    let ratingAdded = await Product.findByIdAndUpdate(
      product._id,
      {
        $push: { ratings: { star, postedBy: user._id } }, // using push method to get the rating
      },
      { new: true }
    ).exec();
    console.log("Rating ADded :", ratingAdded);
    res.json(ratingAdded);
  } else {
    // if user have already left rating , update it
    const ratingUpdated = await Product.updateOne(
      {
        ratings: { $elemMatch: existingRatingObject }, // using $elemMatch to matching user
      },
      { $set: { "rating.$star": star } }, // useing set method we are updating rating
      { new: true }
    ).exec();
    console.log("RATING UPDATED :", ratingUpdated);
    res.jaon(ratingUpdated);
  }
};