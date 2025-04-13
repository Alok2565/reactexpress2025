const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
}, 
username: { 
    type: String, 
    required: true, 
    unique: true 
},
  email: { 
    type: String, 
    required: true, 
    unique: true 
},
  role_id: { type: mongoose.Schema.Types.ObjectId, 
    ref: 'Role', 
    required: true 
},
  status: { 
    type: String, 
    enum: ['0', '1'], 
    default: '1' 
}
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
