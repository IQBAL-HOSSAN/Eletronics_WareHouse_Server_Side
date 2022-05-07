const router = require("express").Router();
const Product = require("../models/Product.js");
const verify = require("../verifyToken");

// CREATE
router.post("/", async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const saveProduct = await newProduct.save();
    res.status(201).json(saveProduct);
  } catch (err) {
    res.status(500).json(err);
  }
  if (req.user.isAdmin) {
    // const newProduct = new Product(req.body);
    // try {
    //   const saveProduct = await newProduct.save();
    //   res.status(201).json(saveProduct);
    // } catch (err) {
    //   res.status(500).json(err);
    // }
  } else {
    // res.status(403).json("You are not allowed");
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  //   console.log("upsate");
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
  if (req.user.isAdmin) {
    // try {
    //   const updatedProduct = await Product.findByIdAndUpdate(
    //     req.params.id,
    //     {
    //       $set: req.body,
    //     },
    //     { new: true }
    //   );
    //   res.status(200).json(updatedProduct);
    // } catch (err) {
    //   res.status(500).json(err);
    // }
  } else {
    res.status(403).json("You are not allowed");
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("The Product has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
  if (req.user.isAdmin) {
    // try {
    //   await Product.findByIdAndDelete(req.params.id);
    //   res.status(200).json("The Product has been deleted");
    // } catch (err) {
    //   res.status(500).json(err);
    // }
  } else {
    res.status(403).json("You are not allowed");
  }
});

// GET ONE BY ID
router.get("/:id", async (req, res) => {
  try {
    const products = await Product.findById(req.params.id);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL
router.get("/", async (req, res) => {
  const query = {};
  try {
    const products = await Product.find(query);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
