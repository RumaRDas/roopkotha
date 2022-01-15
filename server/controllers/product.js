const Product = require("../models/product");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.title);

    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (err) {
    console.log(err);
    res.status(400).send("Create category fail");
  }
};
exports.list = async (req, res) =>
res.json(await Product.find({}).sort({ createdAt: -1 }).exec()); // find list by latest update

exports.read = async (req, res) => {
  // const product = await Product.findOne({ slug: req.params.slug }).exec();
  // res.json(product);
};

exports.update = async (req, res) => {
  // const { name } = req.body;
  // try {
  //   const update = await {Product}.findOneAndUpdate(
  //     {
  //       slug: req.params.slug,
  //     },
  //     { name, slug: slugify(name) },
  //     { new: true }
  //   );
  //   res.json(update);
  // } catch (err) {
  //   //console.log(err);
  //   res.status(400).send(" Product Update falied");
  // }
};

exports.remove = async (req, res) => {
  // try {
  //   const deleted = await Product.findOneAndDelete({ slug: req.params.slug });
  //   res.json(" Product deleted successfuly ");
  //   //   res.json(deleted);
  // } catch (err) {
  //   //console.log(err);
  //   res.status(400).send("Product delete failed");
  // }
};
