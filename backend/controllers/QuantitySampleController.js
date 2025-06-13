const QuantitySample = require("../models/QuantityofSample");
const logger = require("../utils/logger");

exports.createQuantitySample = async (req, resp) => {
    try {
        const quantity_sample = new QuantitySample(req.body);
        await quantity_sample.save();
        logger.info(
            `Quantity Sample created successfully: ${JSON.stringify({ name: quantity_sample.name, slug: quantity_sample.slug, quantity_sample: 201 })}`,
            { code: '201' }
        );
        resp.status(201).json(quantity_sample);
    } catch (err) {
        logger.error(`Quantity Sample creation failed: ${err.message}`, { code: '500' });
        resp.status(400).json({ error: err.message });
    }
};
exports.getQuantitySamplesData = async (req, resp) => {
    try {
        const quantity_samples = await QuantitySample.find().sort({ createdAt: -1 });
        logger.info(
            `Quantity Sample fetched successfully: ${JSON.stringify({ QuantitySample })}`,
            { code: 201 }
        );
        resp.status(200).json(quantity_samples);
    } catch (err) {
        logger.error(`Quantity Sample fetched failed: ${err.message}`);
        resp.status(500).json({ error: err.message });
    }
};
exports.getQuantitySampleById = async (req, resp) => {
    try {
        const quantity_sample = await QuantitySample.findById(req.params.id);
        if (!quantity_sample) {
            return resp.status(404).json({ error: "Quantity Sample not found" });
        }
        resp.status(200).json(quantity_sample);
    } catch (err) {
        resp.status(400).json({ error: err.message });
    }
};
exports.updateQuantitySample = async (req, resp) => {
    try {
        const quantity_sample = await QuantitySample.findByIdAndUpdate(req.params.id, req.body, { new: true });
        logger.info(`Quantity Sample updated successfully: ${JSON.stringify({ name: quantity_sample.name, slug: quantity_sample.slug })}`, { code: '200' });
        resp.status(200).json(quantity_sample);
    } catch (err) {
        logger.error(`Quantity Sample update failed: ${err.message}`, { code: '500' });
        resp.status(400).json({ error: err.message });
    }
};
exports.statusQuantitySample = async (req, resp) => {
    try {
        const quantity_sample = await QuantitySample.findById(req.params.id);
        if (!quantity_sample) {
            return resp.status(404).json({ error: 'Quantity Sample not found' });
        }
        // Toggle string status
        quantity_sample.status = quantity_sample.status === '1' ? '0' : '1';
        await quantity_sample.save();

        resp.json({ message: 'Status updated', status: quantity_sample.status });
    } catch (error) {
        resp.status(500).json({ error: 'Server error' });
    }
};

exports.deleteQuantitySample = async (req, resp) => {
    try {
        await QuantitySample.findByIdAndDelete(req.params.id);
        logger.info(`Quantity Sample deleted successfully: ${JSON.stringify({ name: req.params.id })}`,
            { code: '200' });
        resp.status(200).json({ message: 'Quantity Sample deleted successfully' });
    } catch (err) {
        logger.error(`Quantity Sample deletion failed: ${err.message}`, { code: '500' });
        resp.status(400).json({ error: err.message });
    }
};
