import React, { useState } from 'react';
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';
import { Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import { FaLock } from 'react-icons/fa';
import axios from 'axios';
import CaptchaComponent from '../CaptchaComponent';

export default function ImpExpPasswordGeneration() {
  const [searchParams] = useSearchParams();
  const { role_slug } = useParams();
  const navigate = useNavigate();

  const [validated, setValidated] = useState(false);
  const [verified, setVerified] = useState(false);
  const [captchaError, setCaptchaError] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const iec_code = searchParams.get('iec_code');
  const token = searchParams.get('token');

  const handleSubmit = async e => {
    e.preventDefault();
    const form = e.currentTarget;
    const passwordsMatch = password === confirmPassword;

    if (form.checkValidity() === false || !verified || !passwordsMatch) {
      e.stopPropagation();
      setCaptchaError(!verified);
      setPasswordMatchError(!passwordsMatch);
      setValidated(true);
      return;
    }
    try {
      const res = await axios.post('http://localhost:5000/api/impexp-password-setup', {
        iec_code,
        token,
        password,
      });
      alert(res.data.message);
      navigate(`/${role_slug}/login?success=${encodeURIComponent('Password set successfully')}`);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to set password.');
    }
  };

  return (
    <Row className="justify-content-center">
      <Col md={6}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>IEC Code</Form.Label>
            <Form.Control value={iec_code || ''} readOnly />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>New Password</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text><FaLock /></InputGroup.Text>
              <Form.Control
                required
                type="password"
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                  setPasswordMatchError(e.target.value !== confirmPassword);
                }}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid password.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text><FaLock /></InputGroup.Text>
              <Form.Control
                required
                type="password"
                value={confirmPassword}
                isInvalid={passwordMatchError}
                onChange={e => {
                  setConfirmPassword(e.target.value);
                  setPasswordMatchError(password !== e.target.value);
                }}
              />
              <Form.Control.Feedback type="invalid">
                Passwords do not match.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          {!verified && (
            <CaptchaComponent onVerify={() => {
              setVerified(true);
              setCaptchaError(false);
            }} />
          )}
          {captchaError && !verified && (
            <div className="text-danger mt-2">Please complete the CAPTCHA.</div>
          )}

          <div className="text-center">
            <Button type="submit">Generate Password</Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
}
