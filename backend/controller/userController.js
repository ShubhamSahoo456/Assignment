const User = require("../models/userModel");

const registerUserController = async (req, res) => {
  try {
    console.log(req.body);
    const { email, googleAuthToken } = req.body;
    if (googleAuthToken) {
      const googleSignIn = await User.findOne({ email });
      if (googleSignIn) {
        const updateUser = await User.findByIdAndUpdate(googleSignIn._id, {
          googleAuthToken: googleAuthToken,
        });
        res
          .status(200)
          .json({
            status: true,
            user: updateUser,
            token: updateUser.googleAuthToken,
          });
      } else {
        const registerUser = new User(req.body);
        const saveUser = await registerUser.save();
        if (saveUser) {
          res
            .status(200)
            .json({
              status: true,
              user: saveUser,
              token: saveUser.googleAuthToken,
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
