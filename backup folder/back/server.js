const express = require('express');
const connectDB = require('./config/DbConncetion');
const cors = require('cors');
require('dotenv').config();
const impExpRoutes = require('./routes/ImporterExporterRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect DB
connectDB();
// Routes
app.use('/api/roles', require('./routes/RoleRoutes'));
app.use('/api/users', require('./routes/UserRoutes'));
app.use('/api/importers-exporters', impExpRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
