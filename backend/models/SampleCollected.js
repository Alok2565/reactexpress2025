const mongoose = require("mongoose");

const SampleCollectSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    status: { type: String, enum: ['0', '1'], default: '1' }
}, {
    timestamps: true
});

module.exports = mongoose.model("Sample_Collect", SampleCollectSchema);
