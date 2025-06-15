const BannerSlider = require("../models/HomeBannerSlider");
const logger = require("../utils/logger");
const fs = require("fs");
const path = require("path");

exports.createBannerSlider = async (req, resp) => {
  try {
    const fileName = req.file ? req.file.filename : null;

    const banner_slider = new BannerSlider({
      name: req.body.name,
      slug: req.body.slug,
      banner_link: req.body.banner_link,
      description: req.body.description,
      image: fileName,
      ip_address: req.ip
    });

    await banner_slider.save();

    logger.info(
      `Home Banner Slider created successfully: ${JSON.stringify({ name: banner_slider.name, slug: banner_slider.slug })}`,
      { code: '201' }
    );

    resp.status(201).json(banner_slider);
  } catch (err) {
    logger.error(`Home Banner Slider creation failed: ${err.message}`, { code: '500' });
    resp.status(400).json({ error: err.message });
  }
};

exports.getBannerSlidersData = async (req, resp) => {
    try {
        const banner_sliders = await BannerSlider.find().sort({ createdAt: -1 });
        logger.info(
            `Home Banner Slider fetched successfully: ${JSON.stringify({ BannerSlider })}`,
            { code: 201 }
        );
        resp.status(200).json(banner_sliders);
    } catch (err) {
        logger.error(`Home Banner Slider fetched failed: ${err.message}`);
        resp.status(500).json({ error: err.message });
    }
};
exports.getBannerSliderById = async (req, resp) => {
    try {
        const banner_slider = await BannerSlider.findById(req.params.id);
        if (!banner_slider) {
            return resp.status(404).json({ error: "Home Banner Slider not found" });
        }
        resp.status(200).json(banner_slider);
    } catch (err) {
        resp.status(400).json({ error: err.message });
    }
};
// exports.updateBannerSlider = async (req, resp) => {
//     try {
//         const banner_slider = await BannerSlider.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         logger.info(`Home Banner Slider updated successfully: ${JSON.stringify({ name: banner_slider.name, slug: banner_slider.slug })}`, { code: '200' });
//         resp.status(200).json(banner_slider);
//     } catch (err) {
//         logger.error(`Home Banner Slider update failed: ${err.message}`, { code: '500' });
//         resp.status(400).json({ error: err.message });
//     }
// };
exports.updateBannerSlider = async (req, resp) => {
    try {
        const bannerSlider = await BannerSlider.findById(req.params.id);
        if (!bannerSlider) {
            return resp.status(404).json({ error: "Banner slider not found" });
        }

        // Update fields
        bannerSlider.name = req.body.name || bannerSlider.name;
        bannerSlider.slug = req.body.slug || bannerSlider.slug;
        bannerSlider.banner_link = req.body.banner_link || bannerSlider.banner_link;
        bannerSlider.description = req.body.description || bannerSlider.description;

        // Handle new image upload
        if (req.file) {
            // Optional: remove old image file
            if (bannerSlider.image) {
                const oldImagePath = path.join(__dirname, "..", "uploads", "banner_sliders", bannerSlider.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }

            bannerSlider.image = req.file.filename;
        }

        const updatedBanner = await bannerSlider.save();
        logger.info(`Home Banner Slider updated successfully: ${JSON.stringify({ name: updatedBanner.name, slug: updatedBanner.slug })}`, { code: '200' });

        resp.status(200).json(updatedBanner);
    } catch (err) {
        logger.error(`Home Banner Slider update failed: ${err.message}`, { code: '500' });
        resp.status(400).json({ error: err.message });
    }
};
exports.statusBannerSlider = async (req, resp) => {
    try {
        const banner_slider = await BannerSlider.findById(req.params.id);
        if (!banner_slider) {
            return resp.status(404).json({ error: 'Home Banner Slider not found' });
        }
        // Toggle string status
        banner_slider.status = banner_slider.status === '1' ? '0' : '1';
        await banner_slider.save();

        resp.json({ message: 'Status updated', status: banner_slider.status });
    } catch (error) {
        resp.status(500).json({ error: 'Server error' });
    }
};

exports.deleteBannerSlider = async (req, resp) => {
    try {
        await BannerSlider.findByIdAndDelete(req.params.id);
        logger.info(`Home Banner Slider deleted successfully: ${JSON.stringify({ name: req.params.id })}`,
            { code: '200' });
        resp.status(200).json({ message: 'Home Banner Slider deleted successfully' });
    } catch (err) {
        logger.error(`Home Banner Slider deletion failed: ${err.message}`, { code: '500' });
        resp.status(400).json({ error: err.message });
    }
};
