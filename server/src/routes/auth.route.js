const express = require("express");
const { signupController } = require("../controllers/auth.controller");

const authRouter = express.Router();

authRouter.post("/signup", signupController);

module.exports = {
  authRouter,
};
