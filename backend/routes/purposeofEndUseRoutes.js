const express = require("express");
const router = express.Router();
const { createPurposeEndUse, getPurposeEndUsesData, getPurposeEndUseById, updatePurposeEndUse, deletePurposeEndUse, statusPurposeEndUse } = require("../controllers/PurposeofEndUseController");

router.post("/", createPurposeEndUse);
router.get("/", getPurposeEndUsesData);
router.get("/:id", getPurposeEndUseById);
router.put("/update/:id", updatePurposeEndUse);
router.delete("/delete/:id", deletePurposeEndUse);
router.put('/status/:id', statusPurposeEndUse);

module.exports = router;
