const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8000;

// MIDDLE WARE
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("server connected");
});

app.listen(port, () => {
  console.log("backed server is running");
});
