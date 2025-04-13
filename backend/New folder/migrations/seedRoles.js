
const Role = require('../app/models/RoleModel');

const seedRoles = async () => {
  try {
    const roles = ['Admin', 'User', 'Manager'];
    for (const roleName of roles) {
      const exists = await Role.findOne({ name: roleName });
      if (!exists) {
        await Role.create({ name: roleName });
        console.log(`Role '${roleName}' created`);
      }
    }
  } catch (err) {
    console.error('Migration failed:', err.message);
  }
};

module.exports = seedRoles;
