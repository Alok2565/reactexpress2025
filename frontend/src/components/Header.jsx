import React from 'react'
import stayamev from "../assets/images/satyam-dark.png"
import main_logo from "../assets/images/Indian_Council_of_Medical_Research_Logo.svg"
import MaiNavMenu from './MaiNavMenu'


function Header() {
    return (
        <>
            {/* <div className="bg-white py-2 border-bottom-2">
                <div className="container">
                    <div className="row d-flex justify-content w-100">
                        <div className="col-sm-12">
                            <ul className="logosection d-flex justify-content">
                                <li className="d-flex">
                                    <img src={stayamev} alt="" width="65" height="95" />
                                    <a className="mt-3 text-dark" href="http://localhost/tbmproddev">
                                        <span className="grid"><strong>स्वास्थ्य अनुसंधान विभाग</strong><br />Department of Health
                                            Research</span>

                                    </a>
                                </li>

                                <li className="text-center"> <span className="extra-logo">
                                    <span className="projectNmae">Transfer of Human Biological Material (THBM)</span>
                                </span></li>
                                <li><span className="extra-logo float-end">
                                    <img src={main_logo} alt="Indian Council of Medical Research" width="65" height="95" className="img-fluid" />
                                </span>

                                </li>
                            </ul>

                        </div>
                    </div>
                </div>
            </div> */}
            {/* <div className="bdr-top py-2 border-top-2 border-color-red" style={{ borderTop: "2px solid #1874CD" }}>
                <div className="container">
                    <div className="row d-flex justify-content w-100">
                        <div className="col-sm-12">
                            <ul className="logosection d-flex justify-content-between align-items-center w-100">
                            
                                <li className="d-flex align-items-center">
                                    <img src={stayamev} alt="" width="65" height="95" />
                                    <a className="mt-3 text-dark" href="http://localhost/tbmproddev">
                                        <span className="grid">
                                            <strong>स्वास्थ्य अनुसंधान विभाग</strong><br />
                                            Department of Health Research
                                        </span>
                                    </a>
                                </li>


                              
                                <li className="text-center flex-grow-1">
                                    <span className="extra-logo">
                                        <span className="projectNmae">Transfer of Human Biological Material (THBM)</span>
                                    </span>
                                </li>
                              
                                <li className="d-flex align-items-center">
                                    <img src={main_logo} alt="Indian Council of Medical Research" width="206" className="img-fluid" />
                                </li>



                            </ul>
                        </div>
                    </div>
                </div>
            </div> */}
            <header className="py-2 border-bottom" style={{ borderTop: "2px solid #1e90ff" }}>
                <div className="container d-flex flex-wrap justify-content-center">
                    <a href="/" className="d-flex align-items-center mb-lg-0 me-lg-auto text-dark text-decoration-none">
                        <img src={stayamev} alt="" width="65" height="95" />
                        <span className="grid">
                            <strong>स्वास्थ्य अनुसंधान विभाग</strong><br />
                            Department of Health Research
                        </span>
                    </a>
                    <span className="extra-logo mb-lg-0 me-lg-auto mt-4">
                        <h1 className="projectName text-center">Transfer of Human Biological Material (THBM)</h1>
                    </span>
                    <span className="extra-logo float-end">
                        <img src={main_logo} alt="Indian Council of Medical Research" className="img-fluid" width="206" />
                    </span>
                </div>
            </header>
            <div className="justify-content">
                <MaiNavMenu />
                {/* */}
            </div>

        </>
    )
}

export default Header
