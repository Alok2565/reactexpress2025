import React from 'react';
import { Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaUserTie, FaLock } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import "../pages/style/custom.css";
function Header() {
    return (
        <>
            <section className="admin-header d-flex justify-content-between align-items-center">
                <Container fluid className="d-flex">
                    <header className="p-3 flex-grow-1">
                        <div className="project-heading text-center">
                            <h4 className="title-head" style={{ color: "#000000", fontWeight: "600" }}>Transfer of Human Biological Material (THBM)</h4>
                        </div>
                    </header>
                    <div className="header-right d-flex align-items-center">
                        <Nav className="bg-light">
                            <NavDropdown className="text-dark"
                                title={
                                    <span className="d-flex align-items-center gap-5 text-dark">Welcome
                                        <span className="d-flex align-items-center gap-2">
                                            <span className="d-none d-md-inline text-dark">Admin</span>
                                            <FaUserCircle size={28} className="me-2 text-dark" />

                                        </span>
                                    </span>
                                }
                                id="user-dropdown"
                                align="end"
                            >
                                <NavDropdown.Item as={Link} to="admin/profile" className="w-100 py-3">
                                    <span><FaUserTie />  Profile</span>
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="#">
                                    <span><FaLock />  Chnage Password</span>
                                </NavDropdown.Item>

                                <NavDropdown.Divider />
                                <NavDropdown.Item as={Link} to="/logout">
                                    <span><IoLogOut /> Logout</span>
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </div>
                </Container>
            </section>
        </>
    );
}
export default Header;
