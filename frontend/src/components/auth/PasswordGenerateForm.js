// import React, { useEffect, useState } from 'react';
// import { useSearchParams } from 'react-router-dom'; // React Router v6+
// import Button from 'react-bootstrap/Button';
// import Col from 'react-bootstrap/Col';
// import Form from 'react-bootstrap/Form';
// import InputGroup from 'react-bootstrap/InputGroup';
// import Row from 'react-bootstrap/Row';
// import { FaLock } from "react-icons/fa";
// import CaptchaComponent from '../CaptchaComponent';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function PasswordGenerateForm() {
//   const [searchParams] = useSearchParams();
//   const [validated, setValidated] = useState(false);
//   const [verified, setVerified] = useState(false);
//   const [captchaError, setCaptchaError] = useState(false);
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [passwordMatchError, setPasswordMatchError] = useState(false);
// const [roles, setRoles] = useState([]);
//   const email = searchParams.get('email'); // Extract from URL
//   const token = searchParams.get('token'); // (optional) if used in backend validation

//   const navigate = useNavigate();

//   // useEffect(() => {
//   //         axios.get("http://localhost:5000/api/roles")
//   //             .then((res) => setRoles(res.data))
//   //             .catch((err) => console.error("Failed to fetch roles", err));
//   //     }, []);
// useEffect(() => {
//   axios
//     .get("http://localhost:5000/api/roles")
//     .then((res) => setRoles(res.data))
//     .catch((err) => console.error("Failed to fetch roles", err));
// }, []);
//   const handleSubmit = async (event) => {
//     const form = event.currentTarget;
//     event.preventDefault();

//     const passwordsMatch = password === confirmPassword;

//     if (form.checkValidity() === false || !verified || !passwordsMatch) {
//       event.stopPropagation();
//       setCaptchaError(!verified);
//       setPasswordMatchError(!passwordsMatch);
//     } else {
//       try {
//         const res = await axios.post('http://localhost:5000/api/password-setup', {
//           email,
//           token,
//           password,
//         });

//         console.log("Password updated:", res.data);
//         alert('Password successfully set!');
//         // navigate(`{roles.map((role) => (({role.role_slug}))}/login/?success=Password%20has%20been%Generated%20successfully`);
//       if (roles.length > 0) {
//   navigate(`/${roles[0].role_slug}/login/?success=Password%20has%20been%20generated%20successfully`);
// }
//       } catch (err) {
//         console.error('Error setting password:', err);
//         alert('Failed to set password.');
//       }

//       setCaptchaError(false);
//       setPasswordMatchError(false);
//     }

//     setValidated(true);
//   };

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//     setPasswordMatchError(e.target.value !== confirmPassword);
//   };

//   const handleConfirmPasswordChange = (e) => {
//     setConfirmPassword(e.target.value);
//     setPasswordMatchError(password !== e.target.value);
//   };

//   return (
//     <Row>
//       <Form noValidate validated={validated} onSubmit={handleSubmit}>
//         <Form.Group as={Col} md="12" controlId="emailInput">
//           <Form.Label>Email Address</Form.Label>
//           <InputGroup hasValidation>
//             <InputGroup.Text>@</InputGroup.Text>
//             <Form.Control
//               type="text"
//               value={email || ''}
//               readOnly
//             />
//           </InputGroup>
//         </Form.Group>

//         <Form.Group as={Col} md="12" controlId="passwordInput">
//           <Form.Label>Enter Password</Form.Label>
//           <InputGroup hasValidation>
//             <InputGroup.Text><FaLock /></InputGroup.Text>
//             <Form.Control
//               type="password"
//               placeholder="Password"
//               required
//               value={password}
//               onChange={handlePasswordChange}
//             />
//             <Form.Control.Feedback type="invalid">
//               Please enter a valid password.
//             </Form.Control.Feedback>
//           </InputGroup>
//         </Form.Group>

