const express = require("express");
const router = express.Router();
const { createResearchAnalysis, getResearchAnalysisesData, getResearchAnalysisById, updateResearchAnalysis, deleteResearchAnalysis, statusResearchAnalysis } = require("../controllers/WeatherResearchAnalysisController");

router.post("/", createResearchAnalysis);
router.get("/", getResearchAnalysisesData);
router.get("/:id", getResearchAnalysisById);
router.put("/update/:id", updateResearchAnalysis);
router.delete("/delete/:id", deleteResearchAnalysis);
router.put('/status/:id', statusResearchAnalysis);

module.exports = router;
