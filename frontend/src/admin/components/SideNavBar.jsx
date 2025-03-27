import React, { useState, useEffect } from 'react';
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarHeader,
    CDBSidebarMenu
} from 'cdbreact';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AiFillDashboard } from "react-icons/ai";
import { Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FaUser, FaFileExport, FaBars, FaFileDownload, FaChartArea } from 'react-icons/fa';
import { LiaFileExportSolid } from "react-icons/lia";
import "../pages/style/sidenav.css";
import admin_side_logo from "../../assets/images/dhrlogo.png";

function SideNavBar() {
    const [openMenu, setOpenMenu] = useState(null);
    const [collapsed, setCollapsed] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const location = useLocation(); // 🔹 Get current URL

    // Determine role based on URL
    const userRole = location.pathname.startsWith("/admin")
        ? "admin"
        : location.pathname.startsWith("/imp-exp")
            ? "imp-exp"
            : location.pathname.startsWith("/icmr")
                ? "icmr"
                : location.pathname.startsWith("/committee")
                    ? "committee"
                    : "guest";

    // Handle Window Resize
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Load Sidebar Collapse State
    useEffect(() => {
        const storedState = localStorage.getItem("sidebar-collapsed");
        if (storedState !== null) {
            setCollapsed(JSON.parse(storedState));
        }
    }, []);
    // Auto-collapse sidebar on mobile
    useEffect(() => {
        if (isMobile) {
            setCollapsed(true);
        }
    }, [isMobile]);

    const handleMenuClick = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };

    const toggleSidebar = () => {
        setCollapsed((prev) => {
            const newState = !prev;
            localStorage.setItem("sidebar-collapsed", JSON.stringify(newState));
            return newState;
        });
    };

    return (
        <div className="sidebar-container">
            <CDBSidebar
                className="sidebar"
                collapsed={collapsed}
                style={{ backgroundColor: "#111C43" }}
            >
                <CDBSidebarHeader prefix={<FaBars onClick={toggleSidebar} style={{ cursor: 'pointer', backgroundColor: "#111C43" }} />} >

                    {!collapsed && (
                        <Link to="/" className="sidebar-header text-white text-decoration-none">
                            <img src={admin_side_logo} alt="THBM" style={{ width: '150px', height: "100", backgroundColor: "#fff" }} />
                        </Link>
                    )}
                    {collapsed && (
                        <Link to="/" className="sidebar-header text-white text-decoration-none">
                            <img src={admin_side_logo} alt="THBM" style={{ width: '150px', height: "100", backgroundColor: "#fff" }} />
                        </Link>
                    )}
                </CDBSidebarHeader>

                <CDBSidebarContent className="sidebar-content">
                    <Menu>
                        {/* Admin Sidebar */}
                        {userRole === "admin" && (
                            <>      <MenuItem component={<NavLink to="/admin/dashboard" />} icon={<AiFillDashboard />} className="menu-item">
                                Dashboard
                            </MenuItem>

                                <SubMenu
                                    icon={<FaUser />}
                                    label="Profile"
                                    className="submenu-custom"
                                    open={openMenu === "profile"}
                                    onClick={() => handleMenuClick("profile")}
                                >
                                    <MenuItem className="submenu-item">
                                        <Link to="/admin/profile" className="submenu-link">Profile Settings</Link>
                                    </MenuItem>
                                </SubMenu>

                                <SubMenu
                                    icon={<FaFileExport />}
                                    label="Export Application Form"
                                    className="submenu-custom"
                                    open={openMenu === "export"}
                                    onClick={() => handleMenuClick("export")}
                                >
                                    <MenuItem className="submenu-item">
                                        <Link to="#" className="submenu-link"><LiaFileExportSolid /> Apply for New NOC</Link>
                                    </MenuItem>
                                    <MenuItem className="submenu-item">
                                        <Link to="/imp-exp/exporter" className="submenu-link"><LiaFileExportSolid /> Applications under review</Link>
                                    </MenuItem>
                                    <MenuItem className="submenu-item">
                                        <Link to="#" className="submenu-link"><LiaFileExportSolid /> Decision on Submitted <br /> Applications</Link>
                                    </MenuItem>
                                    <MenuItem className="submenu-item">
                                        <Link to="#" className="submenu-link"><LiaFileExportSolid /> Reject Applications</Link>
                                    </MenuItem>
                                    <MenuItem className="submenu-item">
                                        <Link to="#" className="submenu-link"><LiaFileExportSolid /> Draft Applications</Link>
                                    </MenuItem>
                                </SubMenu>

                                <MenuItem component={<NavLink to="" />} icon={<FaFileDownload />} className="menu-item">
                                    <span className="menu-text">Format for Declaration <br /> of Recipient</span>
                                </MenuItem>

                                <SubMenu
                                    icon={<FaChartArea />}
                                    label="Decision"
                                    className="submenu-custom"
                                    open={openMenu === "decision"}
                                    onClick={() => handleMenuClick("decision")}>
                                    <MenuItem className="submenu-item">
                                        <Link to="#" className="submenu-link"><LiaFileExportSolid /> Exporter NOC</Link>
                                    </MenuItem>
                                    <MenuItem className="submenu-item">
                                        <Link to="/imp-exp/exporter" className="submenu-link"><LiaFileExportSolid /> Importer NOC</Link>
                                    </MenuItem>
                                </SubMenu>
                                <SubMenu
                                    icon={<FaChartArea />}
                                    label="Decision"
                                    className="submenu-custom"
                                    open={openMenu === "decision"}
                                    onClick={() => handleMenuClick("decision")}>
                                    <MenuItem className="submenu-item">
                                        <Link to="#" className="submenu-link"><LiaFileExportSolid /> Exporter NOC</Link>
                                    </MenuItem>
                                    <MenuItem className="submenu-item">
                                        <Link to="/imp-exp/exporter" className="submenu-link"><LiaFileExportSolid /> Importer NOC</Link>
                                    </MenuItem>
                                </SubMenu>
                                <SubMenu
                                    icon={<FaChartArea />}
                                    label="Decision"
                                    className="submenu-custom"
                                    open={openMenu === "decision"}
                                    onClick={() => handleMenuClick("decision")}>
                                    <MenuItem className="submenu-item">
                                        <Link to="#" className="submenu-link"><LiaFileExportSolid /> Exporter NOC</Link>
                                    </MenuItem>
                                    <MenuItem className="submenu-item">
                                        <Link to="/imp-exp/exporter" className="submenu-link"><LiaFileExportSolid /> Importer NOC</Link>
                                    </MenuItem>
                                </SubMenu>
                                <SubMenu
                                    icon={<FaChartArea />}
                                    label="Decision"
                                    className="submenu-custom"
                                    open={openMenu === "decision"}
                                    onClick={() => handleMenuClick("decision")}>
                                    <MenuItem className="submenu-item">
                                        <Link to="#" className="submenu-link"><LiaFileExportSolid /> Exporter NOC</Link>
                                    </MenuItem>
                                    <MenuItem className="submenu-item">
                                        <Link to="/imp-exp/exporter" className="submenu-link"><LiaFileExportSolid /> Importer NOC</Link>
                                    </MenuItem>
                                </SubMenu>
                                <SubMenu
                                    icon={<FaChartArea />}
                                    label="Decision"
                                    className="submenu-custom"
                                    open={openMenu === "decision"}
                                    onClick={() => handleMenuClick("decision")}>
                                    <MenuItem className="submenu-item">
                                        <Link to="#" className="submenu-link"><LiaFileExportSolid /> Exporter NOC</Link>
                                    </MenuItem>
                                    <MenuItem className="submenu-item">
                                        <Link to="/imp-exp/exporter" className="submenu-link"><LiaFileExportSolid /> Importer NOC</Link>
                                    </MenuItem>
                                </SubMenu>
                                <SubMenu
                                    icon={<FaChartArea />}
                                    label="Decision"
                                    className="submenu-custom"
                                    open={openMenu === "decision"}
                                    onClick={() => handleMenuClick("decision")}>
                                    <MenuItem className="submenu-item">
                                        <Link to="#" className="submenu-link"><LiaFileExportSolid /> Exporter NOC</Link>
                                    </MenuItem>
                                    <MenuItem className="submenu-item">
                                        <Link to="/imp-exp/exporter" className="submenu-link"><LiaFileExportSolid /> Importer NOC</Link>
                                    </MenuItem>
                                </SubMenu>
                                <SubMenu
                                    icon={<FaChartArea />}
                                    label="Decision"
                                    className="submenu-custom"
                                    open={openMenu === "decision"}
                                    onClick={() => handleMenuClick("decision")}>
                                    <MenuItem className="submenu-item">
                                        <Link to="#" className="submenu-link"><LiaFileExportSolid /> Exporter NOC</Link>
                                    </MenuItem>
                                    <MenuItem className="submenu-item">
                                        <Link to="/imp-exp/exporter" className="submenu-link"><LiaFileExportSolid /> Importer NOC</Link>
                                    </MenuItem>
                                </SubMenu>
                                <SubMenu
                                    icon={<FaChartArea />}
                                    label="Decision"
                                    className="submenu-custom"
                                    open={openMenu === "decision"}
                                    onClick={() => handleMenuClick("decision")}>
                                    <MenuItem className="submenu-item">
                                        <Link to="#" className="submenu-link"><LiaFileExportSolid /> Exporter NOC</Link>
                                    </MenuItem>
                                    <MenuItem className="submenu-item">
                                        <Link to="/imp-exp/exporter" className="submenu-link"><LiaFileExportSolid /> Importer NOC</Link>
                                    </MenuItem>
                                </SubMenu>
                                <SubMenu
                                    icon={<FaChartArea />}
                                    label="Decision"
                                    className="submenu-custom"
                                    open={openMenu === "decision"}
                                    onClick={() => handleMenuClick("decision")}>
                                    <MenuItem className="submenu-item">
                                        <Link to="#" className="submenu-link"><LiaFileExportSolid /> Exporter NOC</Link>
                                    </MenuItem>
                                    <MenuItem className="submenu-item">
                                        <Link to="/imp-exp/exporter" className="submenu-link"><LiaFileExportSolid /> Importer NOC</Link>
                                    </MenuItem>
                                </SubMenu>
                                <SubMenu
                                    icon={<FaChartArea />}
                                    label="Decision"
                                    className="submenu-custom"
                                    open={openMenu === "decision"}
                                    onClick={() => handleMenuClick("decision")}>
                                    <MenuItem className="submenu-item">
                                        <Link to="#" className="submenu-link"><LiaFileExportSolid /> Exporter NOC</Link>
                                    </MenuItem>
                                    <MenuItem className="submenu-item">
                                        <Link to="/imp-exp/exporter" className="submenu-link"><LiaFileExportSolid /> Importer NOC</Link>
                                    </MenuItem>
                                </SubMenu>
                            </>
                        )}
                        {/*User Sidebar IMP EXP*/}
                        {userRole === "imp-exp" && (
                            <>
                                <MenuItem component={<NavLink to="/imp-exp/dashboard" />} icon={<AiFillDashboard />} className="menu-item">
                                    Dashboard
                                </MenuItem>
                                <SubMenu
                                    icon={<FaUser />}
                                    label="Profile"
                                    className="submenu-custom"
                                    open={openMenu === "profile"}
                                    onClick={() => handleMenuClick("profile")}
                                >
                                    <MenuItem className="submenu-item">
                                        <Link to="/admin/profile" className="submenu-link">Profile Settings</Link>
                                    </MenuItem>
                                </SubMenu>

                                <SubMenu
                                    icon={<FaFileExport />}
                                    label="Export Applications"
                                    className="submenu-custom"
                                    open={openMenu === "export"}
                                    onClick={() => handleMenuClick("export")}
                                >
                                    <MenuItem className="submenu-item">
                                        <Link to="/imp-exp/add-new" className="submenu-link"><LiaFileExportSolid /> Apply for New NOC</Link>
                                    </MenuItem>
                                    <MenuItem className="submenu-item">
                                        <Link to="#" className="submenu-link"><LiaFileExportSolid />  Applications under review</Link>
                                    </MenuItem>
                                    <MenuItem className="submenu-item">
                                        <Link to="#" className="submenu-link"><LiaFileExportSolid />  Decision on Submitted <br /> &nbsp;&nbsp;&nbsp;Applications</Link>
                                    </MenuItem>
                                    <MenuItem className="submenu-item">
                                        <Link to="#" className="submenu-link"><LiaFileExportSolid /> Reject Applications</Link>
                                    </MenuItem>
                                    <MenuItem className="submenu-item">
                                        <Link to="#" className="submenu-link"><LiaFileExportSolid /> Draft Applications</Link>
                                    </MenuItem>

                                </SubMenu>
                                <MenuItem component={<NavLink to="/admin/dashboard" />} icon={<AiFillDashboard />} className="menu-item">
                                    Format for Declaration <br />&nbsp;&nbsp;of Recipient
                                </MenuItem>
                                <SubMenu
                                    icon={<FaChartArea />}
                                    label="Total NOC Issued"
                                    className="submenu-custom"
                                    open={openMenu === "decision"}
                                    onClick={() => handleMenuClick("decision")}
                                >
                                    <MenuItem className="submenu-item">
                                        <Link to="#" className="submenu-link"><LiaFileExportSolid /> Exporter NOC</Link>
                                    </MenuItem>
                                    <MenuItem className="submenu-item">
                                        <Link to="/imp-exp/exporter" className="submenu-link"><LiaFileExportSolid /> Importer NOC</Link>
                                    </MenuItem>
                                </SubMenu>
                            </>
                        )}

                        {/* User Sidebar ICMR */}
                        {userRole === "icmr" && (
                            <>
                                <SubMenu
                                    icon={<FaUser />}
                                    label="Profile"
                                    className="submenu-custom"
                                    open={openMenu === "profile"}
                                    onClick={() => handleMenuClick("profile")}
                                >
                                    <MenuItem className="submenu-item">
                                        <Link to="/admin/profile" className="submenu-link">Profile Settings</Link>
                                    </MenuItem>
                                </SubMenu>

                                <SubMenu
                                    icon={<FaFileExport />}
                                    label="Export Applications"
                                    className="submenu-custom"
                                    open={openMenu === "export"}
                                    onClick={() => handleMenuClick("export")}
                                >
                                    <MenuItem className="submenu-item">
                                        <Link to="/imp-exp/exporter" className="submenu-link"><LiaFileExportSolid /> Fresh Applications<br /> Received</Link>
                                    </MenuItem>
                                    <MenuItem className="submenu-item">
                                        <Link to="#" className="submenu-link"><LiaFileExportSolid /> Archive Applications <br />Received</Link>
                                    </MenuItem>
                                    <MenuItem className="submenu-item">
                                        <Link to="#" className="submenu-link"><LiaFileExportSolid /> Reject Applications</Link>
                                    </MenuItem>
                                    <MenuItem className="submenu-item">
                                        <Link to="#" className="submenu-link"><LiaFileExportSolid /> Applications With <br />Committee Members</Link>
                                    </MenuItem>
                                    <MenuItem className="submenu-item">
                                        <Link to="#" className="submenu-link"><LiaFileExportSolid /> Exporter NOC Issued</Link>
                                    </MenuItem>
                                </SubMenu>

                                <SubMenu
                                    icon={<FaChartArea />}
                                    label="Total NOC Issued"
                                    className="submenu-custom"
                                    open={openMenu === "decision"}
                                    onClick={() => handleMenuClick("decision")}
                                >
                                    <MenuItem className="submenu-item">
                                        <Link to="#" className="submenu-link"><LiaFileExportSolid /> Exporter NOC</Link>
                                    </MenuItem>
                                    <MenuItem className="submenu-item">
                                        <Link to="/imp-exp/exporter" className="submenu-link"><LiaFileExportSolid /> Importer NOC</Link>
                                    </MenuItem>
                                </SubMenu>
                            </>
                        )}
                    </Menu>
                </CDBSidebarContent>
            </CDBSidebar>
        </div>
    );
}
export default SideNavBar;
