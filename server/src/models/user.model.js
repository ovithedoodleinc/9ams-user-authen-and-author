const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      lowercase: true,
      trim: true,
      required: [true, "username required"],
      minlength: [3, "username must be at least 3 characters"],
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
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = {
  UserModel,
};
