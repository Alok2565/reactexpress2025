const PurposeEndUse = require("../models/PurposeofEndUse");
const logger = require("../utils/logger");

exports.createPurposeEndUse = async (req, resp) => {
    try {
        const purpose_endUse = new PurposeEndUse(req.body);
        await purpose_endUse.save();
        logger.info(
            `Purpose of end use created successfully: ${JSON.stringify({ name: purpose_endUse.name, slug: purpose_endUse.slug, purpose_endUse: 201 })}`,
            { code: '201' }
        );
        resp.status(201).json(purpose_endUse);
    } catch (err) {
        logger.error(`Purpose of end use creation failed: ${err.message}`, { code: '500' });
        resp.status(400).json({ error: err.message });
    }
};
exports.getPurposeEndUsesData = async (req, resp) => {
    try {
        const purpose_endUses = await PurposeEndUse.find().sort({ createdAt: -1 });
        logger.info(
            `Purpose of end use fetched successfully: ${JSON.stringify({ PurposeEndUse })}`,
            { code: 201 }
        );
        resp.status(200).json(purpose_endUses);
    } catch (err) {
        logger.error(`Purpose of end use fetched failed: ${err.message}`);
        resp.status(500).json({ error: err.message });
    }
};
exports.getPurposeEndUseById = async (req, resp) => {
    try {
        const purpose_endUse = await PurposeEndUse.findById(req.params.id);
        if (!purpose_endUse) {
            return resp.status(404).json({ error: "Purpose of end use not found" });
        }
        resp.status(200).json(purpose_endUse);
    } catch (err) {
        resp.status(400).json({ error: err.message });
    }
};
exports.updatePurposeEndUse = async (req, resp) => {
    try {
        const purpose_endUse = await PurposeEndUse.findByIdAndUpdate(req.params.id, req.body, { new: true });
        logger.info(`Purpose of end use updated successfully: ${JSON.stringify({ name: purpose_endUse.name, slug: purpose_endUse.slug })}`, { code: '200' });
        resp.status(200).json(purpose_endUse);
    } catch (err) {
        logger.error(`Purpose of end use update failed: ${err.message}`, { code: '500' });
        resp.status(400).json({ error: err.message });
    }
};
exports.statusPurposeEndUse = async (req, resp) => {
    try {
        const purpose_endUse = await PurposeEndUse.findById(req.params.id);
        if (!purpose_endUse) {
            return resp.status(404).json({ error: 'Purpose of end use not found' });
        }
        // Toggle string status
        purpose_endUse.status = purpose_endUse.status === '1' ? '0' : '1';
        await purpose_endUse.save();

        resp.json({ message: 'Status updated', status: purpose_endUse.status });
    } catch (error) {
        resp.status(500).json({ error: 'Server error' });
    }
};

exports.deletePurposeEndUse = async (req, resp) => {
    try {
        await PurposeEndUse.findByIdAndDelete(req.params.id);
        logger.info(`Purpose of end use deleted successfully: ${JSON.stringify({ name: req.params.id })}`,
            { code: '200' });
        resp.status(200).json({ message: 'Purpose of end use deleted successfully' });
    } catch (err) {
        logger.error(`Purpose of end use deletion failed: ${err.message}`, { code: '500' });
        resp.status(400).json({ error: err.message });
    }
};
