const User = require('../models/User');

exports.createUser = async (req, resp) => {
  try {
    const { name, username, email, role_id, status } = req.body;
    const user = new User({ name, username, email, role_id, status });
    await user.save();
    resp.status(201).json(user);
  } catch (err) {
    resp.status(400).json({ error: err.message });
  }
};

exports.getUsers = async (req, resp) => {
  try {
    const users = await User.find().populate('role_id', 'role_name');
    resp.json(users);
  } catch (err) {
    resp.status(500).json({ error: err.message });
  }
};

exports.getUserById = async (req, resp) => {
  try {
    const user = await User.findById(req.params.id).populate('role_id');
    if (!user) return resp.status(404).json({ error: 'User not found' });
    resp.json(user);
  } catch (err) {
    resp.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, resp) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return resp.status(404).json({ error: 'User not found' });
    resp.json(updated);
  } catch (err) {
    resp.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, resp) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return resp.status(404).json({ error: 'User not found' });
    resp.json({ message: 'User deleted' });
  } catch (err) {
    resp.status(500).json({ error: err.message });
  }
};
