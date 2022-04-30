const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    img: { type: String },
    name: { type: String, required: true, unique: true },
    desc: { type: String },
    price: { type: String },
    quantity: { type: String },
    supplierName: { type: String },
    year: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", ProductSchema);
