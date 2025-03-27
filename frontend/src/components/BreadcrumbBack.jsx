import React from 'react'
import Bgbredcrumb from "../assets/images/bg-bredcrumb.jpg"

function BreadcrumbBack(props) {
    return (
        <>
            <div>
                <section className="section position-relative"
                    style={{
                        backgroundImage: `url(${Bgbredcrumb})`, // Ensure Bgbredcrumb is a valid image URL or imported variable
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        display: "flex",
                        alignItems: "center"
                    }}>
                    {/* Overlay to prevent blur on text */}
                    <div
                        className="container position-absolute top-0 start-0 w-100 h-100"
                        style={{ backdropFilter: "blur(3px)", backgroundColor: "rgba(0, 0, 0, 0.2)" }}
                    ></div>
                    {/* Content */}
                    <div className="container-fluid position-relative">
                        <div className="page-title-box">
                            <div className="page-title">
                                <nav className="p-5">
                                    <h1 className="font-weight-bold" style={{ color: " #022759", fontWeight: "700" }}>{props.title}</h1>
                                </nav>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default BreadcrumbBack
