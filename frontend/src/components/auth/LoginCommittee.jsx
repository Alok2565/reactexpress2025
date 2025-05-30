// import React, { useState } from 'react'
// import { Container, Col } from 'react-bootstrap'
// import Form from 'react-bootstrap/Form';
// import { Link } from 'react-router-dom';
// import authLogo from "../../assets/images/auth_icmr_logo.png";
// import Button from "react-bootstrap/Button";
// import CaptchaComponent from '../CaptchaComponent';


// function LoginCommittee() {
//     const [verified, setVerified] = useState(false);

//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     const LogiData = () => {
//         console.log("Email:-" + email, "Password:-" + password);
//     }
//     return (
//         <>
//             <div>
//                 <Container>
//                     <Col className="codex-authbox login mt-4 mb-4">
//                         <Col className="auth-header p-2">
//                             <Col className="d-flex justify-content-center align-items-center">
//                                 <Link to="#">
//                                     <img
//                                         className="img-fluid light-logo"
//                                         src={authLogo}
//                                         width="100%"
//                                         style={{ maxWidth: "400px" }}
//                                         alt="logo"
//                                     />
//                                 </Link>
//                             </Col>
//                             <h5 className="justify-content-between text-center mb-3" style={{ fontWeight: "600" }}>
//                                 Login for Committee Member
//                             </h5>
//                         </Col>
//                         <Form>
//                             <Form.Group className="mb-3" controlId="formGroupEmail">
//                                 <Form.Label>Email id</Form.Label>
//                                 <Form.Control type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email id" maxLength={10} />
//                             </Form.Group>
//                             <Form.Group className="mb-3" controlId="formGroupPassword">
//                                 <Form.Label className="d-flex justify-content-between">
//                                     Password
//                                     <Link to="" className="float-end text-end" style={{ textDecoration: "none", fontSize: "17px" }}>Reset Password</Link>
//                                 </Form.Label>
//                                 <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
//                             </Form.Group>
//                             {/* <Form.Group>
//                                 <div className="d-flex flex-column align-items-center bg-base-100">
//                                     {!verified ? (
//                                         <CaptchaComponent onVerify={() => setVerified(true)} />
//                                     ) : (
//                                         <div className="p-3 bg-green-100 rounded-lg text-center">
//                                             <h2 className="text-lg font-bold text-green-700">✅ Verified!</h2>
//                                             <p>You can now submit the form.</p>
//                                         </div>
//                                     )}
//                                 </div>
//                             </Form.Group> */}
//                             <Form.Group>
//                                 <div className="d-flex flex-column align-items-center bg-base-100">
//                                     {!verified ? (
//                                         <CaptchaComponent onVerify={() => setVerified(true)} />
//                                     ) : null}
//                                 </div>
//                             </Form.Group>
//                             <Col className="d-grid gap-2">
//                                 <Button onClick={LogiData} className="btn btn-primary" type="button" style={{ fontSize: "20px;", fontWeight: "700", letterSpacing: "0.1em" }} disabled={!verified}>Login</Button>
//                                 <h6 class="mt-3" style={{ color: "rgb(72, 76, 81)", textDecoration: "none" }}>Don't have an account? <Link class="text-primary" to="#" style={{ textDecoration: "none", fontWeight: "600" }}>Register Here</Link></h6>
//                             </Col>
//                         </Form>
//                     </Col>
//                 </Container>
//             </div>
//         </>
//     )
// }

// export default LoginCommittee

import React, { useState } from 'react';
import { Container, Col, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import authLogo from "../../assets/images/auth_icmr_logo.png";
import CaptchaComponent from '../CaptchaComponent';

function LoginCommittee() {
    const [verified, setVerified] = useState(false);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const LogiData = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/api/login", {
                email,
                password,
            });

            const { token, user } = response.data;

            // Save token and role to localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("role", user.role);
            localStorage.setItem("email", user.email);

            // Redirect based on role
            if (user.role === "committee") {
                navigate("/committee/dashboard");
            } else {
                navigate("committee/login"); // fallback
            }

        } catch (err) {
            console.error("Login failed:", err);
            alert("Invalid credentials");
        }
    };

    return (
        <div>
            <Container>
                <Col className="codex-authbox login mt-4 mb-4">
                    <Col className="auth-header p-2">
                        <Col className="d-flex justify-content-center align-items-center">
                            <Link to="#">
                                <img
                                    className="img-fluid light-logo"
                                    src={authLogo}
                                    width="100%"
                                    style={{ maxWidth: "400px" }}
                                    alt="logo"
                                />
                            </Link>
                        </Col>
                        <h5 className="text-center mb-3" style={{ fontWeight: "600" }}>
                            Login for Committee Member
                        </h5>
                    </Col>
                    <Form>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>Email id</Form.Label>
                            <Form.Control
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email id"
                                maxLength={50}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupPassword">
                            <Form.Label className="d-flex justify-content-between">
                                Password
                                <Link to="#" style={{ textDecoration: "none", fontSize: "17px" }}>
                                    Reset Password
                                </Link>
                            </Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                            />
                        </Form.Group>

                        <Form.Group>
                            <div className="d-flex flex-column align-items-center bg-base-100">
                                {!verified ? (
                                    <CaptchaComponent onVerify={() => setVerified(true)} />
                                ) : null}
                            </div>
                        </Form.Group>

                        <Col className="d-grid gap-2">
                            <Button
                                onClick={LogiData}
                                className="btn btn-primary"
                                type="button"
                                style={{ fontSize: "20px", fontWeight: "700", letterSpacing: "0.1em" }}
                                disabled={!verified}
                            >
                                Login
                            </Button>
                            <h6 className="mt-3" style={{ color: "rgb(72, 76, 81)" }}>
                                Don't have an account?{" "}
                                <Link className="text-primary" to="#" style={{ textDecoration: "none", fontWeight: "600" }}>
                                    Register Here
                                </Link>
                            </h6>
                        </Col>

                    </Form>
                </Col>
            </Container>
        </div>
    );
}

export default LoginCommittee;
