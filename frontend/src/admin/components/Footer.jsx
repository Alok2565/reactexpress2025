import React from 'react'
import { Link } from "react-router-dom";
function Footer() {
    return (
        <>
            <footer className="bg-white text-gray text-start p-2" style={{ borderTop: "1px solid #ddd" }}>
                <p>{new Date().getFullYear()}. © Designed and Developed by <Link to="https://www.nic.in/" target="_blank">National Informatics Centre (NIC)</Link>.</p>
            </footer>
        </>
    )
}
export default Footer
