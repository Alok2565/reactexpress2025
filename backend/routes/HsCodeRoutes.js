const express = require("express");
const router = express.Router();
const { createHsCode, getHsCodesData, getHsCodeById, updateHsCode, deleteHsCode, statusHsCode } = require("../controllers/HsCodeItemController");

router.post("/", createHsCode);
router.get("/", getHsCodesData);
router.get("/:id", getHsCodeById);
router.put("/update/:id", updateHsCode);
router.delete("/delete/:id", deleteHsCode);
router.put('/status/:id', statusHsCode);

module.exports = router;
