const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  role_name: { type: String, required: true, unique: true },
  role_slug: { type: String, required: true, unique: true },
  status: { type: String, enum: ['0', '1'], default: '1' }
}, {
  timestamps: true
});

module.exports = mongoose.model("Role", roleSchema);
