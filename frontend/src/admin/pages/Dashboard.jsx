import React, { useEffect, useState } from 'react'
import { Container, Col } from 'react-bootstrap'
import { CiViewList } from "react-icons/ci";
import { FaEdit, FaListAlt } from "react-icons/fa";
import { RiDraftFill } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import { TiArrowRightThick } from "react-icons/ti";
import axios from "axios";

function Dashboard() {
    const [data, setData] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
    const fetchDashboardData = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate('/unauthorized');
            return;
        }
        try {
            const res = await axios.get("http://localhost:5000/api/admin/dashboard", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setData(res.data.message);
        } catch (err) {
            if (err.response?.status === 401 || err.response?.status === 403) {
                navigate('/unauthorized');
            } else {
                setError("Something went wrong");
            }
        }
    };

    fetchDashboardData();
}, [navigate]);
    return (
        <>

            <div className="page-content py-2">
                <Container fluid>
                    <h4 className="mb-3">Dashboard</h4>
                    <div className="tbm-dash-card">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box">
                                    <div className="page-title-right"><button className="btn btn-primary float-end mb-2" style={{ backgroundColor: "#14468C", border: "#14468C" }}>
                                        <Link className="float-end text-white text-decoration-none" to="#" style={{ fontWeight: "600;" }}>Apply for new NOC</Link>
                                    </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                        {data && <p>{data}</p>}
                        {error && <p style={{ color: "red" }}>{error}</p>}
                        <div className="card">
                            <div className="card-body">
                                <div className="row g-3">
                                    <div className="col-sm-6 col-md-4 col-lg-3">
                                        <div className="card text-white text-end" style={{ backgroundColor: "#688A22" }}>
                                            <div className="card-body d-flex flex-column justify-content-between">
                                                <div className="row">
                                                    <Col xs={12}>
                                                        <p className="text-start mb-2 fw-bold" style={{ fontSize: "15px" }}>
                                                            Applications Submitted
                                                        </p>
                                                    </Col>
                                                    <div className="count-icon d-flex align-items-center justify-content-between">
                                                        <div className="cout py-2">
                                                            <span style={{ fontSize: "20px", fontWeight: "bold" }}>3</span>
                                                        </div>
                                                        <div className="cout">
                                                            <CiViewList style={{ fontSize: "35px", fontWeight: "bold" }} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <Col xs={12}>
                                                    <p className="text-start mt-auto mb-0 py-1">
                                                        <Link className="text-decoration-none text-white fw-bold" to="#">
                                                            <TiArrowRightThick /> More info...
                                                        </Link>
                                                    </p>
                                                </Col>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-6 col-md-4 col-lg-3">
                                        <div className="card text-white text-end" style={{ backgroundColor: "#67707F" }}>
                                            <div className="card-body d-flex flex-column justify-content-between">
                                                <div className="row">
                                                    <Col xs={12}>
                                                        <p className="text-start mb-2 fw-bold" style={{ fontSize: "15px" }}>
                                                            Applications under review
                                                        </p>
                                                    </Col>
                                                    <div className="count-icon d-flex align-items-center justify-content-between">
                                                        <div className="cout py-2">
                                                            <span style={{ fontSize: "20px", fontWeight: "bold" }}>3</span>
                                                        </div>
                                                        <div className="cout">
                                                            <FaEdit style={{ fontSize: "35px", fontWeight: "bold" }} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <Col xs={12}>
                                                    <p className="text-start mt-auto mb-0 py-1">
                                                        <Link className="text-decoration-none text-white fw-bold" to="#">
                                                            <TiArrowRightThick /> More info...
                                                        </Link>
                                                    </p>
                                                </Col>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-4 col-lg-3">
                                        <div className="card text-white text-end" style={{ backgroundColor: "#F78800" }}>
                                            <div className="card-body d-flex flex-column justify-content-between">
                                                <div className="row">
                                                    <Col xs={12}>
                                                        <p className="text-start mb-2 fw-bold" style={{ fontSize: "15px" }}>
                                                            Decision on Submitted Applications
                                                        </p>
                                                    </Col>
                                                    <div className="count-icon d-flex align-items-center justify-content-between">
                                                        <div className="cout py-2">
                                                            <span style={{ fontSize: "20px", fontWeight: "bold" }}>3</span>
                                                        </div>
                                                        <div className="cout">
                                                            <FaListAlt style={{ fontSize: "35px", fontWeight: "bold" }} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <Col xs={12}>
                                                    <p className="text-start mt-auto mb-0 py-1">
                                                        <Link className="text-decoration-none text-white fw-bold" to="#">
                                                            <TiArrowRightThick /> More info...
                                                        </Link>
                                                    </p>
                                                </Col>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-4 col-lg-3">
                                        <div className="card text-white text-end" style={{ backgroundColor: "#D12E00" }}>
                                            <div className="card-body d-flex flex-column justify-content-between">
                                                <div className="row">
                                                    <Col xs={12}>
                                                        <p className="text-start mb-2 fw-bold" style={{ fontSize: "15px" }}>
                                                            Total Draft Applications
                                                        </p>
                                                    </Col>
                                                    <div className="count-icon d-flex align-items-center justify-content-between">
                                                        <div className="cout py-2">
                                                            <span style={{ fontSize: "20px", fontWeight: "bold" }}>3</span>
                                                        </div>
                                                        <div className="cout">
                                                            <RiDraftFill style={{ fontSize: "35px", fontWeight: "bold" }} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <Col xs={12}>
                                                    <p className="text-start mt-auto mb-0 py-1">
                                                        <Link className="text-decoration-none text-white fw-bold" to="#">
                                                            <TiArrowRightThick /> More info...
                                                        </Link>
                                                    </p>
                                                </Col>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}

export default Dashboard
