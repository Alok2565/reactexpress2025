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
const bodyParser = require("body-parser");
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use("/api/roles", require("./routes/roleRoutes"));
app.use("/api/users", require("./routes/UserRoutes"));
app.use("/api/login", require("./routes/loginRoutes"));
app.use("/api/password-setup", require("./routes/passwordRoutes"));


app.use("/api/committee", require("./routes/committeeRoutes"));
app.use("/api/icmr", require("./routes/icmrRoutes"));

// app.get('/logout', (req, res) => {
//     req.session.destroy(err => {
//         if (err) return res.status(500).json({ message: "Logout failed" });
//         res.clearCookie('connect.sid');
//         res.json({ message: "Logged out successfully" });
//     });
// });
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

