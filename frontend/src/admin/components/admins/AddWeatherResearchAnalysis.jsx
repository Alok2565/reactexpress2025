import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Col, Row, Form, Button, Card } from 'react-bootstrap';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function AddWeatherResearchAnalysis() {
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [loading, setLoading] = useState(false);
    const [validated, setValidated] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const generateSlug = (name) => {
            return name
                .toLowerCase()
                .trim()
                .replace(/[\s\W-]+/g, '-')
                .replace(/^-+|-+$/g, '');
        };

        setSlug(generateSlug(name));
    }, [name]);

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
            name,
            slug
        };
        try {
            await axios.post("http://localhost:5000/api/research_analysises", insertData);
            navigate("/admin/weather-research-analysises?success=Weather Research Analysis%20has%20been%20created%20successfully");
        } catch (error) {
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
                            <h4 className="page-title text-start" style={{ fontSize: "20px", fontWeight: "600", color: "#14468C" }}>
                                Add Weather Research Analysis
                            </h4>
                            <div className="page-title-right">
                                <button
                                    className="btn btn-primary mb-2"
                                    style={{ backgroundColor: "#14468C", border: "none" }}
                                    onClick={() => navigate("/admin/weather-research-analysises")}
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
                                    <Form.Group as={Col} md="6" controlId="name">
                                        <Form.Label>Name of Weather Research Analysis<span className="text-danger">*</span></Form.Label>
                                        <Form.Control
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                            placeholder="name"
                                            autoComplete="off"
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} md="6" controlId="slug">
                                        <Form.Label>Slug of Weather Research Analysis<span className="text-danger">*</span></Form.Label>
                                        <Form.Control
                                            value={slug}
                                            onChange={(e) => setSlug(e.target.value)}
                                            required
                                            placeholder="Slug"
                                            autoComplete="off"
                                        />
                                    </Form.Group>
                                </Row>
                                <Button type="submit" disabled={loading}>
                                    {loading ? "Adding..." : "Add Research Analysis"}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        </div>
    );
}

export default AddWeatherResearchAnalysis;


