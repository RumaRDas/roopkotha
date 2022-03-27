const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true, //remove white spaces
      required: true,
      text: true,
      minlength: [3, "Too short"],
      maxlength: [32, "Too long"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    name: {
      type: String,
      trim: true, //remove white spaces
      required: true,
      text: true,
      minlength: [3, "Too short"],
    },
    description: {
      type: String,
      trim: true, //remove white spaces
      required: true,
      maxlength: 2000,
      text: true,
    },
    price: {
      type: Number,
      trim: true, //remove white spaces
      required: true,
      maxlength: 32,
    },
    category: {
      type: ObjectId,
      ref: "Category",
    },
    subcates: [
      {
        type: ObjectId,
        ref: "Subcate",
      },
    ],
    quantity: Number,
    sold: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
    },
    preorder: {
      type: String,
      enum: ["Yes", "No"],
    },
    color: {
      type: String,
      enum: [
        "White",
        "Black",
        "Red",
        "Pink",
        "Blue",
        "Green",
        "Yellow",
        "Others",
      ],
    },
    fabric: {
      type: String,
      enum: [
        "Cotton",
        "Muslin",
        "Silk",
        "Katan",
        "Gorgette",
        "Organza",
        "Casula",
        "PartyWare",
        "Others",
      ],
    },
    sizes: [
      {
        type: String,
        enum: ["32", "34", "36", "38", "40", "42", "44", "46"],
      },
    ],
    ratings: [
      {
        star: Number,
        postedBy: { type: ObjectId, ref: "User" },
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Product", productSchema);
