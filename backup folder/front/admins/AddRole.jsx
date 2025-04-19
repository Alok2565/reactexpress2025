import React, { useState, useEffect } from 'react'
import {Container,Row, Col, Card, CardBody, Form, Button, Alert} from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';

function AddRole() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        role_name: '',
        role_slug: '',
        status: '1' // default value
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        
        // Role name validation
        if (!formData.role_name.trim()) {
            newErrors.role_name = 'Role name is required';
        } else if (formData.role_name.length < 3) {
            newErrors.role_name = 'Role name must be at least 3 characters';
        }

        // Slug validation
        if (!formData.role_slug.trim()) {
            newErrors.role_slug = 'Slug is required';
        } else if (!/^[a-z0-9-]+$/.test(formData.role_slug)) {
            newErrors.role_slug = 'Slug must be lowercase with hyphens only';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleRole = async (e) => {
        e.preventDefault();
        if (validateForm()) {
          setIsSubmitting(true);
          try {
            const response = await fetch('http://localhost:5000/api/roles', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(formData)
            });
      
            if (response.ok) {
              const result = await response.json();
              //alert("Role added successfully");
              setFormData({ role_name: '', role_slug: '',status: '1' });
              navigate('/admin/roles?success=Role added successfully'); // Redirect with query
            } else {
              const error = await response.json();
              alert(error.error || "Something went wrong");
            }
          } catch (err) {
            alert("Network error");
          } finally {
            setIsSubmitting(false);
          }
        }
      };
      

    // Auto-generate slug from role name
    useEffect(() => {
        if (formData.role_name && !formData.role_slug) {
            const slug = formData.role_name
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^a-z0-9-]/g, '');
            setFormData(prev => ({...prev, role_slug: slug}));
        }
    }, [formData.role_name]);
  return (
    <>
    <div className="page-content py-2">
        <Container fluid>
            <Row>
                <Col lg={12}>
                <div className="page-title-box">
                    <div className="d-flex justify-content-between align-items-center">
                        <h4 className="mb-3" style={{ color: "#14468C", fontWeight: 600 }}>Edit Role</h4>
                        <Button className="btn btn-primary mb-2" style={{ backgroundColor: "#14468C", borderColor: "#14468C" }}>
                            <Link className="text-white text-decoration-none" to="/admin/roles" style={{ fontWeight: 600 }}>Back to List</Link>
                        </Button>
                    </div>
                </div>
                </Col>
            </Row>
            <Card>
                <CardBody>
                    <Form onSubmit={handleRole}>
                        <Row className="align-items-center py-3">
                            <Col lg={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Role Name</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="role_name"
                                        value={formData.role_name} 
                                        onChange={handleChange}
                                        isInvalid={!!errors.role_name}
                                        autoComplete="off"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.role_name}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col lg={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Slug</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="role_slug"
                                        value={formData.role_slug} 
                                        onChange={handleChange}
                                        isInvalid={!!errors.role_slug}
                                        autoComplete="off"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.role_slug}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Form.Group className="mb-3">
                                <Button 
                                    type="submit" 
                                    disabled={isSubmitting || Object.keys(errors).length > 0}
                                >
                                    {isSubmitting ? 'Adding...' : 'Add Role'}
                                </Button>
                            </Form.Group>
                        </Row>
                    </Form>
                </CardBody>
            </Card>    
        </Container>
    </div>
    </>
  )
}

export default AddRole
