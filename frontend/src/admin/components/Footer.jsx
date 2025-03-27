import React from 'react'
import { Link } from "react-router-dom";
function Footer() {
    return (
        <>
            <footer className="bg-white text-gray text-start p-2" style={{ borderTop: "1px solid #ddd" }}>
                <p>{new Date().getFullYear()}. © Designed and Developed by <Link to="javascript:void(0)">National Informatics Centre (NIC)</Link>.</p>
            </footer>
        </>
    )
}
export default Footer
