const express = require("express");
const router = express.Router();
const { createSampleStorage, getSamplesStorageData, getSampleStorageById, updateSampleStorage, deleteSampleStorage, statusSampleStorage } = require("../controllers/PurposeofSampleStorageController");

router.post("/", createSampleStorage);
router.get("/", getSamplesStorageData);
router.get("/:id", getSampleStorageById);
router.put("/update/:id", updateSampleStorage);
router.delete("/delete/:id", deleteSampleStorage);
router.put('/status/:id', statusSampleStorage);

module.exports = router;
