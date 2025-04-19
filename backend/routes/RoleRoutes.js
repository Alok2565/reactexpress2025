const express = require("express");
const router = express.Router();
const { createRole, getRolesData, getRoleById, updateRole, deleteRole } = require("../controllers/RoleController");

router.post("/", createRole);
router.get("/", getRolesData);
router.get("/:id", getRoleById);
router.put("/:id", updateRole);
router.delete("/:id", deleteRole);

module.exports = router;
