import React, { useState, useEffect } from 'react';
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarHeader,

} from 'cdbreact';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AiFillDashboard, AiOutlineMenu } from "react-icons/ai";
import { Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FaUser, FaFileExport, FaBars, FaFileDownload, FaChartArea, FaSlidersH, FaUsers, FaPager, FaFileSignature } from 'react-icons/fa';
import { LiaFileExportSolid, LiaFileImportSolid } from "react-icons/lia";
import { MdDocumentScanner } from "react-icons/md";
import "../pages/style/sidenav.css";
import admin_side_logo from "../../assets/images/dhrlogo.png";
import axios from "axios";

function SideNavBar() {
    const [openMenu, setOpenMenu] = useState(null);
    const [collapsed, setCollapsed] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const location = useLocation(); // 🔹 Get current URL

    const [roles, setRoles] = useState([]);
    const fetchRoles = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/roles");
            setRoles(response.data);
        } catch (err) {
            console.error("Error fetching roles:", err);
        }
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    // const getUserRoleFromPath = (path) => {
    //     if (path.startsWith("/admin")) return "admin";
    //     if (path.startsWith("/imp-exp")) return "imp-exp";
    //     if (path.startsWith("/icmr")) return "icmr";
    //     if (path.startsWith("/committee")) return "committee";
    //     return "guest";
    // };

    const getUserRoleFromPath = (path) => {
        for (const role of roles) {
            if (path.startsWith(`/${role.role_slug}`)) {
                return role.role_slug;
            }
        }
        return "guest";
    };

    const userRole = getUserRoleFromPath(location.pathname);

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

                <CDBSidebarHeader
                    prefix={<FaBars onClick={toggleSidebar} style={{ cursor: 'pointer', backgroundColor: "#111C43" }} />}
                    style={{ position: 'sticky', top: 0, backgroundColor: '#111C43', zIndex: 1000 }}
                >
                    <Link to="/" className="sidebar-header text-white text-decoration-none">
                        <img
                            src={admin_side_logo}
                            alt="THBM"
                            style={{ width: '150px', backgroundColor: "#fff" }}
                        />
                    </Link>
                </CDBSidebarHeader>


                <CDBSidebarContent className="sidebar-content">
                    <Menu>
                        {/* Admin Sidebar */}

                        {userRole === "admin" && (
                            <>
                                <MenuItem component={<NavLink to="/admin/dashboard" />} icon={<AiFillDashboard />} className="menu-item">
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
                                    icon={<FaSlidersH />}
                                    label="Home Banner Slider"
                                    className="submenu-custom"
                                    open={openMenu === "home_slider"}
                                    onClick={() => handleMenuClick("home_slider")}
                                >
                                    <MenuItem className="submenu-item">
                                        <Link to="#" className="submenu-link"><LiaFileExportSolid /> All Home Sliders</Link>
                                    </MenuItem>
                                    <MenuItem className="submenu-item">
                                        <Link to="/imp-exp/exporter" className="submenu-link"><LiaFileExportSolid /> Add New Slider</Link>
                                    </MenuItem>
                                </SubMenu>
                                <SubMenu
                                    icon={<FaUsers />}
                                    label="Users"
                                    className="submenu-custom"
                                    open={openMenu === "users"}
                                    onClick={() => handleMenuClick("users")}
                                >
                                    <MenuItem className="submenu-item">
                                        <Link to="admin/users" className="submenu-link"><LiaFileExportSolid /> All Users</Link>
                                    </MenuItem>
                                    <MenuItem className="submenu-item">
                                        <Link to="/admin/user/add" className="submenu-link"><LiaFileExportSolid /> Add New User</Link>
                                    </MenuItem>
                                </SubMenu>
                                <SubMenu
                                    icon={<FaUsers />}
                                    label="Roles"
                                    className="submenu-custom"
                                    open={openMenu === "roles"}
                                    onClick={() => handleMenuClick("roles")}
                                >
                                    <MenuItem className="submenu-item">
                                        <Link to="/admin/roles" className="submenu-link"><LiaFileExportSolid /> All Roles</Link>
                                    </MenuItem>
                                    <MenuItem className="submenu-item">
                                        <Link to="/admin/role/add" className="submenu-link"><LiaFileExportSolid /> Add New Role</Link>
                                    </MenuItem>
                                </SubMenu>
                                <SubMenu
                                    icon={<FaUsers />}
                                    label="Importer Exporter Holder"
                                    className="submenu-custom"
                                    open={openMenu === "impexp"}
                                    onClick={() => handleMenuClick("impexp")}
                                >
                                    <MenuItem className="submenu-item">
                                        <Link to="admin/impexp-holders" className="submenu-link"><LiaFileExportSolid /> All ImpExp Holders</Link>
                                    </MenuItem>
                                    <MenuItem className="submenu-item">
                                        <Link to="/admin/add-impexp-holder" className="submenu-link"><LiaFileExportSolid /> Add New Importer/exporter</Link>
                                    </MenuItem>
                                </SubMenu>

                                <SubMenu
                                    icon={<FaPager />}
                                    label="Pages"
                                    className="submenu-custom"
                                    open={openMenu === "pages"}
                                    onClick={() => handleMenuClick("pages")}
                                >
                                    <MenuItem className="submenu-item">
                                        <Link to="/imp-exp/exporter" className="submenu-link"><LiaFileExportSolid /> sdfsAll Pages</Link>
                                    </MenuItem>
                                    <MenuItem className="submenu-item">
                                        <Link to="#" className="submenu-link"><LiaFileExportSolid /> Add New Page</Link>
                                    </MenuItem>
                                </SubMenu>
                                <SubMenu
                                    icon={<AiOutlineMenu />}
                                    label="Main Menus"
                                    className="submenu-custom"
                                    open={openMenu === "main_menu"}
                                    onClick={() => handleMenuClick("main_menu")}
                                >
                                    <MenuItem className="submenu-item">
                                        <Link to="/imp-exp/exporter" className="submenu-link"><LiaFileExportSolid /> All Main Manus</Link>
                                    </MenuItem>
                                    <MenuItem className="submenu-item">
                                        <Link to="#" className="submenu-link"><LiaFileExportSolid /> Add New Menus</Link>
                                    </MenuItem>
                                </SubMenu>
                                <MenuItem component={<NavLink to="" />} icon={<FaFileDownload />} className="menu-item">
                                    <span className="menu-text">Format for Declaration <br /> of Recipient</span>
                                </MenuItem>
                                <SubMenu
                                    icon={<MdDocumentScanner />}
                                    label="Document Master"
                                    className="submenu-custom"
                                    open={openMenu === "doc_master"}
                                    onClick={() => handleMenuClick("doc_master")}
                                >
                                    <MenuItem className="submenu-item">
                                        <Link to="/imp-exp/exporter" className="submenu-link"><LiaFileExportSolid /> All Documents</Link>
                                    </MenuItem>
                                    <MenuItem className="submenu-item">
                                        <Link to="#" className="submenu-link"><LiaFileExportSolid /> Add New document</Link>
                                    </MenuItem>
                                </SubMenu>
                                <SubMenu
                                    icon={<LiaFileExportSolid />}
                                    label="Exporter Applications"
                                    className="submenu-custom"
                                    open={openMenu === "exporter"}
                                    onClick={() => handleMenuClick("exporter")}>
                                    <MenuItem className="submenu-item">
                                        <Link to="#" className="submenu-link"><LiaFileExportSolid /> All Exporter Applications</Link>
                                    </MenuItem>
                                    <MenuItem className="submenu-item">
                                        <Link to="/imp-exp/exporter" className="submenu-link"><LiaFileExportSolid /> Apply New NOC Request</Link>
                                    </MenuItem>
                                </SubMenu>
                                <SubMenu
                                    icon={<LiaFileImportSolid />}
                                    label="Importer Applications"
                                    className="submenu-custom"
                                    open={openMenu === "importer"}
                                    onClick={() => handleMenuClick("importer")}>
                                    <MenuItem className="submenu-item">
                                        <Link to="#" className="submenu-link"><LiaFileImportSolid /> All Importer Applications</Link>
                                    </MenuItem>
                                    <MenuItem className="submenu-item">
                                        <Link to="/imp-exp/exporter" className="submenu-link"><LiaFileImportSolid /> Apply New NOC Request</Link>
                                    </MenuItem>
                                </SubMenu>
                                <SubMenu
                                    icon={<FaChartArea />}
                                    label="Hs Code Items"
                                    className="submenu-custom"
                                    open={openMenu === "hs_code_items"}
                                    onClick={() => handleMenuClick("hs_code_items")}>
                                    <MenuItem className="submenu-item">
                                        <Link to="/admin/hscode-items" className="submenu-link"><LiaFileExportSolid /> All Hs Codes</Link>
                                    </MenuItem>
                                    <MenuItem className="submenu-item">
                                        <Link to="/admin/hscode-item/add_new" className="submenu-link"><LiaFileExportSolid /> Add New Hs Code</Link>
                                    </MenuItem>
                                </SubMenu>

                                <SubMenu
                                    icon={<FaFileSignature />}
                                    label="Nature of Biomaterial"
                                    className="submenu-custom"
                                    open={openMenu === "nature"}
                                    onClick={() => handleMenuClick("nature")}>
                                    <MenuItem className="submenu-item">
                                        <Link to="/admin/naturalof-biomaterials" className="submenu-link"><FaFileSignature /> All Narural Biomaterials</Link>
                                    </MenuItem>
                                    <MenuItem className="submenu-item">
                                        <Link to="/admin/naturalof-biomaterial/add_new" className="submenu-link"><FaFileSignature /> Add New Narural Biomaterial</Link>
                                    </MenuItem>
                                </SubMenu>
                                <SubMenu
                                    icon={<FaFileSignature />}
                                    label="Where Sapmle Collected"
                                    className="submenu-custom"
                                    open={openMenu === "sample_collected"}
                                    onClick={() => handleMenuClick("sample_collected")}>
                                    <MenuItem className="submenu-item">
                                        <Link to="/admin/samples-collected" className="submenu-link"><FaFileSignature /> All Samples Collected</Link>
                                    </MenuItem>
                                    <MenuItem className="submenu-item">
                                        <Link to="/admin/sample-collected/add_new" className="submenu-link"><FaFileSignature /> Add New Sample Collected</Link>
                                    </MenuItem>
                                </SubMenu>

                                <SubMenu
                                    icon={<FaFileSignature />}
                                    label="Quantity of Samples"
                                    className="submenu-custom"
                                    open={openMenu === "auantity"}
                                    onClick={() => handleMenuClick("auantity")}>
                                    <MenuItem className="submenu-item">
                                        <Link to="/admin/quantityof-samples" className="submenu-link"><FaFileSignature /> All Quantity of Samples</Link>
                                    </MenuItem>
                                    <MenuItem className="submenu-item">
                                        <Link to="/admin/quantityof-sample/add_new" className="submenu-link"><FaFileSignature /> Add New Quantity of Samples</Link>
                                    </MenuItem>
                                </SubMenu>
                                <SubMenu
                                    icon={<FaFileSignature />}
                                    label="Purpose of end use"
                                    className="submenu-custom"
                                    open={openMenu === "end_use"}
                                    onClick={() => handleMenuClick("end_use")}>
                                    <MenuItem className="submenu-item">
                                        <Link to="/admin/purposeof-enduses" className="submenu-link"><FaFileSignature /> All Purpose Of end uses</Link>
                                    </MenuItem>
                                    <MenuItem className="submenu-item">
                                        <Link to="/admin/purposeof-enduse/add_new" className="submenu-link"><FaFileSignature /> Add Purpose of end use</Link>
                                    </MenuItem>
                                </SubMenu>
                                <SubMenu
                                    icon={<FaFileSignature />}
                                    label="Wather Research Analysis"
                                    className="submenu-custom"
                                    open={openMenu === "sample_storage"}
                                    onClick={() => handleMenuClick("sample_storage")}>
                                    <MenuItem className="submenu-item">
                                        <Link to="/admin/weather-research-analysises" className="submenu-link"><FaFileSignature /> All Research Analysises</Link>
                                    </MenuItem>
                                    <MenuItem className="submenu-item">
                                        <Link to="/admin/weather-research-analysis/add_new" className="submenu-link"><FaFileSignature /> Add Research Analysis</Link>
                                    </MenuItem>
                                </SubMenu>
                                <SubMenu
                                    icon={<FaFileSignature />}
                                    label="Samples Exported Volume"
                                    className="submenu-custom"
                                    open={openMenu === "exported_volumn"}
                                    onClick={() => handleMenuClick("exported_volumn")}>
                                    <MenuItem className="submenu-item">
                                        <Link to="#" className="submenu-link"><FaFileSignature /> All Samples Exported Volume</Link>
                                    </MenuItem>
                                    <MenuItem className="submenu-item">
                                        <Link to="/imp-exp/exporter" className="submenu-link"><FaFileSignature /> Add New Samples Exported Volume</Link>
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
                                    label="Exporter Applications"
                                    className="submenu-custom"
                                    open={openMenu === "export"}
                                    onClick={() => handleMenuClick("export")}
                                >
                                    <MenuItem className="submenu-item">
                                        <Link to="/imp-exp/add-new" className="submenu-link"><LiaFileExportSolid /> Apply for New NOC</Link>
                                    </MenuItem>
                                    <MenuItem className="submenu-item">
                                        <Link to="/imp-exp/exporters" className="submenu-link"><LiaFileExportSolid />  Applications under review</Link>
                                    </MenuItem>
                                    <MenuItem className="submenu-item">
                                        <Link to="#" className="submenu-link"><LiaFileExportSolid />  Decision on Submitted <br /> &nbsp;&nbsp;&nbsp;Applications</Link>
                                    </MenuItem>
                                    <MenuItem className="submenu-item">
                                        <Link to="/imp-exp/rejct-applications" className="submenu-link"><LiaFileExportSolid /> Reject Applications</Link>
                                    </MenuItem>
                                    <MenuItem className="submenu-item">
                                        <Link to="#" className="submenu-link"><LiaFileExportSolid /> Draft Applications</Link>
                                    </MenuItem>

                                </SubMenu>

                                <SubMenu
                                    icon={<FaFileExport />}
                                    label="Importer Applications"
                                    className="submenu-custom"
                                    open={openMenu === "import"}
                                    onClick={() => handleMenuClick("import")}
                                >
                                    <MenuItem className="submenu-item">
                                        <Link to="/imp-exp/exporters" className="submenu-link"><LiaFileExportSolid /> Fresh Applications<br /> &nbsp;&nbsp;&nbsp;Received</Link>
                                    </MenuItem>
                                    <MenuItem className="submenu-item">
                                        <Link to="#" className="submenu-link"><LiaFileExportSolid /> Archive Applications <br />&nbsp;&nbsp;&nbsp;Received</Link>
                                    </MenuItem>
                                    <MenuItem className="submenu-item">
                                        <Link to="/imp-exp/rejct-applications" className="submenu-link"><LiaFileExportSolid /> Reject Applications</Link>
                                    </MenuItem>
                                    <MenuItem className="submenu-item">
                                        <Link to="#" className="submenu-link"><LiaFileExportSolid /> Applications With <br />&nbsp;&nbsp;&nbsp;Committee Members</Link>
                                    </MenuItem>
                                    {/* <MenuItem className="submenu-item">
                                        <Link to="#" className="submenu-link"><LiaFileExportSolid /> Exporter NOC Issued</Link>
                                    </MenuItem> */}
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
                                        <Link to="/imp-exp/exporters" className="submenu-link"><LiaFileExportSolid /> Importer NOC</Link>
                                    </MenuItem>
                                </SubMenu>
                            </>
                        )}

                        {/* User Sidebar ICMR */}
                        {userRole === "icmr" && (
                            <>
                                <MenuItem component={<NavLink to="/icmr/dashboard" />} icon={<AiFillDashboard />} className="menu-item">
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
                                        <Link to="/icmr/profile" className="submenu-link">Profile Settings</Link>
                                    </MenuItem>
                                </SubMenu>

                                <SubMenu
                                    icon={<FaFileExport />}
                                    label="Exporter Applications"
                                    className="submenu-custom"
                                    open={openMenu === "export"}
                                    onClick={() => handleMenuClick("export")}
                                >
                                    <MenuItem className="submenu-item">
                                        <Link to="/icmr/exporters" className="submenu-link"><LiaFileExportSolid /> Fresh Applications<br /> &nbsp;&nbsp;&nbsp;Received</Link>
                                    </MenuItem>
                                    <MenuItem className="submenu-item">
                                        <Link to="#" className="submenu-link"><LiaFileExportSolid /> Archive Applications <br />&nbsp;&nbsp;&nbsp;Received</Link>
                                    </MenuItem>
                                    <MenuItem className="submenu-item">
                                        <Link to="/icmr/rejct-applications" className="submenu-link"><LiaFileExportSolid /> Reject Applications</Link>
                                    </MenuItem>
                                    <MenuItem className="submenu-item">
                                        <Link to="#" className="submenu-link"><LiaFileExportSolid /> Applications With <br />&nbsp;&nbsp;&nbsp;Committee Members</Link>
                                    </MenuItem>
                                    {/* <MenuItem className="submenu-item">
                                        <Link to="#" className="submenu-link"><LiaFileExportSolid /> Exporter NOC Issued</Link>
                                    </MenuItem> */}
                                </SubMenu>
                                <SubMenu
                                    icon={<FaFileExport />}
                                    label="Importer Applications"
                                    className="submenu-custom"
                                    open={openMenu === "import"}
                                    onClick={() => handleMenuClick("import")}
                                >
                                    <MenuItem className="submenu-item">
                                        <Link to="/icmr/exporters" className="submenu-link"><LiaFileExportSolid /> Fresh Applications<br /> &nbsp;&nbsp;&nbsp;Received</Link>
                                    </MenuItem>
                                    <MenuItem className="submenu-item">
                                        <Link to="#" className="submenu-link"><LiaFileExportSolid /> Archive Applications <br />&nbsp;&nbsp;&nbsp;Received</Link>
                                    </MenuItem>
                                    <MenuItem className="submenu-item">
                                        <Link to="/icmr/rejct-applications" className="submenu-link"><LiaFileExportSolid /> Reject Applications</Link>
                                    </MenuItem>
                                    <MenuItem className="submenu-item">
                                        <Link to="#" className="submenu-link"><LiaFileExportSolid /> Applications With <br />&nbsp;&nbsp;&nbsp;Committee Members</Link>
                                    </MenuItem>
                                    {/* <MenuItem className="submenu-item">
                                        <Link to="#" className="submenu-link"><LiaFileExportSolid /> Exporter NOC Issued</Link>
                                    </MenuItem> */}
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
