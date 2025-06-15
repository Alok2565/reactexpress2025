const mongoose = require("mongoose");

const BannerSliderSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    sparse: true,
  },
  slug: {
    type: String,
    unique: true,
    required: true,
    sparse: true,
  },
  banner_link: {
    type: String,
    sparse: true,
  },
  description: {
    type: String,
    required: true,
    sparse: true,
  },
  
  image: {
    type: String,
    required: true,
    sparse: true,
  },
  ip_address: {
    type: String,
    default: null,
    sparse: true,
  },
  status: { 
    type: String, 
    enum: ['0', '1'], 
    default: '1' }
}, {
  timestamps: true
});

module.exports = mongoose.model("Banner_Slider", BannerSliderSchema);
