import React from "react";
import Slider1 from "../assets/images/slider/ajadi_banner.jpg";
import Slider2 from "../assets/images/slider/sabka_banner.jpg";
import Slider3 from "../assets/images/slider/mann_kibaat.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function HomeSlider() {
    return (
        <div className="slider-wrapper">
            <div
                id="carouselExampleFade"
                className="carousel slide carousel-fade"
                data-bs-ride="carousel"
                data-bs-interval="3000"
            >
                {/* Dots (Indicators) */}
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleFade" data-bs-slide-to="0" className="active text-primary" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleFade" data-bs-slide-to="1" aria-label="Slide 2 text-primary"></button>
                    <button type="button" data-bs-target="#carouselExampleFade" data-bs-slide-to="2" aria-label="Slide 3 text-primary"></button>
                </div>

                {/* Slider Items */}
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={Slider1} className="d-block w-100" alt="Slider 1" />
                    </div>
                    <div className="carousel-item">
                        <img src={Slider2} className="d-block w-100" alt="Slider 2" />
                    </div>
                    <div className="carousel-item">
                        <img src={Slider3} className="d-block w-100" alt="Slider 3" />
                    </div>
                </div>
                {/* Previous & Next Buttons */}
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
}

export default HomeSlider;
