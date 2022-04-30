const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8000;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const productRouter = require("./routes/products");

dotenv.config();

// MIDDLEWARE
app.use(cors());
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

// USE AND CALL THE API ROUTE
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

app.listen(port, () => {
  console.log("Backend server is running!");
});
