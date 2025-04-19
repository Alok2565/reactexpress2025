// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./app/config/DbConnection');
const roleRoutes = require('./routes/RoleRoutes');
//const seedRoles = require('./migrations/seedRoles');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/roles', roleRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  // seedRoles(); // Uncomment to run migration once
});
