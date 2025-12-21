// // const express = require("express");
// // const router = express.Router();
// // const { createBannerSlider, getBannerSlidersData, getBannerSliderById, updateBannerSlider, deleteBannerSlider, statusBannerSlider } = require("../controllers/HomeBannerSliderController");

// // router.post("/", createBannerSlider);
// // router.get("/", getBannerSlidersData);
// // router.get("/:id", getBannerSliderById);
// // router.put("/update/:id", updateBannerSlider);
// // router.delete("/delete/:id", deleteBannerSlider);
// // router.put('/status/:id', statusBannerSlider);

// // module.exports = router;

// const express = require("express");
// const router = express.Router();
// const upload = require("../middlewares/uploadBanner");
// const {
// createExporterApplication
// //   getBannerSlidersData,
// //   getBannerSliderById,
// //   updateBannerSlider,
// //   deleteBannerSlider,
//   //statusBannerSlider
// } = require("../controllers/RequestNocAppController");
// router.post("/", upload.single("image"), createExporterApplication); // ⬅ file upload here
// // router.put('/update/:id', upload.single('image'), updateBannerSlider)
// // router.get("/", getBannerSlidersData);
// // router.get("/:id", getBannerSliderById);
// // // router.put("/update/:id", updateBannerSlider);
// // router.delete("/delete/:id", deleteBannerSlider);
// // router.put("/status/:id", statusBannerSlider);

// module.exports = router;

const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadBanner");

const {
  createExporterApplication
} = require("../controllers/RequestNocAppController");

// Ensure the controller is correctly imported
console.log("createExporterApplication loaded?", typeof createExporterApplication); // should log 'function'

router.post("/", upload.single("image"), createExporterApplication);

// Uncomment if needed later
// router.put('/update/:id', upload.single('image'), updateBannerSlider)
// router.get("/", getBannerSlidersData);
// router.get("/:id", getBannerSliderById);
// router.delete("/delete/:id", deleteBannerSlider);
// router.put("/status/:id", statusBannerSlider);

module.exports = router;

