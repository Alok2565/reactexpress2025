import React, { useState, useEffect } from 'react';
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

    // 🔒 Redirect if already logged in
    useEffect(() => {
        const role = localStorage.getItem("role");
        if (role === "committee") {
            navigate("/committee/dashboard");
        }
    }, [navigate]);

    const LogiData = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/api/login", {
                email,
                password,
            });

            const { token, user } = response.data;

            localStorage.setItem("token", token);
            localStorage.setItem("role", user.role);
            localStorage.setItem("email", user.email);
            localStorage.setItem("name", user.name);
            localStorage.setItem("designation", user.designation);

            if (user.role === "committee") {
                navigate("/committee/dashboard");
            } else {
                navigate("/unauthorized");
            }

        } catch (err) {
            console.error("Login failed:", err);
            alert("Invalid credentials");
        }
    };

    return (
        <Container>
            <Col className="codex-authbox login mt-4 mb-4">
                {/* Login UI */}
                <Col className="auth-header p-2">
                    <Col className="d-flex justify-content-center align-items-center">
                        <Link to="#">
                            <img src={authLogo} width="100%" style={{ maxWidth: "400px" }} alt="logo" />
                        </Link>
                    </Col>
                    <h5 className="text-center mb-3" style={{ fontWeight: "600" }}>
                        Login for Committee Officer
                    </h5>
                </Col>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Email id</Form.Label>
                        <Form.Control
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email id"
                            maxLength={50}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="d-flex justify-content-between">
                            Password
                            <Link to="/committee/forgot-pasword" style={{ textDecoration: "none", fontSize: "17px" }}>
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
                        <div className="d-flex flex-column align-items-center">
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
                            style={{ fontSize: "20px", fontWeight: "700" }}
                            disabled={!verified}
                        >
                            Login
                        </Button>
                        <h6 className="mt-3" style={{ color: "rgb(72, 76, 81)" }}>
                            Don't have an account?{" "}
                            <Link className="text-primary" to="#" style={{ fontWeight: "600" }}>
                                Register Here
                            </Link>
                        </h6>
                    </Col>
                </Form>
            </Col>
        </Container>
    );
}
export default LoginCommittee;