//         <Form.Group as={Col} md="12" controlId="confirmPasswordInput">
//           <Form.Label>Enter Confirm Password</Form.Label>
//           <InputGroup hasValidation>
//             <InputGroup.Text><FaLock /></InputGroup.Text>
//             <Form.Control
//               type="password"
//               placeholder="Confirm Password"
//               required
//               value={confirmPassword}
//               onChange={handleConfirmPasswordChange}
//               isInvalid={passwordMatchError}
//             />
//             <Form.Control.Feedback type="invalid">
//               Passwords do not match.
//             </Form.Control.Feedback>
//           </InputGroup>
//         </Form.Group>

//         <Form.Group>
//           <div className="d-flex flex-column align-items-center bg-base-100 mt-3">
//             {!verified && (
//               <CaptchaComponent
//                 onVerify={() => {
//                   setVerified(true);
//                   setCaptchaError(false);
//                 }}
//               />
//             )}
//             {captchaError && !verified && (
//               <div className="text-danger mt-2">
//                 Please complete the CAPTCHA before submitting.
//               </div>
//             )}
//           </div>
//         </Form.Group>

//         <Col className="text-center mt-3">
//           <Button type="submit">Generate Password</Button>
//         </Col>
//       </Form>
//     </Row>
//   );
// }

// export default PasswordGenerateForm;

import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { FaLock } from "react-icons/fa";
import CaptchaComponent from '../CaptchaComponent';
import axios from 'axios';

function PasswordGenerateForm() {
  const [searchParams] = useSearchParams();
  const { role_slug } = useParams(); // Get the current role slug from the URL
  const [validated, setValidated] = useState(false);
  const [verified, setVerified] = useState(false);
  const [captchaError, setCaptchaError] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const email = searchParams.get('email');
  const token = searchParams.get('token');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    const passwordsMatch = password === confirmPassword;

    if (form.checkValidity() === false || !verified || !passwordsMatch) {
      event.stopPropagation();
      setCaptchaError(!verified);
      setPasswordMatchError(!passwordsMatch);
    } else {
      try {
        const res = await axios.post('http://localhost:5000/api/password-setup', {
          email,
          token,
          password,
        });

        console.log("Password updated:", res.data);
        alert('Password successfully set!');

        // ✅ Redirect to login page using current role_slug
        navigate(`/${role_slug}/login?success=${encodeURIComponent('Password has been generated successfully')}`);
      } catch (err) {
        console.error('Error setting password:', err);
        alert('Failed to set password.');
      }

      setCaptchaError(false);
      setPasswordMatchError(false);
    }

    setValidated(true);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordMatchError(e.target.value !== confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordMatchError(password !== e.target.value);
  };

  return (
    <Row>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group as={Col} md="12" controlId="emailInput">
          <Form.Label>Email Address</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text>@</InputGroup.Text>
            <Form.Control
              type="text"
              value={email || ''}
              readOnly
            />
          </InputGroup>
        </Form.Group>

        <Form.Group as={Col} md="12" controlId="passwordInput">
          <Form.Label>Enter Password</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text><FaLock /></InputGroup.Text>
            <Form.Control
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={handlePasswordChange}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid password.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group as={Col} md="12" controlId="confirmPasswordInput">
          <Form.Label>Enter Confirm Password</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text><FaLock /></InputGroup.Text>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              isInvalid={passwordMatchError}
            />
            <Form.Control.Feedback type="invalid">
              Passwords do not match.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group>
          <div className="d-flex flex-column align-items-center bg-base-100 mt-3">
            {!verified && (
              <CaptchaComponent
                onVerify={() => {
                  setVerified(true);
                  setCaptchaError(false);
                }}
              />
            )}
            {captchaError && !verified && (
              <div className="text-danger mt-2">
                Please complete the CAPTCHA before submitting.
              </div>
            )}
          </div>
        </Form.Group>

        <Col className="text-center mt-3">
          <Button type="submit">Generate Password</Button>
        </Col>
      </Form>
    </Row>
  );
}

export default PasswordGenerateForm;
