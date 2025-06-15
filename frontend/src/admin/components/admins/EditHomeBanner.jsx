// Components/EditHomeBanner.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Col, Row, Form, Button, Card } from 'react-bootstrap';
import { FaLongArrowAltLeft } from 'react-icons/fa';

function EditHomeBanner() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [banner_link, setLink] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
     const [previewImage, setPreviewImage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/home_sliders/${id}`);
                const home_slider = response.data;
                setName(home_slider.name);
                setSlug(home_slider.slug);
                setLink(home_slider.banner_link);
                setDescription(home_slider.description);
                 setPreviewImage(`http://localhost:5000/uploads/banner_sliders/${home_slider.image}`);
            } catch (error) {
                alert("Failed to fetch Banner Slider details: " + error.message);
            }
        };
        fetchData();
    }, [id]);

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('slug', slug);
            formData.append('banner_link', banner_link);
            formData.append('description', description);
            if (image) formData.append('image', image);

            const response = await fetch(`http://localhost:5000/api/home_sliders/update/${id}`, {
                method: 'PUT',
                body: formData,
            });

            const data = await response.json();
            if (response.ok) {
                navigate("/admin/home-banners?success=Banner%20Slider%20Updated%20Successfully");
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
                                Update Home Banner Slider
                            </h4>
                            <div className="page-title-right">
                                <button
                                    className="btn btn-primary mb-2"
                                    style={{ backgroundColor: "#14468C", border: "none" }}
                                    onClick={() => navigate("/admin/home-banners")}
                                >
                                    <FaLongArrowAltLeft /> Back
                                </button>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Card>
                    <Card.Body>
                        <Form noValidate onSubmit={handleUpdateUser} encType="multipart/form-data">
                            <Row className="mb-3">
                                <Form.Group as={Col} md="4">
                                    <Form.Label>Name of Banner Slider <span className="text-danger">*</span></Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        placeholder="Name"
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md="4">
                                    <Form.Label>Slug of Banner Slider <span className="text-danger">*</span></Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={slug}
                                        onChange={(e) => setSlug(e.target.value)}
                                        required
                                        placeholder="Slug"
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md="4">
                                    <Form.Label>Banner Link <span className="text-danger">*</span></Form.Label>
                                    <Form.Control
                                        type="url"
                                        value={banner_link}
                                        onChange={(e) => setLink(e.target.value)}
                                        placeholder="Link"
                                    />
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} md="8">
                                    <Form.Label>Banner Description <span className="text-danger">*</span></Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                        placeholder="Description"
                                    />
                                </Form.Group>

                                <Form.Group as={Col} md="4">
                                    <Form.Label>Upload Image <span className="text-danger">*</span></Form.Label>
                                    <Form.Control
                                        type="file"
                                        onChange={(e) => setImage(e.target.files[0])}
                                        accept="image/*"
                                    />
                                     {previewImage && (
                                        <div className="mt-2">
                                            <img
                                                src={previewImage}
                                                alt="Preview"
                                                style={{ width: "150px", height: "auto" }}
                                            />
                                        </div>
                                    )}
                                </Form.Group>
                               
                            </Row>

                            <Button type="submit" disabled={loading} style={{ backgroundColor: "#14468C", border: "none" }}>
                                {loading ? "Updating..." : "Update Banner Slider"}
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}

export default EditHomeBanner;
