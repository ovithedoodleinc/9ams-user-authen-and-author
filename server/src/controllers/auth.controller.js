const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ShopModel } = require("../models/shop.model");
const { UserModel } = require("../models/user.model");

const signupController = async (req, res) => {
  try {
    const { shopNames, username, password } = req.body;

    // check if shopNames array is not containing duplicates item in the request body
    const setOfShopNames = new Set(shopNames);
    if (setOfShopNames.size !== shopNames.length) {
      return res.status(400).json({
        error: "duplicate shop names detected",
      });
    }

    // check if a shop name does not exist in the database
    const shopNamesExistsPromises = shopNames.map((name) =>
      ShopModel.exists({
        name,
      })
    );
    const existingShopNames = await Promise.all(shopNamesExistsPromises);
    for (let I = 0; I < existingShopNames.length; I++) {
      if (existingShopNames[I]) {
        return res.status(400).json({
          error: `shop with name "${shopNames[I]}" already exists`,
        });
      }
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // all checks passed, proceed with user and shop creation
    const user = await UserModel.create({
      username,
      password: hashedPassword,
    });
    const shops = await ShopModel.insertMany(
      shopNames.map((name) => ({
        name,
        owner: user._id,
      }))
    );

    // prepare response data
    const userData = {
      _id: user._id,
      username: user.username,
    };
    const shopsData = shops.map((shop) => ({
      _id: shop._id,
      name: shop.name,
      owner: shop.owner,
    }));

    res.status(201).json({ user: userData, shops: shopsData });
  } catch (err) {
    console.log("🚀 ~ signup ~ err:", err);

    res.status(400).json({
      error: err.message || "an error occurred during signup",
    });
  }
};

const signinController = async (req, res) => {
  try {
    const { username, password, rememberMe } = req.body;

    // find user by username
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(400).json({
        error: "user not found",
      });
    }

    // check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        error: "incorrect password",
      });
    }

    // generate jwt token
    const payload = {
      _id: user._id,
      username: user.username,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: rememberMe ? "7d" : "30m",
    });

    // set token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: rememberMe ? 7 * 24 * 60 * 60 * 1000 : 30 * 60 * 1000,
      domain: `.${req.headers.host.split(":")[0]}`,
    });

    // prepare response data
    const userData = {
      _id: user._id,
      username: user.username,
    };

    res.status(200).json({ user: userData });
  } catch (err) {
    console.log("🚀 ~ signinController ~ err:", err);

    res.status(400).json({
      error: err.message || "an error occurred during signup",
    });
  }
};

module.exports = {
  signupController,
  signinController,
};
