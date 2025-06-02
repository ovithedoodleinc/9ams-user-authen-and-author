const express = require("express");
const {
  signupController,
  signinController,
} = require("../controllers/auth.controller");

const authRouter = express.Router();

authRouter.post("/signup", signupController);
authRouter.post("/signin", signinController);

module.exports = {
  authRouter,
};
