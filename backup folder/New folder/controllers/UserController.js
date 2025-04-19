const User = require('../models/User');

exports.createUser = async (req, res) => {
  const { name, username, email, role_id } = req.body;
  try {
    const user = new User({ name, username, email, role_id });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().populate('role_id'); // populate role info
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
