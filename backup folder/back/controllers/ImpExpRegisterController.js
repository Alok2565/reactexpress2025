const ImpExpModel = require('../models/ImpExpModel');
const { logToFile } = require('../utils/logger');

exports.createImporterExporter = async (req, resp) =>{
    try {
        const {
            role_id,iec_code, name, name_ofCPerson, designation,email,
            address, address2, city, state, pincode,
            mobile_number, ip_address
        } = req.body;

        const importerExporter = new ImpExpModel({
            role_id,iec_code, name, name_ofCPerson, designation, email, 
            address, address2, city, state, pincode,
            mobile_number,ip_address
        });
        const result = await importerExporter.save();
        console.warn(result);
        // Log success
        logToFile('success', `Importer/Exporter with IEC ${iec_code} created.`);
        resp.status(201).json(result);
    } catch (err) {
        // Log failure
        logToFile('error', `Failed to create Importer/Exporter: ${err.message}`);

        resp.status(500).json({ message: err.message });
    }
};
exports.getImporterExporter= async (req, resp) => {
  try {
    const result = await ImpExpModel.find().exec();
    resp.status(200).json(result);
    } catch (err) {
        // Log failure
        logToFile('error', `Failed to get Importer/Exporter: ${err.message}`);
        resp.status(500).json({ message: err.message });
        }
};
