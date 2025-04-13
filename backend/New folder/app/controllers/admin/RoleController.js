// controller/roleController.js
const Role = require('../../models/RoleModel');

exports.getAllRoles = async (req, resp) => {
  try {
    const roles = await Role.find();
    resp.json(roles);
  } catch (err) {
    resp.status(500).json({ error: err.message });
  }
};

exports.createRole = async (req, resp) => {
  try {
    const { name, slug } = req.body;
    
    // Validation
    if (!name || !name.trim()) {
      return resp.status(400).json({ error: 'Role name is required' });
    }
    if (name.length < 3) {
      return resp.status(400).json({ error: 'Role name must be at least 3 characters' });
    }
    if (name.length > 50) {
      return resp.status(400).json({ error: 'Role name cannot exceed 50 characters' });
    }
    if (slug && !/^[a-z0-9-]+$/.test(slug)) {
      return resp.status(400).json({ error: 'Slug must contain only lowercase letters, numbers and hyphens' });
    }

    const roleData = { name };
    if (slug) roleData.slug = slug;
    
    const role = await Role.create(roleData);
    resp.status(201).json(role);
  } catch (err) {
    if (err.code === 11000) {
      resp.status(400).json({ error: 'Role name must be unique' });
    } else {
      resp.status(400).json({ error: err.message });
    }
  }
};

exports.updateRole = async (req, resp) => {
  try {
    const role = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true });
    resp.json(role);
  } catch (err) {
    resp.status(400).json({ error: err.message });
  }
};

exports.deleteRole = async (req, resp) => {
  try {
    await Role.findByIdAndDelete(req.params.id);
    resp.json({ message: 'Role deleted' });
  } catch (err) {
    resp.status(400).json({ error: err.message });
  }
};
