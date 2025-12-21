import React, {useState} from "react";
import { Container, Col, Form, Button, Row } from "react-bootstrap";
import CaptchaComponent from '../CaptchaComponent';

function LoginOtpAuthenticate() {
     const [verified, setVerified] = useState(false);
  return (
    <>
      <Container>
        <Row>
          <Col className="com-md-12">
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>One Time Password (OTP)</Form.Label>
                <Form.Control required type="number" placeholder="Enter OTP" />
              </Form.Group>
              <Form.Group>
                        <div className="d-flex flex-column align-items-center">
                            {!verified ? (
                                <CaptchaComponent onVerify={() => setVerified(true)} />
                            ) : null}
                        </div>
                    </Form.Group>
              <Col className="d-grid gap-2">
                <Button type="submit">Veryfy OTP</Button>
                </Col>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default LoginOtpAuthenticate;
