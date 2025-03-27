import React from 'react';
import { Outlet } from 'react-router-dom';
import SideNavBar from '../components/SideNavBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import "../pages/style/custom.css";

function Layouts() {
    return (
        <>
            {/* <div className="d-flex vh-100 bg-gray">
            <aside className="sidebar">
                <SideNavBar />
            </aside>
            <div className="content d-flex flex-column w-100">
                <Header />
                <main className="flex-grow-1">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div> */}
            <div className="d-flex vh-100 bg-gray">
                <aside className="sidebar d-flex flex-column" style={{ position: "sticky", top: 0, height: "100vh", overflowY: "auto" }}>
                    <SideNavBar />
                </aside>
                <div className="content d-flex flex-column w-100" style={{ flex: 1, overflowY: "auto" }}>
                    <Header />
                    <main className="flex-grow-1" style={{ overflowY: "auto" }}>
                        <Outlet />
                    </main>
                    <Footer />
                </div>
            </div>

        </>
    );
}
export default Layouts;
