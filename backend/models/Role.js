const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  role_name: {
    type: String,
    required: true,
    minlength: 3
  },
  role_slug: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  status: { 
    type: String, 
    enum: ['0', '1'], 
    default: '1' 
}
}, {
  timestamps: true
});

module.exports = mongoose.model('Role', roleSchema);
