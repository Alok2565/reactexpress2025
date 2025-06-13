const express = require("express");
const router = express.Router();
const { createNaturalMaterial, getNaturalMaterialsData, getNaturalMaterialById, updateNaturalMaterial, deleteNaturalMaterial, statusNaturalMaterial } = require("../controllers/NaturalMaterialController");

router.post("/", createNaturalMaterial);
router.get("/", getNaturalMaterialsData);
router.get("/:id", getNaturalMaterialById);
router.put("/update/:id", updateNaturalMaterial);
router.delete("/delete/:id", deleteNaturalMaterial);
router.put('/status/:id', statusNaturalMaterial);

module.exports = router;
