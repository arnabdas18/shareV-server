const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const generateToken = require("../util/generateToken");

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(403).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await new userModel({
      ...req.body,
      password: hashedPassword,
    }).save();

    res.status(201).json({
      message: "User register successful",
      newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "User register unsuccessful",
      error,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userFound = await userModel.findOne({ email });
    if (userFound) {
      try {
        const authStatus = await bcrypt.compare(password, userFound.password);

        if (authStatus) {
          const token = generateToken(userFound._id);

          return res.status(200).json({
            message: "Logged In",
            token,
          });
        } else {
          return res.status(403).json({
            message: "Email or Password doesn't match",
          });
        }
      } catch (error) {
        res.status(500).json({
          message: "Password comparing error",
          error,
        });
      }
    } else {
      return res.status(401).json({
        message: "User not registered",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error,
    });
  }
};
