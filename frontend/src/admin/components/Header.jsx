
import React, { useState, useEffect } from 'react';
import { Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaUserTie, FaLock } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import "../pages/style/custom.css";

function Header() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const email = localStorage.getItem("email");
        const name = localStorage.getItem("name");
        const designation = localStorage.getItem("designation");
        const role = localStorage.getItem("role");

        if (email || name || designation || role) {
            setUser({ email, name, designation, role });
        }
    }, []);

    const handleLogout = () => {
        try {
            const userRole = localStorage.getItem("role");

            // Clear localStorage
            localStorage.removeItem("token");
            localStorage.removeItem("email");
            localStorage.removeItem("name");
            localStorage.removeItem("designation");
            localStorage.removeItem("role");

            // Redirect based on role
            switch (userRole) {
                case 'admin':
                    navigate("/admin/login");
                    break;
                case 'icmr':
                    navigate("/icmr/login");
                    break;
                case 'committee':
                    navigate("/committee/login");
                    break;
                case 'imp-exp':
                    navigate("/imp-exp/login");
                    break;
                default:
                    navigate("/");
            }
        } catch (err) {
            console.error('Error during logout process:', err);
        }
    };

    return (
        <section className="admin-header d-flex justify-content-between align-items-center">
            <Container fluid className="d-flex">
                <header className="p-3 flex-grow-1">
                    <div className="project-heading text-center">
                        <h4 className="title-head" style={{ color: "#000000", fontWeight: "600" }}>
                            Transfer of Human Biological Material (THBM)
                        </h4>
                    </div>
                </header>
                <div className="header-right d-flex align-items-center">
                    <Nav className="bg-light">
                        <NavDropdown
                            className="text-dark"
                            title={
                                <span className="d-flex align-items-center gap-5 text-dark">
                                Welcome
                                <span className="d-flex align-items-center gap-2">
                                    <span className="d-none d-md-inline text-dark">
                                    <h5 className="my-0 fw-normal text-success">
                                        {user?.name || 'Loading...'}
                                    </h5>
                                    <h6 className="my-0 fw-normal text-dark">
                                        {user?.designation || 'Loading...'}
                                    </h6>
                                    </span>
                                    <span className="account-user-avatar">
                                    <FaUserCircle size={28} className="me-2 text-dark" />
                                    </span>
                                </span>
                                </span>
                            }
                            id="user-dropdown"
                            align="end"
                            >
                            <NavDropdown.Item as={Link} to="/admin/profile" className="w-100 py-3">
                                <FaUserTie className="me-2" /> Profile
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/change-password">
                                <FaLock className="me-2" /> Change Password
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={handleLogout}>
                                <IoLogOut className="me-2" /> Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </div>
            </Container>
        </section>
    );
}

export default Header;


