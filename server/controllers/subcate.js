const Subcate = require("../models/subcate");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name, parent } = req.body;
    res.json(await new Subcate({ name, parent, slug: slugify(name) }).save());
  } catch (err) {
    //console.log("subCreate err --->err");
    res.status(400).send("Create SubCategory fail");
  }
};
exports.list = async (req, res) =>
  res.json(await Subcate.find({}).sort({ createdAt: -1 }).exec()); // find list by latest update

exports.read = async (req, res) => {
  const subcate = await Subcate.findOne({ slug: req.params.slug }).exec();
  res.json(subcate);
};

exports.update = async (req, res) => {
  const { name, parent } = req.body;
  try {
    const update = await Subcate.findOneAndUpdate(
      {
        slug: req.params.slug,
      },
      { name, parent, slug: slugify(name) },
      { new: true }
    );
    res.json(update);
  } catch (err) {
    // console.log(err);
    res.status(400).send(" SubCategory Update falied");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Subcate.findOneAndDelete({ slug: req.params.slug });
    res.json(" SubCategory deleted successfuly ");
    //   res.json(deleted);
  } catch (err) {
    //console.log(err);
    res.status(400).send("Subategory delete failed");
  }
};
