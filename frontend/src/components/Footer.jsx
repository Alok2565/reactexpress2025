import React from 'react';
import NicLogo from "../assets/images/NIC-logo.svg"
import Digital from "../assets/images/Digital.svg"
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <>
            <footer className="footer" style={{ backgroundColor: "#10151f" }}>
                <section className="py-2 py-xl-8 border-top border-light">
                    <div className="container overflow-hidden">
                        <div className="row gy-4 gy-lg-0">
                            <div className="col-12">
                                <p className="text-white text-center mt-2">
                                    <span style={{ fontSize: "20px" }}>Disclaimer: </span>
                                    <span style={{ fontSize: "17px" }}>
                                        Prior to use, please ensure that your systems are equipped with anti-virus software for added security.
                                    </span>
                                </p>
                                <ul className="footerLogo d-flex justify-content-center p-0" style={{ listStyle: "none" }}>
                                    <li className="mx-3">
                                        <a href="javascrip:void(0)">
                                            <img src={NicLogo} className="img-fluid" alt="NIC Logo" />
                                        </a>
                                    </li>
                                    <li className="mx-3">
                                        <a href="javascrip:void(0)">
                                            <img src={Digital} className="img-fluid" alt="Digital India Logo" />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="py-2 border-top border-light-subtle">
                    <div className="container overflow-hidden">
                        <div className="row gy-md-0 align-items-md-center">
                            <div className="col-12 text-center">
                                <p className="copyright-text text-white" style={{ fontSize: "14px" }}>
                                    Website contents are being maintained by Ministry of Health and Family Welfare, Government of India.
                                    Website has been designed, developed, maintained and hosted by
                                    <Link className="text-primary-link" to="https://www.nic.in/" target="_blank" rel="noopener noreferrer"
                                        style={{ textDecoration: "none", color: "#2584C6" }}> National Informatics Centre (NIC) </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
export default Footer;
