const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8000;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const productRouter = require("./routes/products");

const Product = require("./models/Product");

dotenv.config();

// MIDDLEWARE
const corsConfig = {
  origin: true,
  credentials: true,
};
app.use(cors(corsConfig));
app.options("*", cors(corsConfig));
app.use(express.json());

// CONNECT THE MONGODB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection Successful!"))
  .catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.send("backed server connected");
});

app.get("/myItem", async (req, res) => {
  const email = req.query?.email;
  const query = { email: email };
  try {
    const products = await Product.find(query);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});
// USE AND CALL THE API ROUTE
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

app.listen(port, () => {
  console.log("Backend server is running!");
});
