import { useState } from "react";
import { Card, CardBody, Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

function ForgotPassword() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  return (
    <>
      <div className="page-content py-3">
        <Container>
            <Row>
                    <Col xl={12}>
                        <div className="page-title-box d-flex justify-content-between align-items-center">
                            <h4 className="page-title text-start" style={{ fontSize: "20px", fontWeight: "600", color: "#14468C" }}>
                                Change Password
                            </h4>
                        </div>
                    </Col>
                </Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Row>
              <Card>
                <Card.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="validationCustom01">
                  <Form.Label>Current Passowrd</Form.Label>
                  <Form.Control
                    required
                    type="pasword"
                    placeholder="Current Password"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="validationCustom02">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    required
                    type="pasword"
                    placeholder="New Password"
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="validationCustomUsername"
                >
                  <Form.Label>Confirm Password</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="Password"
                      placeholder="Confirm Password"
                      aria-describedby="inputGroupPrepend"
                      required
                    />
                  </InputGroup>
                </Form.Group>
                <Button type="submit">Change Password</Button>
              </Form>
                </Card.Body>
              </Card>
            </Row>
          </Col>
        </Container>
      </div>
    </>
  );
}

export default ForgotPassword;
