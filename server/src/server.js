const dotenv = require("dotenv");
const express = require("express");
const { connectDB } = require("./config/db");
const { authRouter } = require("./routes/auth.route");

dotenv.config();

const PORT = process.env.PORT || 8080;

connectDB();

const app = express();

app.use(express.json());

app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
