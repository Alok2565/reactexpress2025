// import React from "react";
// import Slider1 from "../assets/images/slider/ajadi_banner.jpg";
// import Slider2 from "../assets/images/slider/sabka_banner.jpg";
// import Slider3 from "../assets/images/slider/mann_kibaat.jpg";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";

// function HomeSlider() {
//     return (
//         <div className="slider-wrapper">
//             <div
//                 id="carouselExampleFade"
//                 className="carousel slide carousel-fade"
//                 data-bs-ride="carousel"
//                 data-bs-interval="3000"
//             >
//                 {/* Dots (Indicators) */}
//                 <div className="carousel-indicators">
//                     <button type="button" data-bs-target="#carouselExampleFade" data-bs-slide-to="0" className="active text-primary" aria-current="true" aria-label="Slide 1"></button>
//                     <button type="button" data-bs-target="#carouselExampleFade" data-bs-slide-to="1" aria-label="Slide 2 text-primary"></button>
//                     <button type="button" data-bs-target="#carouselExampleFade" data-bs-slide-to="2" aria-label="Slide 3 text-primary"></button>
//                 </div>

//                 {/* Slider Items */}
//                 <div className="carousel-inner">
//                     <div className="carousel-item active">
//                         <img src={Slider1} className="d-block w-100" alt="Slider 1" />
//                     </div>
//                     <div className="carousel-item">
//                         <img src={Slider2} className="d-block w-100" alt="Slider 2" />
//                     </div>
//                     <div className="carousel-item">
//                         <img src={Slider3} className="d-block w-100" alt="Slider 3" />
//                     </div>
//                 </div>
//                 {/* Previous & Next Buttons */}
//                 <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
//                     <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//                     <span className="visually-hidden">Previous</span>
//                 </button>
//                 <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
//                     <span className="carousel-control-next-icon" aria-hidden="true"></span>
//                     <span className="visually-hidden">Next</span>
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default HomeSlider;
import React, { useEffect, useState } from "react";
import axios from "axios";

function HomeSlider() {
    const [banners, setHomeSlider] = useState([]);

    const fetchBannerData = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/home_sliders");
    console.log(response.data); // Debug here
    const activeBanners = response.data.filter(b => b.status == 1);
    setHomeSlider(activeBanners);
  } catch (err) {
    console.error("Error fetching Home Slider:", err);
  }
};

    useEffect(() => {
        fetchBannerData();
    }, []);

    if (banners.length === 0) {
        return null; 
    }

    return (
        <div className="slider-wrapper">
            <div
                id="carouselExampleFade"
                className="carousel slide carousel-fade"
                data-bs-ride="carousel"
                data-bs-interval="3000"
            >
                {/* Dynamic Indicators */}
                <div className="carousel-indicators">
                    {banners.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            data-bs-target="#carouselExampleFade"
                            data-bs-slide-to={index}
                            className={index === 0 ? "active" : ""}
                            aria-current={index === 0 ? "true" : undefined}
                            aria-label={`Slide ${index + 1}`}
                        ></button>
                    ))}
                </div>

                {/* Dynamic Slides */}
                <div className="carousel-inner">
                    {banners.map((banner, index) => (
                        <div
                            key={index}
                            className={`carousel-item ${index === 0 ? "active" : ""}`}
                        >
                            <img
                                src={`http://localhost:5000/uploads/banner_sliders/${banner.image}`}
                                className="d-block w-100"
                                alt={`Slide ${index + 1}`}
                                style={{ objectFit: "cover", maxHeight: "500px" }}
                            />
                        </div>
                    ))}
                </div>

                {/* Navigation Buttons */}
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleFade"
                    data-bs-slide="prev"
                >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleFade"
                    data-bs-slide="next"
                >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
}

export default HomeSlider;
