const express = require("express");
const router = express.Router();
const { createDocMaster, getDocMastersData, getDocMasterById, updateDocMaster, deleteDocMaster, statusDocMaster } = require("../controllers/DocMasterController");

router.post("/", createDocMaster);
router.get("/", getDocMastersData);
router.get("/:id", getDocMasterById);
router.put("/update/:id", updateDocMaster);
router.delete("/delete/:id", deleteDocMaster);
router.put('/status/:id', statusDocMaster);

module.exports = router;
