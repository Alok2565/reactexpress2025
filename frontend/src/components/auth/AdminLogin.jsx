// import React, { useState, useEffect } from 'react';
// import { Container, Col, Form, Button } from 'react-bootstrap';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import authLogo from "../../assets/images/auth_icmr_logo.png";
// import CaptchaComponent from '../CaptchaComponent';

// function AdminLogin() {
//     const [verified, setVerified] = useState(false);
//     const navigate = useNavigate();
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     // 🔒 Redirect if already logged in
//     useEffect(() => {
//     const role = localStorage.getItem("role");
//     if (role === "admin") {
//         navigate("/admin/dashboard");
//     }
// }, [navigate]);

//     const LogiData = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await axios.post("http://localhost:5000/api/login", {
//                 email,
//                 password,
//             });

//             const { token, user } = response.data;

//             localStorage.setItem("token", token);
//             localStorage.setItem("role", user.role);
//             localStorage.setItem("email", user.email);
//             localStorage.setItem("name", user.name);
//             localStorage.setItem("designation", user.designation);

//             if (user.role === "admin") {
//                 navigate("/admin/dashboard");
//             } else {
//                 navigate("/unauthorized");
//             }

//         } catch (err) {
//             console.error("Login failed:", err);
//             alert("Invalid credentials");
//         }
//     };

//     return (
//         <Container>
//             <Col className="codex-authbox login mt-4 mb-4">
//                 {/* Login UI */}
//                 <Col className="auth-header p-2">
//                     <Col className="d-flex justify-content-center align-items-center">
//                         <Link to="#">
//                             <img src={authLogo} width="100%" style={{ maxWidth: "400px" }} alt="logo" />
//                         </Link>
//                     </Col>
//                     <h5 className="text-center mb-3" style={{ fontWeight: "600" }}>
//                         Login for Admin Login
//                     </h5>
//                 </Col>
//                 <Form>
//                     <Form.Group className="mb-3">
//                         <Form.Label>Email id</Form.Label>
//                         <Form.Control
//                             type="text"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             placeholder="Email id"
//                             maxLength={50}
//                         />
//                     </Form.Group>
//                     <Form.Group className="mb-3">
//                         <Form.Label className="d-flex justify-content-between">
//                             Password
//                             <Link to="#" style={{ textDecoration: "none", fontSize: "17px" }}>
//                                 Reset Password
//                             </Link>
//                         </Form.Label>
//                         <Form.Control
//                             type="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             placeholder="Password"
//                         />
//                     </Form.Group>

//                     <Form.Group>
//                         <div className="d-flex flex-column align-items-center">
//                             {!verified ? (
//                                 <CaptchaComponent onVerify={() => setVerified(true)} />
//                             ) : null}
//                         </div>
//                     </Form.Group>

//                     <Col className="d-grid gap-2">
//                         <Button
//                             onClick={LogiData}
//                             className="btn btn-primary"
//                             type="button"
//                             style={{ fontSize: "20px", fontWeight: "700" }}
//                             disabled={!verified}
//                         >
//                             Login
//                         </Button>
//                         <h6 className="mt-3" style={{ color: "rgb(72, 76, 81)" }}>
//                             Don't have an account?{" "}
//                             <Link className="text-primary" to="#" style={{ fontWeight: "600" }}>
//                                 Register Here
//                             </Link>
//                         </h6>
//                     </Col>
//                 </Form>
//             </Col>
//         </Container>
//     );
// }
// export default AdminLogin;

import React, { useState, useEffect } from "react";
import { Container, Col, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import authLogo from "../../assets/images/auth_icmr_logo.png";
import CaptchaComponent from "../CaptchaComponent";
import { useProject } from "../../ProjectContext"; 
import { Helmet } from "react-helmet";

function AdminLogin() {
  const { title } = useProject();
  const [verified, setVerified] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 🔒 Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role === "admin") {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [navigate]);

  const LogiData = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Email and password are required");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        { email, password }
      );

      // 🔐 OTP REQUIRED
      if (response.data.otp_required) {
        sessionStorage.setItem("otp_token", response.data.otp_token);
        navigate("/verify-otp");
        return;
      }

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
    <Helmet>
                    <meta charSet="utf-8" />
                    <title>{`Login | ${title}`}</title>
                </Helmet>
    <Container>
      <Col className="codex-authbox login mt-4 mb-4">
        <Col className="auth-header p-2 text-center">
          <img
            src={authLogo}
            style={{ maxWidth: "400px" }}
            alt="logo"
          />
          <h5 className="mt-3" style={{ fontWeight: 600 }}>
            Admin Login
          </h5>
        </Col>

        <Form onSubmit={LogiData}>
          <Form.Group className="mb-3">
            <Form.Label>Email ID</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <div className="mb-3 text-center">
            {!verified && (
              <CaptchaComponent onVerify={() => setVerified(true)} />
            )}
          </div>

          <Button
            type="submit"
            className="w-100"
            disabled={!verified}
          >
            Login
          </Button>

          <div className="text-center mt-3">
            <Link to="#">Forgot Password?</Link>
          </div>
        </Form>
      </Col>
    </Container>
    </>
  );
}

export default AdminLogin;

