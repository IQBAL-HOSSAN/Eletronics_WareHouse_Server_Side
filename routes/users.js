const router = require("express").Router();
const User = "../models/User.js";

// GET ALL USER
router.get("/", async (req, res) => {
  const query = {};
  console.log("get users");
  try {
    const users = await User.find(query);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
