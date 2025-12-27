const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/DbConnect");
const cors = require("cors");
const bodyParser = require("body-parser");
dotenv.config();
connectDB();
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use("/api/roles", require("./routes/roleRoutes"));
app.use("/api/users", require("./routes/UserRoutes"));
app.use("/api/natutalof_biomaterials", require("./routes/NaturalBiomaterialRoutes"));
app.use("/api/hscodes", require("./routes/HsCodeRoutes"));
app.use("/api/samples_collected", require("./routes/SampleCollectedRoutes"));
app.use("/api/samples_collected", require("./routes/SampleCollectedRoutes"));
app.use("/api/quantityof_samples", require("./routes/QuantitySampleRoutes"));
app.use("/api/purposeof_end_uses", require("./routes/purposeofEndUseRoutes"));
app.use("/api/research_analysises", require("./routes/WeatherResearchAnalysisRoutes"));
app.use("/api/samples_storage", require("./routes/PurposeofSampleStorageRoutes"));
app.use("/api/home_sliders", require("./routes/HomeBannerSliderRoutes"));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api", require("./routes/loginRoutes"));
app.use("/api/impexp_login", require("./routes/impexpLoginRoutes"));
app.use("/api/impexp", require("./routes/ImpExpDashboardRoutes"));
app.use("/api/password-setup", require("./routes/passwordRoutes"));
app.use("/api/impexp-password-setup", require("./routes/impexpPasswordRoutes"));



app.use("/api/committee", require("./routes/committeeRoutes"));
app.use("/api/icmr", require("./routes/icmrRoutes"));
app.use("/api/admin", require("./routes/adminDashboardRoutes"));

app.use("/api/importers-exporters", require("./routes/ImpExpRoutes"));

app.use("/api/doc_masters", require("./routes/DocMasterRoutes"));
app.use("/api/exporter_applications",require("./routes/RequestNocRoutes"));


// app.get('/logout', (req, res) => {
//     req.session.destroy(err => {
//         if (err) return res.status(500).json({ message: "Logout failed" });
//         res.clearCookie('connect.sid');
//         res.json({ message: "Logged out successfully" });
//     });
// });
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

