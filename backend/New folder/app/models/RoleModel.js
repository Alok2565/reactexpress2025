const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 50
  },
  slug: {
    type: String,
    unique: true,
    trim: true,
    match: [/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers and hyphens']
  }
});

// Auto-generate slug from name if not provided
roleSchema.pre('save', function(next) {
  if (!this.slug && this.name) {
    this.slug = this.name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  }
  next();
});

module.exports = mongoose.model('Roles', roleSchema);
