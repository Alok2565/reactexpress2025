// import React from 'react'

// function EditSampleCollected() {
//     return (
//         <div>

//         </div>
//     )
// }

// export default EditSampleCollected

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Col, Row, Form, Button, Card } from 'react-bootstrap';
import { FaLongArrowAltLeft } from 'react-icons/fa';

function EditSampleCollected() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/samples_collected/${id}`);
            const sample_collected = response.data;
            setName(sample_collected.name);
            setSlug(sample_collected.slug);
        } catch (error) {
            alert("Failed to fetch Sample Collected details: " + error.message);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const handleUpdateData = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const updateData = {
                name,
                slug,
            };
            const response = await fetch(`http://localhost:5000/api/samples_collected/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData),
            });

            const data = await response.json();
            if (response.ok) {
                navigate("/admin/samples-collected?success=Sample Collected%20has%20been%20Updated%20successfully");
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
            <Card>
                <Card.Body>
                    <Container fluid>
                        <Row>
                            <Col xl={12}>
                                <div className="page-title-box d-flex justify-content-between align-items-center">
                                    <h4 className="page-title text-start" style={{ fontSize: "20px", fontWeight: "600", color: "#14468C" }}>
                                        Update Sample Collected
                                    </h4>
                                    <div className="page-title-right">
                                        <button
                                            className="btn btn-primary mb-2"
                                            style={{ backgroundColor: "#14468C", border: "none" }}
                                            onClick={() => navigate("/admin/samples-collected")}
                                        >
                                            <FaLongArrowAltLeft /> Back
                                        </button>
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        <div className="container">
                            <Form onSubmit={handleUpdateData}>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="6" controlId="name">
                                        <Form.Label>Name of Sample Collected <span className="text-danger">*</span></Form.Label>
                                        <Form.Control
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                            autoComplete="off"
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} md="6" controlId="slug">
                                        <Form.Label>Slug of Sample collected <span className="text-danger">*</span></Form.Label>
                                        <Form.Control
                                            value={slug}
                                            onChange={(e) => setSlug(e.target.value)}
                                            required
                                            autoComplete="off"
                                        />
                                    </Form.Group>
                                </Row>

                                <Button type="submit" disabled={loading}>
                                    {loading ? "Updating..." : "Update Sample"}
                                </Button>
                            </Form>

                        </div>
                    </Container>
                </Card.Body>
            </Card>
        </div>
    );
}

export default EditSampleCollected;

