import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Col, Row, Form, Button, Card } from 'react-bootstrap';
import { FaLongArrowAltLeft } from 'react-icons/fa';

function EditPurposeofSampleStorage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [loading, setLoading] = useState(false);

    // const fetchData = async () => {
    //     try {
    //         const response = await axios.get(`http://localhost:5000/api/samples_storage/${id}`);
    //         const sample_storage = response.data;
    //         setName(sample_storage.name);
    //         setSlug(sample_storage.slug);
    //     } catch (error) {
    //         alert("Failed to fetch user details: " + error.message);
    //     }
    // };
    // useEffect(() => {
    //     fetchData();
    // }, [id]);
useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/samples_storage/${id}`);
            const sample_storage = response.data;
            setName(sample_storage.name);
            setSlug(sample_storage.slug);
        } catch (error) {
            alert("Failed to fetch user details: " + error.message);
        }
    };
    fetchData();
}, [id]);
    const handleUpdateUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const updateData = {
                name,
                slug,
            };
            const response = await fetch(`http://localhost:5000/api/samples_storage/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData),
            });

            const data = await response.json();
            if (response.ok) {
                navigate("/admin/purposeof-samples-storage?success=Purpose of Sample Storage%20has%20been%20Updated%20successfully");
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
                                Update Purpose of Sample Storage
                            </h4>
                            <div className="page-title-right">
                                <button
                                    className="btn btn-primary mb-2"
                                    style={{ backgroundColor: "#14468C", border: "none" }}
                                    onClick={() => navigate("/admin/purposeof-samples-storage")}
                                >
                                    <FaLongArrowAltLeft /> Back
                                </button>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Card>
                    <Card.Body>
                        <div className="container">
                            <Form onSubmit={handleUpdateUser}>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="6" controlId="name">
                                        <Form.Label>Name of Sample Storage <span className="text-danger">*</span></Form.Label>
                                        <Form.Control
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                            autoComplete="off"
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} md="6" controlId="slug">
                                        <Form.Label>Slug of Sample Storage <span className="text-danger">*</span></Form.Label>
                                        <Form.Control
                                            value={slug}
                                            onChange={(e) => setSlug(e.target.value)}
                                            required
                                            autoComplete="off"
                                        />
                                    </Form.Group>
                                </Row>

                                <Button type="submit" disabled={loading}>
                                    {loading ? "Updating..." : "Update Sampe Storage"}
                                </Button>
                            </Form>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}

export default EditPurposeofSampleStorage;


