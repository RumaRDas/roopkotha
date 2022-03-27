const Category = require("../models/category");
const Product = require("../models/product");
const Subcate = require("../models/subcate");
const slugify = require("slugify");

// exports.create = async (req, res) => {
//   try {
//     const { name } = req.body;
//     //const category = await new Category({ name,slug: slugify(name),}).save();
//     //res.json(category)
//     res.json(await new Category({ name, slug: slugify(name) }).save());
//   } catch (err) {
//     console.log(err);
//     res.status(400).send("Create category fail");
//   }
// };
exports.create = async (req, res) => {
  try {
    const { name,images } = req.body;
    //const category = await new Category({ name,slug: slugify(name),}).save();
    //res.json(category)
    res.json(await new Category({ name,images, slug: slugify(name) }).save());
  } catch (err) {
    console.log(err);
    res.status(400).send("Create category fail");
  }
};
exports.list = async (req, res) =>
  res.json(await Category.find({}).sort({ createdAt: -1 }).exec()); // find list by latest update

exports.read = async (req, res) => {
  const category = await Category.findOne({ slug: req.params.slug }).exec(); //for getting category according to slug
  //res.json(category);
  const products = await Product.find({ category }) //getting products belongs to category
    .populate("category")
    .populate("ratings.postedBy", "_id name")
    .exec();
  res.json({
    category,
    products,
  });
};

exports.readlist = async (req, res) => {
  const category = await Category.findOne({ slug: req.params.slug }).exec(); //for getting category according to slug
  res.json(category);
  // const products = await Product.find({ category }) //getting products belongs to category
  //   .populate("category")
  //   .populate("ratings.postedBy", "_id name")
  //   .exec();
  // res.json({
  //   category,
  //   products,
  // });
};
exports.update = async (req, res) => {
  const { name,images } = req.body;
  try {
    const update = await Category.findOneAndUpdate(
      {
        slug: req.params.slug,
      },
      { name,images, slug: slugify(name) },
      { new: true }
    );
    res.json(update);
  } catch (err) {
    //console.log(err);
    res.status(400).send(" Category Update falied");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Category.findOneAndDelete({ slug: req.params.slug });
    res.json(" Category deleted successfuly ");
    //   res.json(deleted);
  } catch (err) {
    //console.log(err);
    res.status(400).send("Category delete failed");
  }
};
// exports.getSubcate = async (req, res) => {
//   try {
//     const subcate = await Subcate.find({ parent: req.params._id }).exec();
//     res.json(subcate);
//   } catch (err) {
//     console.log(err);
//     res.status(400).send("SubCategory Not Found ");
//   }
// };
exports.getSubcate = (req, res) => {
  Subcate.find({ parent: req.params._id }).exec((err, subs) => {
    if (err) console.log(err);
    res.json(subs);
  });
};