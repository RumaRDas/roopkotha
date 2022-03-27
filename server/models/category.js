const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
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
    images: {
      type: Array,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Category", categorySchema);
