import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function MainNavMenu() {

    return (
        <>
            <div className="bg-primary-main">
                <nav className="navbar navbar-expand-lg border-bottom" aria-label="Eleventh navbar example" style={{ backgroundColor: "#022759;" }}>
                    <div className="container">
                        <button className="navbar-toggler text-bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample09" aria-controls="navbarsExample09" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarsExample09">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-white gap-4 sm:gap-4 md:gap-3 xs:gap-2">
                                <li className="nav-item ">
                                    <Link className="nav-link active text-white" aria-current="page" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-white" to="/about-us">About Us</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-white" to="/user-manual">User Manual</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-white" to="/contact-us" >Contact Us</Link>
                                </li>
                            </ul>

                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-2">
                                <li className="nav-item dropdown">
                                    <button className="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Register
                                    </button>
                                    <ul className="dropdown-menu text-white" aria-labelledby="dropdownRegister" style={{ backgroundColor: "#022759", }}>
                                        <li className="text-hover"><Link className="dropdown-item text-white py-2" to="imp-exp/register">Importer/Exporter</Link></li>
                                    </ul>
                                </li>

                                <li className="nav-item dropdown ">
                                    <button className="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Login
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownLogin" style={{ backgroundColor: "#022759", }}>
                                        <li className="text-white"><Link className="dropdown-item text-white border-top border-bottom py-2" to="/imp-exp/login">Import/Export Login</Link></li>
                                        <li className="text-white"><Link className="dropdown-item text-white border-bottom py-2" to="icmr/login">Icmr Officers</Link></li>
                                        <li className="text-white"><Link className="dropdown-item text-white py-2" to="committee/login">Committee Login</Link></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
}

export default MainNavMenu;
