const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  role_name: { 
    type: String, 
    required: true, 
    unique: true 
},
role_slug:{
    type:String,
    required:true,
    unique:true
},
statu:{
    type:String,
    default:1,
}
}, {
    timestamps: true

});

module.exports = mongoose.model('Role', roleSchema);
