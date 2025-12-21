const DocMaster = require("../models/DocMaster");
const logger = require("../utils/logger");

// exports.createDocMaster = async (req, resp) => {
//     try {
//         const doc_master = new DocMaster(req.body);
//         await doc_master.save();
//         logger.info(
//             `Doc Master created successfully: ${JSON.stringify({ name: doc_master.name, slug: doc_master.slug, doc_master: 201 })}`,
//             { code: '201' }
//         );
//         resp.status(201).json(doc_master);
//     } catch (err) {
//         logger.error(`Doc Master creation failed: ${err.message}`, { code: '500' });
//         resp.status(400).json({ error: err.message });
//     }
// };
exports.createDocMaster = async (req, resp) => {
  try {
    const count = await DocMaster.countDocuments();
    const newDocId = count === 0 ? 1 : count * 10;

    const doc_master = new DocMaster({
      ...req.body,
      doc_id: newDocId,
    });
    
    await doc_master.save();
    logger.info(`Doc Master created: doc_id=${newDocId}`, { code: "201" });
    resp.status(201).json(doc_master);
  } catch (err) {
    logger.error(`Doc Master creation failed: ${err.message}`, { code: "500" });
    resp.status(400).json({ error: err.message });
  }
};

exports.getDocMastersData = async (req, resp) => {
  try {
    const doc_masters = await DocMaster.find().sort({ createdAt: -1 });
    logger.info(
      `Doc Master fetched successfully: ${JSON.stringify({ doc_masters })}`,
      { code: 201 }
    );
    resp.status(200).json(doc_masters);
  } catch (err) {
    logger.error(`Doc Master fetched failed: ${err.message}`);
    resp.status(500).json({ error: err.message });
  }
};

exports.getDocMasterById = async (req, resp) => {
  try {
    const doc_master = await DocMaster.findById(req.params.id);
    if (!doc_master) {
      return resp.status(404).json({ error: "Doc Master not found" });
    }
    resp.status(200).json(doc_master);
  } catch (err) {
    resp.status(400).json({ error: err.message });
  }
};

exports.updateDocMaster = async (req, resp) => {
  try {
    const doc_master = await DocMaster.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    logger.info(
      `Doc Master updated successfully: ${JSON.stringify({
        name: doc_master.name,
        slug: doc_master.slug,
      })}`,
      { code: "200" }
    );
    resp.status(200).json(doc_master);
  } catch (err) {
    logger.error(`Doc Master update failed: ${err.message}`, { code: "500" });
    resp.status(400).json({ error: err.message });
  }
};

exports.statusDocMaster = async (req, resp) => {
  try {
    const doc_master = await DocMaster.findById(req.params.id);
    if (!doc_master) {
      return resp.status(404).json({ error: "Doc Master not found" });
    }
    doc_master.status = doc_master.status === "1" ? "0" : "1";
    await doc_master.save();
    resp.json({ message: "Status updated", status: doc_master.status });
  } catch (error) {
    resp.status(500).json({ error: "Server error" });
  }
};

exports.deleteDocMaster = async (req, resp) => {
  try {
    await DocMaster.findByIdAndDelete(req.params.id);
    logger.info(
      `Doc Master deleted successfully: ${JSON.stringify({
        id: req.params.id,
      })}`,
      { code: "200" }
    );
    resp.status(200).json({ message: "Doc Master deleted successfully" });
  } catch (err) {
    logger.error(`Doc Master deletion failed: ${err.message}`, { code: "500" });
    resp.status(400).json({ error: err.message });
  }
};
