const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const tokenVerification = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
        const decoded = await jwt.verify(token, process.env.SECRET_KEY);
        req.user = await User.findById(decoded._id);
        next();
      } catch (error) {
        console.log(error);
        res.status(403).json({ status: false, message: "Not authorized!" });
      }
    } else {
      res.status(403).json({ status: false, message: "Not authorized!" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = tokenVerification;
