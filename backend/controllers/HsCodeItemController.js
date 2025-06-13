const HsCode = require("../models/HsCodeItems");
const logger = require("../utils/logger");

exports.createHsCode = async (req, resp) => {
    try {
        const hs_code = new HsCode(req.body);
        await hs_code.save();
        logger.info(
            `Hs Code created successfully: ${JSON.stringify({ Number: hs_code.hs_code, description: hs_code.description, hs_code: 201 })}`,
            { code: '201' }
        );
        resp.status(201).json(hs_code);
    } catch (err) {
        logger.error(`Hs Code creation failed: ${err.message}`, { code: '500' });
        resp.status(400).json({ error: err.message });
    }
};
exports.getHsCodesData = async (req, resp) => {
    try {
        const hs_codes = await HsCode.find().sort({ createdAt: -1 });
        logger.info(
            `Hs Code fetched successfully: ${JSON.stringify({ HsCode })}`,
            { code: 201 }
        );
        resp.status(200).json(hs_codes);
    } catch (err) {
        logger.error(`Hs Code fetched failed: ${err.message}`);
        resp.status(500).json({ error: err.message });
    }
};
exports.getHsCodeById = async (req, resp) => {
    try {
        const hs_code = await HsCode.findById(req.params.id);
        if (!hs_code) {
            return resp.status(404).json({ error: "Hs Code not found" });
        }
        resp.status(200).json(hs_code);
    } catch (err) {
        resp.status(400).json({ error: err.message });
    }
};
exports.updateHsCode = async (req, resp) => {
    try {
        const hs_code = await HsCode.findByIdAndUpdate(req.params.id, req.body, { new: true });
        logger.info(`Hs Code updated successfully: ${JSON.stringify({ Number: hs_code.hs_code, description: hs_code.description })}`, { code: '200' });
        resp.status(200).json(hs_code);
    } catch (err) {
        logger.error(`Hs Code update failed: ${err.message}`, { code: '500' });
        resp.status(400).json({ error: err.message });
    }
};
exports.statusHsCode = async (req, resp) => {
    try {
        const hs_code = await HsCode.findById(req.params.id);
        if (!hs_code) {
            return resp.status(404).json({ error: 'Hs Code not found' });
        }
        // Toggle string status
        hs_code.status = hs_code.status === '1' ? '0' : '1';
        await hs_code.save();

        resp.json({ message: 'Status updated', status: hs_code.status });
    } catch (error) {
        resp.status(500).json({ error: 'Server error' });
    }
};

exports.deleteHsCode = async (req, resp) => {
    try {
        await HsCode.findByIdAndDelete(req.params.id);
        logger.info(`Hs Code deleted successfully: ${JSON.stringify({ name: req.params.id })}`,
            { code: '200' });
        resp.status(200).json({ message: 'Hs Code deleted successfully' });
    } catch (err) {
        logger.error(`Hs Code deletion failed: ${err.message}`, { code: '500' });
        resp.status(400).json({ error: err.message });
    }
};
