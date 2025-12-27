import React, { useEffect, useState } from "react";
import { Container, Col, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import authLogo from "../../assets/images/auth_icmr_logo.png";
import axios from "axios";
import CaptchaComponent from "../CaptchaComponent";
const VerifyImpExpOtp = () => {
  const navigate = useNavigate();

  /** 🔒 Stored temporarily after login */
  const otpToken = sessionStorage.getItem("otp_token");

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
    const [verified, setVerified] = useState(false);

    useEffect(() => {
      const otp_token = sessionStorage.getItem("otp_token");
      if (!otp_token) {
        navigate("/", { replace: true });
      }
    }, [navigate]);

  const verifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    const otp_token = sessionStorage.getItem("otp_token");
    if (!otp_token) {
      alert("Session expired. Login again.");
      navigate("/imp-exp/login");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/otp-verify",
        {
          otp: otp.trim(),
          otp_token,
        }
      );

      const { token, user } = res.data;

      /** 🔐 Save auth */
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("iec_code", user.iec_code);
      localStorage.setItem("name", user.name || "");
      localStorage.setItem("designation", user.designation || "");

      /** 🧹 Cleanup */
       sessionStorage.removeItem("otp_token");
      // ✅ Role-based redirect
      navigate(`/${user.role}/dashboard`, { replace: true });

    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed");

      if (err.response?.status === 401) {
        sessionStorage.removeItem("otp_token");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <>
    <Container>
          <Col className="codex-authbox login mt-4 mb-4">
            
            {/* Header */}
            <Col className="auth-header">
              <Col className="d-flex justify-content-center align-items-center">
                <Link to="#">
                  <img
                    src={authLogo}
                    style={{ maxWidth: "400px", width: "100%" }}
                    alt="logo"
                  />
                </Link>
              </Col>
              <h5 className="text-center mb-3 fw-semibold">
                OTP Verification
              </h5>
            </Col>
     {error && <Alert variant="danger">{error}</Alert>}
            {/* OTP Form */}
            <Form onSubmit={verifyOtp}>
              <Form.Group className="mb-3">
                <Form.Label>
                  <strong>
                    Enter OTP <span className="text-danger">*</span>
                  </strong>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter 6 digit OTP"
                  value={otp}
                  maxLength={6}
                  onChange={(e) =>
                    setOtp(e.target.value.replace(/\D/g, ""))
                  }
                  required
                />
              </Form.Group>
    
              {/* Captcha */}
              <Form.Group className="mb-3">
                <div className="d-flex justify-content-center">
                  {!verified && (
                    <CaptchaComponent onVerify={() => setVerified(true)} />
                  )}
                </div>
              </Form.Group>
    
              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                className="w-100"
                disabled={!verified}
              >
                Verify OTP
              </Button>
            </Form>
    
          </Col>
        </Container>
      
    </>
  );

  // return (
  //   <>
  //   <Container className="d-flex justify-content-center align-items-center">
  //      <Col md={4} className="codex-authbox mt-5 p-4"
  //        <h4 className="text-center mb-3 fw-bold">
  //          OTP Verification
  //        </h4
  //        <p className="text-center text-muted">
  //          Enter the OTP sent to your registered email
  //        </p
  //        {error && <Alert variant="danger">{error}</Alert>
  //        <Form onSubmit={verifyOtp}>
  //          <Form.Group className="mb-3">
  //            <Form.Label>OTP</Form.Label>
  //            <Form.Control
  //             type="text"
  //             maxLength={6}
  //             value={otp}
  //             onChange={(e) =>
  //               setOtp(e.target.value.replace(/\D/g, ""))
  //             }
  //             placeholder="Enter OTP"
  //           />
  //         </Form.Group>

  //         <Button
  //           type="submit"
  //           className="w-100"
  //           disabled={loading || otp.length !== 6}
  //         >
  //           {loading ? "Verifying..." : "Verify OTP"}
  //         </Button>
  //       </Form>

  //     </Col>
  //   </Container>
  //   </>
  // )
};

export default VerifyImpExpOtp;


