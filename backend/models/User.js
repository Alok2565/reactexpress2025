const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  role_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    required: true
  },
  name: {
    type: String,
    required: true,
    sparse: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
    sparse: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    sparse: true,
  },
  designation: {
    type: String,
    required: true,
    sparse: true,
  },
  address: {
    type: String,
    required: true,
    sparse: true,
  },
  mobile_number:{
    type:String,
    required:true,
    sparse:true
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

module.exports = mongoose.model("User", userSchema);
