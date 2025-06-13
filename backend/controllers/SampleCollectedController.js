// const SampleCollected = require("../models/SampleCollected");
// const logger = require("../utils/logger");

// exports.createSampleCollected = async (req, resp) => {
//     try {
//         const sample_collected = new SampleCollected(req.body);
//         await sample_collected.save();
//         logger.info(
//             `Sample Collected created successfully: ${JSON.stringify({ name: sample_collected.name, slug: sample_collected.slug, sample_collected: 201 })}`,
//             { code: '201' }
//         );
//         resp.status(201).json(sample_collected);
//     } catch (err) {
//         logger.error(`Sample Collected creation failed: ${err.message}`, { code: '500' });
//         resp.status(400).json({ error: err.message });
//     }
// };
// exports.getSampleCollectedsData = async (req, resp) => {
//     try {
//         const samples_collected = await SampleCollected.find().sort({ createdAt: -1 });
//         logger.info(
//             `Sample Collected fetched successfully: ${JSON.stringify({ SampleCollected })}`,
//             { code: 201 }
//         );
//         resp.status(200).json(samples_collected);
//     } catch (err) {
//         logger.error(`Sample Collected fetched failed: ${err.message}`);
//         resp.status(500).json({ error: err.message });
//     }
// };
// exports.getSampleCollectedById = async (req, resp) => {
//     try {
//         const sample_collected = await SampleCollected.findById(req.params.id);
//         if (!sample_collected) {
//             return resp.status(404).json({ error: "Sample Collected not found" });
//         }
//         resp.status(200).json(sample_collected);
//     } catch (err) {
//         resp.status(400).json({ error: err.message });
//     }
// };
// exports.updateSampleCollected = async (req, resp) => {
//     try {
//         const sample_collected = await SampleCollected.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         logger.info(`Sample Collected updated successfully: ${JSON.stringify({ name: sample_collected.name, slug: sample_collected.slug })}`, { code: '200' });
//         resp.status(200).json(sample_collected);
//     } catch (err) {
//         logger.error(`Sample Collected update failed: ${err.message}`, { code: '500' });
//         resp.status(400).json({ error: err.message });
//     }
// };
// exports.statusSampleCollected = async (req, resp) => {
//     try {
//         const sample_collected = await SampleCollected.findById(req.params.id);
//         if (!sample_collected) {
//             return resp.status(404).json({ error: 'Sample Collected not found' });
//         }
//         // Toggle string status
//         sample_collected.status = sample_collected.status === '1' ? '0' : '1';
//         await sample_collected.save();

//         resp.json({ message: 'Status updated', status: sample_collected.status });
//     } catch (error) {
//         resp.status(500).json({ error: 'Server error' });
//     }
// };

// exports.deleteSampleCollected = async (req, resp) => {
//     try {
//         await SampleCollected.findByIdAndDelete(req.params.id);
//         logger.info(`Sample Collected deleted successfully: ${JSON.stringify({ name: req.params.id })}`,
//             { code: '200' });
//         resp.status(200).json({ message: 'Sample Collected deleted successfully' });
//     } catch (err) {
//         logger.error(`Sample Collected deletion failed: ${err.message}`, { code: '500' });
//         resp.status(400).json({ error: err.message });
//     }
// };

const SampleCollected = require("../models/SampleCollected");
const logger = require("../utils/logger");

exports.createSampleCollected = async (req, resp) => {
    try {
        const sample_collected = new SampleCollected(req.body);
        await sample_collected.save();
        logger.info(
            `Sample Collected created successfully: ${JSON.stringify({ name: sample_collected.name, slug: sample_collected.slug, sample_collected: 201 })}`,
            { code: '201' }
        );
        resp.status(201).json(sample_collected);
    } catch (err) {
        logger.error(`Sample Collected creation failed: ${err.message}`, { code: '500' });
        resp.status(400).json({ error: err.message });
    }
};

exports.getSampleCollectedsData = async (req, resp) => {
    try {
        const samples_collected = await SampleCollected.find().sort({ createdAt: -1 });
        logger.info(
            `Sample Collected fetched successfully: ${JSON.stringify({ samples_collected })}`,
            { code: 201 }
        );
        resp.status(200).json(samples_collected);
    } catch (err) {
        logger.error(`Sample Collected fetched failed: ${err.message}`);
        resp.status(500).json({ error: err.message });
    }
};

exports.getSampleCollectedById = async (req, resp) => {
    try {
        const sample_collected = await SampleCollected.findById(req.params.id);
        if (!sample_collected) {
            return resp.status(404).json({ error: "Sample Collected not found" });
        }
        resp.status(200).json(sample_collected);
    } catch (err) {
        resp.status(400).json({ error: err.message });
    }
};

exports.updateSampleCollected = async (req, resp) => {
    try {
        const sample_collected = await SampleCollected.findByIdAndUpdate(req.params.id, req.body, { new: true });
        logger.info(`Sample Collected updated successfully: ${JSON.stringify({ name: sample_collected.name, slug: sample_collected.slug })}`, { code: '200' });
        resp.status(200).json(sample_collected);
    } catch (err) {
        logger.error(`Sample Collected update failed: ${err.message}`, { code: '500' });
        resp.status(400).json({ error: err.message });
    }
};

exports.statusSampleCollected = async (req, resp) => {
    try {
        const sample_collected = await SampleCollected.findById(req.params.id);
        if (!sample_collected) {
            return resp.status(404).json({ error: 'Sample Collected not found' });
        }
        sample_collected.status = sample_collected.status === '1' ? '0' : '1';
        await sample_collected.save();
        resp.json({ message: 'Status updated', status: sample_collected.status });
    } catch (error) {
        resp.status(500).json({ error: 'Server error' });
    }
};

exports.deleteSampleCollected = async (req, resp) => {
    try {
        await SampleCollected.findByIdAndDelete(req.params.id);
        logger.info(`Sample Collected deleted successfully: ${JSON.stringify({ id: req.params.id })}`, { code: '200' });
        resp.status(200).json({ message: 'Sample Collected deleted successfully' });
    } catch (err) {
        logger.error(`Sample Collected deletion failed: ${err.message}`, { code: '500' });
        resp.status(400).json({ error: err.message });
    }
};

