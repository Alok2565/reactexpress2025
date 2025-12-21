// const ExporterApplication = require("../models/RequestNocApplication");
// const logger = require("../utils/logger");
// const fs = require("fs");
// const path = require("path");

// exports.createExporterApplication = async (req, resp) => {
//   try {
//     const fileName = req.file ? req.file.filename : null;

//     // const banner_slider = new NocApplication({
//     //   name: req.body.name,
//     //   slug: req.body.slug,
//     //   banner_link: req.body.banner_link,
//     //   description: req.body.description,
//     //   image: fileName,
//     //   ip_address: req.ip
//     // });
//     const exporter_application = new ExporterApplication(req.body);

//     await exporter_application.save();

//     // logger.info(
//     //   `Noc Request created successfully: ${JSON.stringify({ name: banner_slider.name, slug: banner_slider.slug })}`,
//     //   { code: '201' }
//     // );

//     resp.status(201).json(exporter_application);
//   } catch (err) {
//     logger.error(`Noc Request creation failed: ${err.message}`, { code: '500' });
//     resp.status(400).json({ error: err.message });
//   }
// };


const ExporterApplication = require("../models/RequestNocApplication");
const logger = require("../utils/logger");
const fs = require("fs");
const path = require("path");

exports.createExporterApplication = async (req, resp) => {
  try {
    const fileName = req.file ? req.file.filename : null;

    const exporter_application = new ExporterApplication({
      ...req.body,
      image: fileName, // in case image field needed
    });

    await exporter_application.save();

    resp.status(201).json(exporter_application);
  } catch (err) {
    logger.error(`Noc Request creation failed: ${err.message}`, { code: '500' });
    resp.status(400).json({ error: err.message });
  }
};
