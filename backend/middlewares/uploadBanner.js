const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Upload path
const uploadPath = path.join(__dirname, '..', 'uploads', 'banner_sliders');
//const uploadPath = path.join('D:', 'uploads', 'banner_sliders');
//console.log(uploadPath);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true, mode: 0o755 });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, fileName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, PNG, or WEBP files allowed'), false);
  }
};

module.exports = multer({ storage, fileFilter });



// middlewares/uploadBanner.js

// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// require('dotenv').config(); // Load environment variables

// // Get dynamic values from .env
// const drive = process.env.UPLOAD_DRIVE || 'D:';
// const folder = process.env.UPLOAD_FOLDER || 'uploads/banner_sliders';

// // Full path: D:/uploads/banner_sliders
// const uploadPath = path.join(drive, folder);

// // Ensure the directory exists
// if (!fs.existsSync(uploadPath)) {
//   fs.mkdirSync(uploadPath, { recursive: true });
// }

// // Multer disk storage setup
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadPath);
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     const ext = path.extname(file.originalname);
//     cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
//   }
// });

// // Export the upload middleware
// const upload = multer({ storage });
// module.exports = upload;
