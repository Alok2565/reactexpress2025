const mongoose = require("mongoose");

const PurposeofEndUseSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    status: { type: String, enum: ['0', '1'], default: '1' }
}, {
    timestamps: true
});

module.exports = mongoose.model("Purposeof_End_use", PurposeofEndUseSchema);
