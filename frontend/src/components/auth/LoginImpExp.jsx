import React, { useState, useEffect } from "react";
import { Container, Col, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import authLogo from "../../assets/images/auth_icmr_logo.png";
import CaptchaComponent from "../CaptchaComponent";

function LoginImpExp() {
  const [verified, setVerified] = useState(false);
  const [iec_code, setIecCode] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // useEffect(() => {
  //   const role = localStorage.getItem("role");
  //   if (role === "imp-exp") {
  //     navigate("/imp-exp/dashboard");
  //   }
  // }, [navigate]);

  // const LogiData = async (e) => {
  //   e.preventDefault();

  //   if (!iec_code || !password) {
  //     alert("Please fill in all fields");
  //     return;
  //   }

  //   try {
  //     const response = await axios.post("http://localhost:5000/api/impexp_login", {
  //       iec_code,
  //       password,
  //     });

  //     const { token, impexp_user } = response.data;

  //     localStorage.setItem("token", token);
  //     localStorage.setItem("role", impexp_user.role);
  //     localStorage.setItem("iec_code", impexp_user.iec_code);
  //     localStorage.setItem("name", impexp_user.name);
  //     localStorage.setItem("designation", impexp_user.designation);

  //     if (impexp_user.role === "imp-exp") {
  //       navigate("/imp-exp/dashboard");
  //     } else {
  //       navigate("/unauthorized"); 
  //     }
  //   } catch (err) {
  //     console.error("Login failed:", err);

  //     if (err.response && err.response.data && err.response.data.message) {
  //       alert(err.response.data.message);
  //     } else {
  //       alert("Login failed due to server error.");
  //     }
  //   }
  // };

  useEffect(() => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (token && role === "imp-exp") {
    navigate("/imp-exp/dashboard", { replace: true });
  }
}, [navigate]);
  
    const LogiData = async (e) => {
  e.preventDefault();

  if (!iec_code || !password) {
    alert("IEC code and password are required");
    return;
  }

  try {
    const response = await axios.post(
      "http://localhost:5000/api/impexp_login",
      { iec_code, password }
    );

    console.log("LOGIN RESPONSE:", response.data);

    // ✅ CORRECT OTP CHECK
    if (response.data.otp_required) {
      sessionStorage.setItem("otp_token", response.data.otp_token);
      navigate("/otp-verify");
      return;
    }

    alert("Unexpected response from server");

  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Login failed");
  }
};


  return (
    <Container>
      <Col className="codex-authbox login mt-4 mb-4">
        <Col className="auth-header p-2">
          <Col className="d-flex justify-content-center align-items-center">
            <Link to="#">
              <img src={authLogo} width="100%" style={{ maxWidth: "400px" }} alt="logo" />
            </Link>
          </Col>
          <h5 className="text-center mb-3" style={{ fontWeight: "600" }}>
            Login for Importer Exporter
          </h5>
        </Col>

        <Form onSubmit={LogiData}>
          <Form.Group className="mb-3">
            <Form.Label>Importer-Exporter Code (IEC)</Form.Label>
            <Form.Control
              type="text"
              value={iec_code}
              onChange={(e) => setIecCode(e.target.value)}
              placeholder="IEC Code"
              maxLength={10}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="d-flex justify-content-between">
              Password
              <Link to="/imp-exp/forgot-password" style={{ textDecoration: "none", fontSize: "17px" }}>
                Forgot Password
              </Link>
            </Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </Form.Group>

          {!verified && (
            <Form.Group className="mb-3 d-flex justify-content-center">
              <CaptchaComponent onVerify={() => setVerified(true)} />
            </Form.Group>
          )}

          <Col className="d-grid gap-2">
            <Button
              className="btn btn-primary"
              type="submit"
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

export default LoginImpExp;
