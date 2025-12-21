// import React from 'react'

// function EditDocMaster() {
//   return (
//     <div>
//       Edit Doc Master
//     </div>
//   )
// }

// export default EditDocMaster

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Col, Row, Form, Button, Card } from 'react-bootstrap';
import { FaLongArrowAltLeft } from 'react-icons/fa';

function EditDocMaster() {
    const { id } = useParams();
    const navigate = useNavigate();

     const [doc_type, setDcoType] = useState("");
      const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/doc_masters/${id}`);
            const docMaster_Data = response.data;
            setDcoType(docMaster_Data.doc_type);
            setDescription(docMaster_Data.description);
        } catch (error) {
            alert("Failed to fetch user details: " + error.message);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const updateData = {
                doc_type,
                description,
            };
            const response = await fetch(`http://localhost:5000/api/doc_masters/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData),
            });

            const data = await response.json();
            if (response.ok) {
                navigate("/admin/doc-masters?success=Doc Master%20has%20been%20Updated%20successfully");
            } else {
                alert("Update failed: " + data.error);
            }
        } catch (err) {
            alert("An error occurred: " + err.message);
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
                            <h4 className="page-title text-start" style={{ fontSize: "20px", fontWeight: "600", color: "#14468C" }}>
                                Update Doc Masters
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
                            <Form onSubmit={handleUpdateUser}>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="6" controlId="doc_type">
                                        <Form.Label>Document Master<span className="text-danger">*</span></Form.Label>
                                        <Form.Control
                                            value={doc_type}
                                            onChange={(e) => setDcoType(e.target.value)}
                                            required
                                            placeholder="doc_type"
                                            autoComplete="off"
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} md="6" controlId="description">
                                        <Form.Label>Doc Description<span className="text-danger">*</span></Form.Label>
                                        <Form.Control as="textarea"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            required
                                            placeholder="description"
                                            autoComplete="off" rows={2} />
                                    </Form.Group>
                                </Row>
                                <Button type="submit" disabled={loading}>
                                    {loading ? "Updating..." : "Update Doc Master"}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        </div>
    );
}

export default EditDocMaster;
