const express = require('express');
const connectDB = require('./config/DbConncetion');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect DB
connectDB();
// Routes
app.use('/api/roles', require('./routes/RoleRoutes'));
app.use('/api/users', require('./routes/UserRoutes'));
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api/add-role', require('./routes/RoleRoutes'));

// // DB Connection
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => {
//   console.log('MongoDB connected');
//   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// }).catch((err) => {
//   console.error('DB connection error:', err.message);
// });
