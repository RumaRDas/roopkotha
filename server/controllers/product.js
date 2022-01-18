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

// exports.update = async (req, res) => {
//   const { name } = req.body;
//   try {
//     const update = await {Product}.findOneAndUpdate(
//       {
//         slug: req.params.slug,
//       },
//       { name, slug: slugify(name) },
//       { new: true }
//     );
//     res.json(update);
//   } catch (err) {
//     //console.log(err);
//     res.status(400).send(" Product Update falied");
//   }
// };

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

exports.update=async(req, res)=>{
try{
  if(req.body.title){
    req.body.slug = slugify(req.body.title)
  }
  const updated= await Product.findOneAndUpdate({slug: req.params.slug}, req.body, {new: true}).exec()
  res.json(updated)

}catch(err){
console.log("PRODUCT UPDATE",err)
return res.status(400).send("Product Update Failed")
}
}
