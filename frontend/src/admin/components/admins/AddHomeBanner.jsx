import React, { useState,useEffect } from 'react';
import { Card, Col, Container, Row, Form, Button } from 'react-bootstrap';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddHomeBanner() {
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [banner_link, setLink] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
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

    const formData = new FormData();
    formData.append('name', name);
    formData.append('slug', slug);
    formData.append('banner_link', banner_link);
    formData.append('description', description);
    formData.append('image', image); // file object

    try {
        await axios.post("http://localhost:5000/api/home_sliders", formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        navigate("/admin/home-banners?success=Banner%20Slider%20created%20successfully");
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
                                Add Home Banner
                            </h4>
                            <div className="page-title-right">
                                <button
                                    className="btn btn-primary mb-2"
                                    style={{ backgroundColor: "#14468C", border: "none" }}
                                    onClick={() => navigate("/admin/home-banners")}>
                                    <FaLongArrowAltLeft /> Back
                                </button>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Card>
                    <Card.Body>
                        <Form noValidate validated={validated} onSubmit={handleSubmit} enctype="multipart/form-data">
                            <Row className="mb-3">
                                <Form.Group as={Col} md="4" controlId="bannerName">
                                    <Form.Label>Name of Banner Slider <span className="text-danger">*</span></Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        placeholder="Name"
                                        autoComplete="off"
                                    />
                                </Form.Group>

                                <Form.Group as={Col} md="4" controlId="bannerSlug">
                                    <Form.Label>Slug of Banner Slider <span className="text-danger">*</span></Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={slug}
                                        onChange={(e) => setSlug(e.target.value)}
                                        required
                                        placeholder="Slug"
                                        autoComplete="off"
                                    />
                                </Form.Group>

                                <Form.Group as={Col} md="4" controlId="bannerLink">
                                    <Form.Label>Banner Link <span className="text-danger">*</span></Form.Label>
                                    <Form.Control
                                        type="url"
                                        value={banner_link}
                                        onChange={(e) => setLink(e.target.value)}
                                        placeholder="Link"
                                        autoComplete="off"
                                    />
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} md="8" controlId="bannerDescription">
                                    <Form.Label>Banner Description <span className="text-danger">*</span></Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                        placeholder="Description"
                                        autoComplete="off"
                                    />
                                </Form.Group>

                                <Form.Group as={Col} md="4" controlId="bannerImage">
                                    <Form.Label>Upload Image <span className="text-danger">*</span></Form.Label>
                                    <Form.Control
                                        type="file"
                                        onChange={(e) => setImage(e.target.files[0])}
                                        required
                                        accept="image/*"
                                    />
                                </Form.Group>
                            </Row>

                            <Button type="submit" disabled={loading} style={{ backgroundColor: "#14468C", border: "none" }}>
                                {loading ? "Adding..." : "Add Banner Slider"}
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}

export default AddHomeBanner;
