const express = require("express");
const router = express.Router();

const {
    createSampleCollected,
    getSampleCollectedsData,
    getSampleCollectedById,
    updateSampleCollected,
    deleteSampleCollected,
    statusSampleCollected
} = require("../controllers/SampleCollectedController");

router.post("/", createSampleCollected);
router.get("/", getSampleCollectedsData);
router.get("/:id", getSampleCollectedById);
router.put("/update/:id", updateSampleCollected);
router.delete("/delete/:id", deleteSampleCollected);
router.put("/status/:id", statusSampleCollected);

module.exports = router;
