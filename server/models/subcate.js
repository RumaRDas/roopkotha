const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const subcateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true, //remove white spaces
      required: "Name is required",
      minlength: [3, "Too short"],
      maxlength: [32, "Too long"],

    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    parent: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Subcate", subcateSchema);
