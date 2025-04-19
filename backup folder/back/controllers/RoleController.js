// const Role = require('../models/Role');

// exports.createRole = async (req, res) => {
//   try {
//     const { role_name, role_slug } = req.body;
//     const newRole = new Role({ role_name, role_slug });
//     await newRole.save();
//     res.status(201).json(newRole);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// exports.getRoles = async (req, res) => {
//   const roles = await Role.find();
//   res.json(roles);
// };

// exports.getRoleById = async (req, res) => {
//   const role = await Role.findById(req.params.id);
//   res.json(role);
// };

// exports.updateRole = async (req, res) => {
//   const updated = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.json(updated);
// };

// exports.deleteRole = async (req, res) => {
//   await Role.findByIdAndDelete(req.params.id);
//   res.json({ message: 'Role deleted' });
// };

const Role = require('../models/Role');

exports.createRole = async (req, res) => {
  try {
    const { role_name, role_slug, status } = req.body;
    const newRole = new Role({ role_name, role_slug, status });
    await newRole.save();
    res.status(201).json(newRole);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRoleById = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) return res.status(404).json({ error: 'Role not found' });
    res.json(role);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const updated = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Role not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteRole = async (req, res) => {
  try {
    const deleted = await Role.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Role not found' });
    res.json({ message: 'Role deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
