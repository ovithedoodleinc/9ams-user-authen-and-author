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

    // all checks passed, proceed with user and shop creation
    const user = await UserModel.create({
      username,
      password,
    });
    const shops = await ShopModel.insertMany(
      shopNames.map((name) => ({
        name,
        owner: user._id,
      }))
    );

    res.status(201).json({ user, shops });
  } catch (err) {
    console.log("🚀 ~ signup ~ err:", err);

    res.status(400).json({
      error: err.message || "An error occurred during signup",
    });
  }
};

module.exports = {
  signupController,
};
