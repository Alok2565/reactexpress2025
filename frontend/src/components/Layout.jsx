import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

function Lauout() {
    return (
        <>
            <div>
                <Header />
                <Outlet />
                <Footer />
            </div>
        </>
    )
}
export default Lauout
