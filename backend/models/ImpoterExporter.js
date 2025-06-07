const mongoose = require('mongoose');

const ImpExpSchema = new mongoose.Schema({
  role_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true
    },
  iec_code: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    sparse: true
  },
  name_ofCPerson: {
    type: String,
    required: true,
    sparse: true 
  },
  designation: {
    type: String,
    required: true,
    sparse: true 
  },
  address: {
    type: String,
    required: true,
    sparse: true 
  },
  address2: {
    type: String,
    required: true,
    sparse: true
  },
  city: {
    type: String,
    required: true,
    sparse: true
  },
  state: {
    type: String,
    required: true,
    sparse: true
  },
  pincode: {
    type: String,
    required: true,
    sparse: true
  },
  mobile_number: {
    type: String,
    required: true,
    unique: true,
    sparse: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    sparse: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  ip_address: {
    type: String,
    default: null,
    sparse: true,
  },
  status: {
    type: String,
    enum: ['0', '1'],
    default: '1'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Imp_Exp_Users", ImpExpSchema);
