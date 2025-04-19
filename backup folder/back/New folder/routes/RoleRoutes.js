// routes/roleRoutes.js
const express = require('express');
const router = express.Router();
const roleController = require('../app/controllers/admin/RoleController');

router.get('/', roleController.getAllRoles);
router.post('/', roleController.createRole);
router.put('/:id', roleController.updateRole);
router.delete('/:id', roleController.deleteRole);

module.exports = router;
