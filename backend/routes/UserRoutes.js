const express = require("express");
const router = express.Router();
const { createUser, getAllUsers,getUserById,updateUser,deleteUser,statusUser } = require("../controllers/UserController");

router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/update/:id", updateUser);
router.delete('/delete/:id', deleteUser);
router.put('/status/:id', statusUser);

module.exports = router;
