const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      lowercase: true,
      trim: true,
      required: [true, "username required"],
      minlength: [2, "username must be at least 2 characters"],
      maxlength: [32, "username must be in 32 characters"],
      unique: [true, "username must be unique"],
    },
    password: {
      type: String,
      select: false,
      required: [true, "password required"],
      minlength: [8, "password must be at least 8 characters"],
      match: [
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/,
        "password must include at least one number and one special character",
      ],
    },
    shops: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Shop" }],
      validate: {
        validator: function (value) {
          return Array.isArray(value) && value.length >= 3 && value.length <= 4;
        },
        message: "user must have between 3 and 4 shops",
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
