const express = require("express");
const router = express.Router();
const { createRole, getRolesData, getRoleById, updateRole, deleteRole,statusRole } = require("../controllers/RoleController");

router.post("/", createRole);
router.get("/", getRolesData);
router.get("/:id", getRoleById);
router.put("/update/:id", updateRole);
router.delete("/delete/:id", deleteRole);
router.put('/status/:id', statusRole);

module.exports = router;
