const Role = require('../models/Role');

// exports.createRole = async (req, resp) => {
//   try {
//     const role = new Role({ role_name: req.body.role_name });
//     await role.save();
//     resp.status(201).json(role);
//   } catch (err) {
//     resp.status(400).json({ error: err.message });
//   }
// };

exports.createRole = async (req, resp) => {
    try {
      const role = new Role({ 
        role_name: req.body.role_name,
        role_slug: req.body.role_slug // <-- include this
      });
      await role.save();
      resp.status(201).json(role);
    } catch (err) {
      resp.status(400).json({ error: err.message });
    }
  };

exports.getRoles = async (req, resp) => {
  const roles = await Role.find();
  resp.json(roles);
};
