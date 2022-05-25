const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  googleAuthToken: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
});

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      next();
    }
    this.password = await bcrypt.hash(this.password, 12);
    next();
  } catch (error) {
    console.log(error);
  }
});

userSchema.methods.passwordVerify = async function (userPassword) {
  try {
    const verifyPassword = await bcrypt.compare(userPassword, this.password);
    if (verifyPassword) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

userSchema.methods.generateToken = async function () {
  try {
    const token = await jwt.sign({ _id: this._id }, process.env.SECRET_KEY, {
      expiresIn: "1m",
    });
    return token;
  } catch (error) {
    console.log(error);
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
