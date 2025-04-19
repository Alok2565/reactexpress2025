const express = require('express');
const router = express.Router();
const {
  createImporterExporter,
  getImporterExporter,
} = require('../controllers/ImpExpRegisterController');

router.post('/', createImporterExporter);
router.get('/', getImporterExporter);

module.exports = router;
