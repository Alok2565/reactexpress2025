const User = require("../models/User");
const UserLogin = require("../models/UserLogin");
const logger = require("../utils/logger");

exports.createUser = async (req, resp) => {
  try {
    const userData = {
      ...req.body,
      ip_address: req.body.ip_address || req.ip,
    };
    const user = new User(userData);
    await user.save();
    // const populatedUser = await User.findById(user._id).populate("role_id");
    // resp.status(201).json(populatedUser);

    const user_login = new UserLogin({
      user_id: user._id,
      email: req.body.email,
      ip_address: req.body.ip_address || req.ip // fallback to request IP
    });
    await user_login.save();
    const populatedUser = await User.findById(user._id).populate("role_id");

    logger.info(
      `User and login created successfully: ${JSON.stringify({
        user_id: user._id,
        email: req.body.email,
        role_id: user.role_id,
        ip_address: user.ip_address,
        status: 201
      })}`,
      { code: '201' }
    );

    resp.status(201).json({
      message: "User and login created successfully",
      user: populatedUser,
      login: user_login
    });
  } catch (err) {
    console.error('Error creating user and login:', err);
    logger.error(
      `Failed to create user and login: ${JSON.stringify({
        error: err.message,
        body: req.body,
        ip_address: req.ip
      })}`,
      { code: '500' }
    );
    resp.status(500).json({ message: err.message });
  }
};

exports.getAllUsers = async (req, resp) => {
  try {
    const users = await User.find().populate("role_id").sort({ createdAt: -1 });
    resp.status(200).json(users);
  } catch (err) {
    resp.status(500).json({ error: err.message });
  }
};
