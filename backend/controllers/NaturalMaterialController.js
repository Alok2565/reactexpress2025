const NaturalMaterial = require("../models/NaturalofMaterail");
const logger = require("../utils/logger");

exports.createNaturalMaterial = async (req, resp) => {
    try {
        const natural_material = new NaturalMaterial(req.body);
        await natural_material.save();
        logger.info(
            `Natural material created successfully: ${JSON.stringify({ name: natural_material.name, slug: natural_material.slug, natural_material: 201 })}`,
            { code: '201' }
        );
        resp.status(201).json(natural_material);
    } catch (err) {
        logger.error(`Natural Material creation failed: ${err.message}`, { code: '500' });
        resp.status(400).json({ error: err.message });
    }
};
exports.getNaturalMaterialsData = async (req, resp) => {
    try {
        const natural_materials = await NaturalMaterial.find().sort({ createdAt: -1 });
        logger.info(
            `Natural material fetched successfully: ${JSON.stringify({ NaturalMaterial })}`,
            { code: 201 }
        );
        resp.status(200).json(natural_materials);
    } catch (err) {
        logger.error(`Natural material fetched failed: ${err.message}`);
        resp.status(500).json({ error: err.message });
    }
};
exports.getNaturalMaterialById = async (req, resp) => {
    try {
        const natural_material = await NaturalMaterial.findById(req.params.id);
        if (!natural_material) {
            return resp.status(404).json({ error: "Natural material not found" });
        }
        resp.status(200).json(natural_material);
    } catch (err) {
        resp.status(400).json({ error: err.message });
    }
};
exports.updateNaturalMaterial = async (req, resp) => {
    try {
        const natural_material = await NaturalMaterial.findByIdAndUpdate(req.params.id, req.body, { new: true });
        logger.info(`Natural material updated successfully: ${JSON.stringify({ name: natural_material.name, slug: natural_material.slug })}`, { code: '200' });
        resp.status(200).json(natural_material);
    } catch (err) {
        logger.error(`Natural material update failed: ${err.message}`, { code: '500' });
        resp.status(400).json({ error: err.message });
    }
};
exports.statusNaturalMaterial = async (req, resp) => {
    try {
        const natural_material = await NaturalMaterial.findById(req.params.id);
        if (!natural_material) {
            return resp.status(404).json({ error: 'Natural material not found' });
        }
        // Toggle string status
        natural_material.status = natural_material.status === '1' ? '0' : '1';
        await natural_material.save();

        resp.json({ message: 'Status updated', status: natural_material.status });
    } catch (error) {
        resp.status(500).json({ error: 'Server error' });
    }
};

exports.deleteNaturalMaterial = async (req, resp) => {
    try {
        await NaturalMaterial.findByIdAndDelete(req.params.id);
        logger.info(`Natural material deleted successfully: ${JSON.stringify({ name: req.params.id })}`,
            { code: '200' });
        resp.status(200).json({ message: 'Natural material deleted successfully' });
    } catch (err) {
        logger.error(`Natural material deletion failed: ${err.message}`, { code: '500' });
        resp.status(400).json({ error: err.message });
    }
};
