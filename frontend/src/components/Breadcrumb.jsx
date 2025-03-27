import React from 'react';
import { Link } from 'react-router-dom';


function Breadcrumb(props) {
    return (
        <>

            <div className="breadcrumb-section bg-light">
                <div className="container py-2">
                    <nav
                        style={{ "--bs-breadcrumb-divider": "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='currentColor'/%3E%3C/svg%3E\")" }}
                        aria-label="breadcrumb"
                    >
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link href="/" style={{ fontWeight: "700", textDecoration: "none" }}>Home</Link></li>
                            <li className="breadcrumb-item active" aria-current="page" style={{ color: " #022759", fontWeight: "700" }}>{props.title}</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </>
    );
}
export default Breadcrumb
