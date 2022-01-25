const Product = require("../models/product");
const User = require("../models/user");
const slugify = require("slugify");
const { query } = require("express");
const { aggregate } = require("../models/product");
const { json } = require("body-parser");

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
    //  console.log("PRODUCT UPDATE EROR ::", err);
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
  const user = await User.findOne({ email: req.user.email }).exec(); //geting the loged in user giving rating

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
    //  console.log("Rating Added :", ratingAdded);
    res.json(ratingAdded);
  } else {
    // if user have already left rating , update it
    const ratingUpdated = await Product.updateOne(
      {
        ratings: { $elemMatch: existingRatingObject }, // using $elemMatch to matching user
      },
      { $set: { "ratings.$.star": star } }, // useing set method we are updating rating
      { new: true }
    ).exec();
    //   console.log("RATING UPDATED :", ratingUpdated);
    res.json(ratingUpdated);
  }
};

//finding related product without that product

exports.listRelated = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();
  const related = await Product.find({
    _id: { $ne: product._id }, //$ne means not including
    category: product.category,
  })
    //  .limit(3)
    .populate("category")
    .populate("subcates")
    .populate("ratings.postedBy")
    .exec();

  res.json(related);
};

//SEARCH/FILTER
const handleQuery = async (req, res, query) => {
  const products = await Product.find({ $text: { $search: query } })
    .populate("category", "_id name")
    .populate("subcates", "_id name")
    .populate("ratings.postedBy", "_id name")
    .exec();
  res.json(products);
};
//geting products by price
const handlePrice = async (req, res, price) => {
  try {
    const products = await Product.find({
      price: {
        $gte: price[0], //Greater then
        $lte: price[1], //less then
      },
    })
      .populate("category", "_id name")
      .populate("subcates", "_id name")
      .populate("ratings.postedBy", "_id name")
      .exec();
    res.json(products);
  } catch (err) {
    console.log(err);
  }
};
//geting products by Category
const handleCategory = async (req, res, category) => {
  try {
    const products = await Product.find({ category })
      .populate("category", "_id name")
      .populate("subcates", "_id name")
      .populate("ratings.postedBy", "_id name")
      .exec();
    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

//geting products by Stars Rating
const handleStar = (req, res, stars) => {
  Product.aggregate([
    {
      $project: {
        document: "$$ROOT",
        floorAverage: {
          $floor: { $avg: "$ratings.star" },
        },
      },
    },
    { $match: { floorAverage: stars } },
  ])
    .limit(12)
    .exec((err, aggregates) => {
      if (err) {
        console.log("AGGREGATE ERROR", err);
      } else {
        Product.find({ _id: aggregates })
          .populate("category", "_id name")
          .populate("subcates", "_id name")
          .populate("ratings.postedBy", "_id name")
          .exec((err, products) => {
            if (err) console.log("Product AggreGate Error", err);
            res.json(products);
          });
      }
    });
};

// getting products by Sub category
const handleSubcate =async(req, res,subcate)=>{
  const products= await Product.find({subcates: subcate})
  .populate("category", "_id name")
  .populate("subcates", "_id name")
  .populate("ratings.postedBy", "_id name")
  .exec();
res.json(products)
}

// getting products by Sub shipping
const handleShipping =async(req, res,shipping)=>{
  const products= await Product.find({shipping })
  .populate("category", "_id name")
  .populate("subcates", "_id name")
  .populate("ratings.postedBy", "_id name")
  .exec();
res.json(products)
}
// getting products by Sub Color
const handleColor =async(req, res,color)=>{
  const products= await Product.find({color })
  .populate("category", "_id name")
  .populate("subcates", "_id name")
  .populate("ratings.postedBy", "_id name")
  .exec();
res.json(products)
}
// getting products by Sub shipping
const handleType =async(req, res,type)=>{
  const products= await Product.find({type })
  .populate("category", "_id name")
  .populate("subcates", "_id name")
  .populate("ratings.postedBy", "_id name")
  .exec();
res.json(products)
}
exports.searchFilters = async (req, res) => {
  const { query, price, category, stars,subcate, shipping,color, type } = req.body;
  if (query) {
    // console.log("QUERY :", query);
    await handleQuery(req, res, query);
  }
  //price [20-200, 200-300]
  if (price !== undefined) {
    //console.log("PRICE -------->", price);
    await handlePrice(req, res, price);
  }
  if (category) {
    //  console.log("category-------------->",category)
    await handleCategory(req, res, category);
  }
  if (stars) {
    console.log("stars-------------->", stars);
    await handleStar(req, res, stars);
  }
  if (subcate) {
    console.log("stars-------------->", subcate);
    await handleSubcate(req, res, subcate);
  }
  if (shipping) {
    console.log("stars-------------->", shipping);
    await handleShipping(req, res, shipping);
  }
  if (color) {
    console.log("stars-------------->", color);
    await handleColor(req, res, color);
  }
    if (type) {
      console.log("stars-------------->", type);
      await handleType(req, res, type);
    }

};

