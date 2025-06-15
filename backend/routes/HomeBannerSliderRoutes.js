// const express = require("express");
// const router = express.Router();
// const { createBannerSlider, getBannerSlidersData, getBannerSliderById, updateBannerSlider, deleteBannerSlider, statusBannerSlider } = require("../controllers/HomeBannerSliderController");

// router.post("/", createBannerSlider);
// router.get("/", getBannerSlidersData);
// router.get("/:id", getBannerSliderById);
// router.put("/update/:id", updateBannerSlider);
// router.delete("/delete/:id", deleteBannerSlider);
// router.put('/status/:id', statusBannerSlider);

// module.exports = router;

const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadBanner");
const {
  createBannerSlider,
  getBannerSlidersData,
  getBannerSliderById,
  updateBannerSlider,
  deleteBannerSlider,
  statusBannerSlider
} = require("../controllers/HomeBannerSliderController");

router.post("/", upload.single("image"), createBannerSlider); // ⬅ file upload here
router.put('/update/:id', upload.single('image'), updateBannerSlider)
router.get("/", getBannerSlidersData);
router.get("/:id", getBannerSliderById);
// router.put("/update/:id", updateBannerSlider);
router.delete("/delete/:id", deleteBannerSlider);
router.put("/status/:id", statusBannerSlider);

module.exports = router;
