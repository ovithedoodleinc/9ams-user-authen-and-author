const dotenv = require("dotenv");
const express = require("express");
const { connectDB } = require("./config/db");

dotenv.config();

const PORT = process.env.PORT || 8080;

connectDB();

const app = express();

app.get("/", (_, res) => {
  res.send("hello, world!");
});

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
