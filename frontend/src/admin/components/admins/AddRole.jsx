import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Col, Row, Form, Button, Card } from 'react-bootstrap';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function AddRole() {
  const navigate = useNavigate();
  const [role_name, setRoleName] = useState('');
  const [role_slug, setRoleSlug] = useState('');
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const generateSlug = (name) => {
      return name
        .toLowerCase()
        .trim()
        .replace(/[\s\W-]+/g, '-')
        .replace(/^-+|-+$/g, '');
    };

    setRoleSlug(generateSlug(role_name));
  }, [role_name]);

  const handleValidation = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  const handleRole = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/roles", { role_name, role_slug });
      setRoleName("");
      setRoleSlug("");
      //alert("Role created successfully");
      navigate("/admin/roles?success=Role%20has%20been%20created%20successfully");
    } catch (error) {
      console.error("Role creation failed:", error);

      if (error.response) {
        alert("Error: " + (error.response?.data?.error || "Unknown error"));
      } else if (error.request) {
        alert("Error: No response from server");
      } else {
        alert("Error: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="page-content py-3">
        <Container fluid>
          <Row>
            <Col xl={12}>
              <div className="page-title-box d-flex justify-content-between align-items-center">
                <h4
                  className="page-title text-start"
                  style={{ fontSize: "20px", fontWeight: "600", color: "#14468C" }}>Add Role
                </h4>
                <div className="page-title-right">
                  <button className="btn btn-primary mb-2" style={{ backgroundColor: "#14468C", border: "none" }}> <FaLongArrowAltLeft /> Back
                  </button>
                </div>
              </div>
            </Col>
          </Row>
          <div className="container">
            <Row>
              <Col xl={12}>
                <Card>
                  <Card.Body>
                    <Form noValidate validated={validated} onSubmit={handleValidation}>
                      <Row className="mb-3">
                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                          <Form.Label>Role Name <span className="text-danger">*</span></Form.Label>
                          <Form.Control
                            value={role_name}
                            onChange={(e) => setRoleName(e.target.value)} required placeholder="name"
                            autoComplete="off"
                          />
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                          <Form.Label>Role Slug <span className="text-danger">*</span></Form.Label>
                          <Form.Control
                            value={role_slug}
                            onChange={(e) => setRoleSlug(e.target.value)}
                            required
                            placeholder="Slug"
                            autoComplete="off"
                          />
                        </Form.Group>
                      </Row>
                      <Button
                        onClick={handleRole}
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? "Adding..." : "Add Role"}
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
}

export default AddRole;
