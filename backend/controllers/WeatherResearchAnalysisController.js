const ResearchAnalysis = require("../models/WeatherResearchAnalysis");
const logger = require("../utils/logger");

exports.createResearchAnalysis = async (req, resp) => {
    try {
        const research_analysis = new ResearchAnalysis(req.body);
        await research_analysis.save();
        logger.info(
            `Weather Research Analysis created successfully: ${JSON.stringify({ name: research_analysis.name, slug: research_analysis.slug, research_analysis: 201 })}`,
            { code: '201' }
        );
        resp.status(201).json(research_analysis);
    } catch (err) {
        logger.error(`Weather Research Analysis creation failed: ${err.message}`, { code: '500' });
        resp.status(400).json({ error: err.message });
    }
};
exports.getResearchAnalysisesData = async (req, resp) => {
    try {
        const research_analysises = await ResearchAnalysis.find().sort({ createdAt: -1 });
        logger.info(
            `Weather Research Analysis fetched successfully: ${JSON.stringify({ ResearchAnalysis })}`,
            { code: 201 }
        );
        resp.status(200).json(research_analysises);
    } catch (err) {
        logger.error(`Weather Research Analysis fetched failed: ${err.message}`);
        resp.status(500).json({ error: err.message });
    }
};
exports.getResearchAnalysisById = async (req, resp) => {
    try {
        const research_analysis = await ResearchAnalysis.findById(req.params.id);
        if (!research_analysis) {
            return resp.status(404).json({ error: "Weather Research Analysis not found" });
        }
        resp.status(200).json(research_analysis);
    } catch (err) {
        resp.status(400).json({ error: err.message });
    }
};
exports.updateResearchAnalysis = async (req, resp) => {
    try {
        const research_analysis = await ResearchAnalysis.findByIdAndUpdate(req.params.id, req.body, { new: true });
        logger.info(`Weather Research Analysis updated successfully: ${JSON.stringify({ name: research_analysis.name, slug: research_analysis.slug })}`, { code: '200' });
        resp.status(200).json(research_analysis);
    } catch (err) {
        logger.error(`Weather Research Analysis update failed: ${err.message}`, { code: '500' });
        resp.status(400).json({ error: err.message });
    }
};
exports.statusResearchAnalysis = async (req, resp) => {
    try {
        const research_analysis = await ResearchAnalysis.findById(req.params.id);
        if (!research_analysis) {
            return resp.status(404).json({ error: 'Weather Research Analysis not found' });
        }
        // Toggle string status
        research_analysis.status = research_analysis.status === '1' ? '0' : '1';
        await research_analysis.save();

        resp.json({ message: 'Status updated', status: research_analysis.status });
    } catch (error) {
        resp.status(500).json({ error: 'Server error' });
    }
};

exports.deleteResearchAnalysis = async (req, resp) => {
    try {
        await ResearchAnalysis.findByIdAndDelete(req.params.id);
        logger.info(`Weather Research Analysis deleted successfully: ${JSON.stringify({ name: req.params.id })}`,
            { code: '200' });
        resp.status(200).json({ message: 'Weather Research Analysis deleted successfully' });
    } catch (err) {
        logger.error(`Weather Research Analysis deletion failed: ${err.message}`, { code: '500' });
        resp.status(400).json({ error: err.message });
    }
};
