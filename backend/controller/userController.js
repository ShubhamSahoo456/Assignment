const { Request, Response } = require("express");
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/userModel");

const googleClient = new OAuth2Client({
  clientId: `${process.env.GOOGLE_CLIENT_ID}`,
});

const registerUserController = async (req, res) => {
  try {
    const { email, googleAuthToken } = req.body;

    if (googleAuthToken) {
      const ticket = await googleClient.verifyIdToken({
        idToken: googleAuthToken,
        audience: `${process.env.GOOGLE_CLIENT_ID}`,
      });
      const payload = ticket.getPayload();
      const googleSignIn = await User.findOne({ email: payload?.email });
      if (googleSignIn) {
        const updateUser = await User.findByIdAndUpdate(googleSignIn._id, {
          googleAuthToken: googleAuthToken,
        });
        const token = await updateUser.generateToken();
        res.status(200).json({
          status: true,
          user: updateUser,
          token: token,
        });
      } else {
        const registerUser = new User(req.body);
        const saveUser = await registerUser.save();
        if (saveUser) {
          const token = await saveUser.generateToken();
          res.status(201).json({
            status: true,
            user: saveUser,
            token: token,
          });
        }
      }
    }
    const user = await User.findOne({ email });
    if (user) {
      res.status(200).json({ status: false, message: "email already exists" });
    } else {
      const registerUser = new User(req.body);
      const saveUser = await registerUser.save();
      if (saveUser) {
        res.status(200).json({ status: true, user: saveUser });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.passwordVerify(password))) {
      const token = await user.generateToken();
      res.status(200).json({ status: true, user: user, token });
    } else {
      res.status(200).json({ status: false, message: "invalid credentials" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  registerUserController,
  loginUserController,
};
