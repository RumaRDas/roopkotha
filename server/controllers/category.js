const Category = require("../models/category");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    //const category = await new Category({ name,slug: slugify(name),}).save();
    //res.json(category)
    res.json(await new Category({ name, slug: slugify(name) }).save());
  } catch (err) {
    console.log(err);
    res.status(400).send("Create category fail");
  }
};
exports.list = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    res.status(400).send("Create category fail");
  }
};
exports.read = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    res.status(400).send("Create category fail");
  }
};
exports.update = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    res.status(400).send("Create category fail");
  }
};
exports.remove = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    res.status(400).send("Create category fail");
  }
};

