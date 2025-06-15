const SampleStorage = require("../models/PurposeofSampleStorage");
const logger = require("../utils/logger");

exports.createSampleStorage = async (req, resp) => {
    try {
        const sample_storage = new SampleStorage(req.body);
        await sample_storage.save();
        logger.info(
            `Purpose of Sample Storage created successfully: ${JSON.stringify({ name: sample_storage.name, slug: sample_storage.slug, sample_storage: 201 })}`,
            { code: '201' }
        );
        resp.status(201).json(sample_storage);
    } catch (err) {
        logger.error(`Purpose of Sample Storage creation failed: ${err.message}`, { code: '500' });
        resp.status(400).json({ error: err.message });
    }
};
exports.getSamplesStorageData = async (req, resp) => {
    try {
        const samples_storage = await SampleStorage.find().sort({ createdAt: -1 });
        logger.info(
            `Purpose of Sample Storage fetched successfully: ${JSON.stringify({ SampleStorage })}`,
            { code: 201 }
        );
        resp.status(200).json(samples_storage);
    } catch (err) {
        logger.error(`Purpose of Sample Storage fetched failed: ${err.message}`);
        resp.status(500).json({ error: err.message });
    }
};
exports.getSampleStorageById = async (req, resp) => {
    try {
        const sample_storage = await SampleStorage.findById(req.params.id);
        if (!sample_storage) {
            return resp.status(404).json({ error: "Purpose of Sample Storage not found" });
        }
        resp.status(200).json(sample_storage);
    } catch (err) {
        resp.status(400).json({ error: err.message });
    }
};
exports.updateSampleStorage = async (req, resp) => {
    try {
        const sample_storage = await SampleStorage.findByIdAndUpdate(req.params.id, req.body, { new: true });
        logger.info(`Purpose of Sample Storage updated successfully: ${JSON.stringify({ name: sample_storage.name, slug: sample_storage.slug })}`, { code: '200' });
        resp.status(200).json(sample_storage);
    } catch (err) {
        logger.error(`Purpose of Sample Storage update failed: ${err.message}`, { code: '500' });
        resp.status(400).json({ error: err.message });
    }
};
exports.statusSampleStorage = async (req, resp) => {
    try {
        const sample_storage = await SampleStorage.findById(req.params.id);
        if (!sample_storage) {
            return resp.status(404).json({ error: 'Purpose of Sample Storage not found' });
        }
        // Toggle string status
        sample_storage.status = sample_storage.status === '1' ? '0' : '1';
        await sample_storage.save();

        resp.json({ message: 'Status updated', status: sample_storage.status });
    } catch (error) {
        resp.status(500).json({ error: 'Server error' });
    }
};

exports.deleteSampleStorage = async (req, resp) => {
    try {
        await SampleStorage.findByIdAndDelete(req.params.id);
        logger.info(`Purpose of Sample Storage deleted successfully: ${JSON.stringify({ name: req.params.id })}`,
            { code: '200' });
        resp.status(200).json({ message: 'Purpose of Sample Storage deleted successfully' });
    } catch (err) {
        logger.error(`Purpose of Sample Storage deletion failed: ${err.message}`, { code: '500' });
        resp.status(400).json({ error: err.message });
    }
};
