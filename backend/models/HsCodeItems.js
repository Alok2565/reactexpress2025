const mongoose = require("mongoose");

const HsCodeItemSchema = new mongoose.Schema({
    hs_code: { type: String, required: true, unique: true },
    description: { type: String, required: true},
    status: { type: String, enum: ['0', '1'], default: '1' }
}, {
    timestamps: true
});

module.exports = mongoose.model("Hs_Code_Item", HsCodeItemSchema);
