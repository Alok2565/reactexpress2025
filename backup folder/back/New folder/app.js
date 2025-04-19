// // backend/app.js
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const roleRoutes = require('./routes/RoleRoutes');
// require('dotenv').config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api/roles', roleRoutes);

// // MongoDB Connection
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('Connection error:', err));

// module.exports = app;

// backend/app.js
const express = require('express');
const cors = require('cors');
const roleRoutes = require('./routes/RoleRoutes');
const connectDB = require('./app/config/DbConnection');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/roles', roleRoutes);

module.exports = app;
