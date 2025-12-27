// // import { useState } from "react";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";

// // const OTPVerify = () => {
// //   const [otp, setOtp] = useState("");
// //   const navigate = useNavigate();

// //   const otp_token = sessionStorage.getItem("otp_token");

// //   const verifyOtp = async (e) => {
// //   e.preventDefault();

// //   if (otp.length !== 6) {
// //     alert("Enter valid 6 digit OTP");
// //     return;
// //   }

// //   try {
// //     const res = await axios.post(
// //       "http://localhost:5000/api/verify-otp",
// //       {
// //         otp: otp.trim(),
// //         otp_token,
// //       }
// //     );

// //     localStorage.setItem("token", res.data.token);
// //     localStorage.setItem("role", res.data.user.role);
// //     localStorage.setItem("email", res.data.user.email);

// //     sessionStorage.removeItem("otp_token");

// //     navigate(`/${res.data.user.role}/dashboard`);
// //   } catch (err) {
// //     alert(err.response?.data?.message || "OTP failed");
// //   }
// // };

// //   return (
// //     <form onSubmit={verifyOtp}>
// //       <input
// //         type="text"
// //         placeholder="Enter OTP"
// //         value={otp}
// //         onChange={(e) => setOtp(e.target.value)}
// //         maxLength={6}
// //         required
// //       />
// //       <button type="submit">Verify OTP</button>
// //     </form>
// //   );
// // };

// // export default OTPVerify;

// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import { Button, Col, Container, Form } from "react-bootstrap";
// import authLogo from "../../assets/images/auth_icmr_logo.png";
// import CaptchaComponent from "../CaptchaComponent";
// const OTPVerify = () => {
//   const [otp, setOtp] = useState("");
//   const navigate = useNavigate();
//   const [verified, setVerified] = useState(false);

//   useEffect(() => {
//     const otp_token = sessionStorage.getItem("otp_token");
//     if (!otp_token) {
//       navigate("/", { replace: true });
//     }
//   }, [navigate]);

//   // const verifyOtp = async (e) => {
//   //   e.preventDefault();

//   //   const otp_token = sessionStorage.getItem("otp_token");

//   //   if (!otp_token) {
//   //     alert("Session expired. Login again.");
//   //     navigate("/login");
//   //     return;
//   //   }

//   //   if (otp.trim().length !== 6) {
//   //     alert("Enter valid 6 digit OTP");
//   //     return;
//   //   }

//   //   try {
//   //     const res = await axios.post(
//   //       "http://localhost:5000/api/verify-otp",
//   //       {
//   //         otp: otp.trim(),
//   //         otp_token,
//   //       }
//   //     );

//   //     localStorage.setItem("token", res.data.token);
//   //     localStorage.setItem("role", res.data.user.role);
//   //     localStorage.setItem("email", res.data.user.email);

//   //     sessionStorage.removeItem("otp_token");

//   //     // ✅ ROLE BASED REDIRECT
//   //     navigate(`/${res.data.user.role}/dashboard`, { replace: true });

//   //   } catch (err) {
//   //     alert(err.response?.data?.message || "OTP verification failed");
//   //   }
//   // };
//   const verifyOtp = async (e) => {
//     e.preventDefault();

//     const otp_token = sessionStorage.getItem("otp_token");
//     if (!otp_token) {
//       alert("Session expired. Login again.");
//       return;
//     }
//     // if (otp.length !== 6) {
//     //   alert("Enter valid 6 digit OTP");
//     //   return;
//     // }
//     try {
//       const res = await axios.post("http://localhost:5000/api/verify-otp", {
//         otp,
//         otp_token,
//       });
//       const { token, user } = res.data;
//       localStorage.setItem("token", token);
//       localStorage.setItem("email", user.email);
//       localStorage.setItem("name", user.name ?? "");
//       localStorage.setItem("designation", user.designation ?? "");
//       localStorage.setItem("role", user.role);

//       sessionStorage.removeItem("otp_token");

//       navigate(`/${user.role}/dashboard`);
//     } catch (err) {
//       alert(err.response?.data?.message || "OTP failed");
//     }
//   };

//   return (
//     <>
//       <Container>
//         <Col className="codex-authbox login mt-4 mb-4">
//           {/* Login UI */}
//           <Col className="auth-header">
//             <Col className="d-flex justify-content-center align-items-center">
//               <Link to="#">
//                 <img
//                   src={authLogo}
//                   width="100%"
//                   style={{ maxWidth: "400px" }}
//                   alt="logo"
//                 />
//               </Link>
//             </Col>
//             <h5 className="text-center mb-3" style={{ fontWeight: "600" }}>
//               OTP Verification
//             </h5>
//           </Col>
//           <form onSubmit={verifyOtp}>
//         <h4 className="text-center mb-3">Verify OTP</h4>

//         <input
//           type="text"
//           className="form-control mb-3"
//           placeholder="Enter OTP"
//           value={otp}
//           maxLength={6}
//           onChange={(e) => setOtp(e.target.value)}
//           required
//         />

//         <button className="btn btn-primary w-100" type="submit">
//           Verify OTP
//         </button>
//       </form>
//           {/* <Form onSubmit={verifyOtp}>
//             <Form.Group>
//               <Form.Label><strong>Verify OTP<span className="text-danger fs-5">*</span></strong></Form.Label>
//               <Form.Control
//                type="text"
//                 placeholder="Enter OTP"
//                 value={otp}
//                 maxLength={6}
//                 onChange={(e) => setOtp(e.target.value)}
//                 required
//               />
//             </Form.Group>
//             <Form.Group>
//               <div className="d-flex flex-column align-items-center">
//                 {!verified ? (
//                   <CaptchaComponent onVerify={() => setVerified(true)} />
//                 ) : null}
//               </div>
//             </Form.Group>
//             <Form.Group>
//             <Button variant="primary" className="w-100 mt-3">
//               Verify OTP
//             </Button>
//             </Form.Group>
//           </Form> */}
//         </Col>
//       </Container>
//     </>
//   );
// };

// export default OTPVerify;
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Container, Form } from "react-bootstrap";
import authLogo from "../../assets/images/auth_icmr_logo.png";
import CaptchaComponent from "../CaptchaComponent";

const OTPVerify = () => {
  const [otp, setOtp] = useState("");
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();

  // 🔐 Protect OTP page
  useEffect(() => {
    const otp_token = sessionStorage.getItem("otp_token");
    if (!otp_token) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const verifyOtp = async (e) => {
    e.preventDefault();

    // ✅ Captcha check
    if (!verified) {
      alert("Please verify captcha first");
      return;
    }

    const otp_token = sessionStorage.getItem("otp_token");
    if (!otp_token) {
      alert("Session expired. Login again.");
      navigate("/login");
      return;
    }

    // ✅ OTP validation
    if (otp.trim().length !== 6) {
      alert("Enter valid 6 digit OTP");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/verify-otp",
        {
          otp: otp.trim(),
          otp_token,
        }
      );

      const { token, user } = res.data;

      // ✅ Store auth data
      localStorage.setItem("token", token);
      localStorage.setItem("email", user.email);
      localStorage.setItem("name", user.name ?? "");
      localStorage.setItem("designation", user.designation ?? "");
      localStorage.setItem("role", user.role);

      sessionStorage.removeItem("otp_token");

      // ✅ Role-based redirect
      navigate(`/${user.role}/dashboard`, { replace: true });

    } catch (err) {
      alert(err.response?.data?.message || "OTP verification failed");
    }
  };

  return (
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
  );
};

export default OTPVerify;

