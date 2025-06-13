const express = require("express");
const router = express.Router();
const { createQuantitySample, getQuantitySamplesData, getQuantitySampleById, updateQuantitySample, deleteQuantitySample, statusQuantitySample } = require("../controllers/QuantitySampleController");

router.post("/", createQuantitySample);
router.get("/", getQuantitySamplesData);
router.get("/:id", getQuantitySampleById);
router.put("/update/:id", updateQuantitySample);
router.delete("/delete/:id", deleteQuantitySample);
router.put('/status/:id', statusQuantitySample);

module.exports = router;
