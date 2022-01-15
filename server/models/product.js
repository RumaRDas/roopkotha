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
    subcate: [
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
      typr: Array,
    },
    shipping: {
      typr: String,
      enum: ["Yes", "No"],
    },
    color: {
      type: String,
      enum: ["White", "Black", "Red", "Pink", "Blue", "Green", "Yellow"],
    },
    color: {
      type: String,
      enum: [
        "Cotton",
        "Muslin",
        "Silk",
        "Katan",
        "Jorget",
        "Casula",
        "PartyWare",
        "Others",
      ],
    },
    rating: [
      {
        star: Number,
        postedBy: { type: ObjectId, ref: "User" },
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Product", productSchema);
