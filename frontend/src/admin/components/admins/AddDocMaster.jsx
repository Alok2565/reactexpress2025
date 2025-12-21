// import React from 'react'

// function AddDocMaster() {
//   return (
//     <div>
//       Add Doc Master
//     </div>
//   )
// }

// export default AddDocMaster

import React, { useState } from "react";
import axios from "axios";
import { Container, Col, Row, Form, Button, Card } from "react-bootstrap";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function AddHsCodeItem() {
  const [doc_type, setDcoType] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    setValidated(true);
    setLoading(true);
    const insertData = {
      doc_type,
      description,
    };
    try {
      await axios.post("http://localhost:5000/api/doc_masters", insertData);
      navigate(
        "/admin/doc-masters?success=Doc Masters%20has%20been%20created%20successfully"
      );
    } catch (error) {
      //console.error("Natural of biomaterial creation failed:", error.response?.data);
      alert("Error: " + (error.response?.data?.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="page-content py-3">
      <Container fluid>
        <Row>
          <Col xl={12}>
            <div className="page-title-box d-flex justify-content-between align-items-center">
              <h4
                className="page-title text-start"
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#14468C",
                }}
              >
                Add Doc Master
              </h4>
              <div className="page-title-right">
                <button
                  className="btn btn-primary mb-2"
                  style={{ backgroundColor: "#14468C", border: "none" }}
                  onClick={() => navigate("/admin/doc-masters")}
                >
                  <FaLongArrowAltLeft /> Back
                </button>
              </div>
            </div>
          </Col>
        </Row>

        <div className="container">
          <Card>
            <Card.Body>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="Doc_Type">
                    <Form.Label>
                      Document Type
                      <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      value={doc_type}
                      onChange={(e) => setDcoType(e.target.value)}
                      required
                      placeholder="doc_type"
                      autoComplete="off"
                    />
                  </Form.Group>

                  <Form.Group as={Col} md="6" controlId="description">
                    <Form.Label>
                      Doc Description
                      <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                      placeholder="description"
                      autoComplete="off"
                      rows={2}
                    />
                  </Form.Group>
                </Row>
                <Button type="submit" disabled={loading}>
                  {loading ? "Adding..." : "Add Doc Master"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
}

export default AddHsCodeItem;
