// const express = require('express');
// const app = express();
// require('dotenv').config();
// const connectDB = require('./config/DbConnect');
// const cors = require('cors');

// const roleRoutes = require('./routes/RoleRoutes');
// const userRoutes = require('./routes/UserRoutes');

// connectDB();
// app.use(cors());
// app.use(express.json());

// // Routes
// // app.use('/api/roles', require('./routes/RoleRoutes'));
// // app.use('/api/users', require('./routes/UserRoutes'));
// app.use('/api/roles', roleRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/auth', require('./routes/LoginRoutes'));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/DbConnect");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/roles", require("./routes/roleRoutes"));
app.use("/api/users", require("./routes/UserRoutes"));
app.use("/api", require("./routes/loginRoutes"));
app.use("/api/password-setup", require("./routes/passwordRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

