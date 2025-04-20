const Role = require("../models/Role");
const logger = require("../utils/logger");

exports.createRole = async (req, resp) => {
    try {
      // console.log("Incoming role data:", req.body);
  
      const role = new Role(req.body);
      await role.save();
      logger.info(
        `Role created successfully: ${JSON.stringify({ role_name: role.role_name, role_slug: role.role_slug ,role:201 })}`,
        { code: '201' }
      );
      resp.status(201).json(role);
    } catch (err) {
      logger.error(`Role creation failed: ${err.message}`, { code: '500' });
      resp.status(400).json({ error: err.message });
    }
  };
  exports.getRolesData = async (req, resp) => {
    try {
      const roles = await Role.find().sort({ createdAt: -1 });
      logger.info(
        `Role fetched successfully: ${JSON.stringify({Role})}`, 
        {code:201}
      );
      resp.status(200).json(roles);
    } catch (err) {
      logger.error(`Role fetched failed: ${err.message}`);
      resp.status(500).json({ error: err.message });
    }
  }; 
  exports.getRoleById = async (req, resp) => {
    try {
      const role = await Role.findById(req.params.id);
      if (!role) {
        return resp.status(404).json({ error: "Role not found" });
      }
      resp.status(200).json(role);
    } catch (err) {
      resp.status(400).json({ error: err.message });
    }
  };
  exports.updateRole = async (req, resp) => { 
    try {
      const role = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true });
      logger.info(`Role updated successfully: ${JSON.stringify({ role_name: role.role_name, role_slug: role.role_slug })}`, { code: '200' });
        resp.status(200).json(role);
        } catch (err) {
          logger.error(`Role update failed: ${err.message}`, { code: '500' });
          resp.status(400).json({ error: err.message });
        }
  };
  exports.statusRole = async (req, resp) => {
    try {
      const role = await Role.findById(req.params.id);
      if (!role) {
        return resp.status(404).json({ error: 'Role not found' });
      }
      // Toggle string status
      role.status = role.status === '1' ? '0' : '1';
      await role.save();
  
      resp.json({ message: 'Status updated', status: role.status });
    } catch (error) {
      resp.status(500).json({ error: 'Server error' });
    }
  };  

exports.deleteRole = async (req, resp) => {
  try {
    await Role.findByIdAndDelete(req.params.id);
    logger.info(`Role deleted successfully: ${JSON.stringify({ role_name: req.params.id })}`,
    { code: '200' });
    resp.status(200).json({ message: 'Role deleted successfully' });
    } catch (err) {
      logger.error(`Role deletion failed: ${err.message}`, { code: '500' });
      resp.status(400).json({ error: err.message });
      }
  };
