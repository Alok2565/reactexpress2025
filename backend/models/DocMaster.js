const mongoose = require("mongoose");

const docMasterSchema = new mongoose.Schema({
    doc_id: { type: String, required: true, primary: true },
    doc_type: { type: String, required: true, unique: true },
    description: { type: String, required: true,},
    status: { type: String, enum: ['0', '1'], default: '1' }
}, {
    timestamps: true
});

module.exports = mongoose.model("Doc_Master", docMasterSchema);
