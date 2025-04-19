import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card, CardBody } from 'react-bootstrap';

function EditUser() {
  const { id } = useParams(); // user id from URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    role_id: '',
    status: '1'
  });
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load roles
  useEffect(() => {
    fetch('http://localhost:5000/api/roles')
      .then(res => res.json())
      .then(data => setRoles(data))
      .catch(err => console.error('Failed to fetch roles'));
  }, []);

  // Load user data
  useEffect(() => {
    fetch(`http://localhost:5000/api/users/${id}`)
      .then(res => res.json())
      .then(data => {
        setFormData({
          username: data.username || '',
          name: data.name || '',
          email: data.email || '',
          role_id: data.role_id || '',
          status: data.status || '1'
        });
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading user:', err);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (response.ok) {
        //alert('User updated successfully');
        //navigate('/admin/users');
        navigate('/admin/users?success=User updated successfully');
      } else {
        alert(result.error || 'Something went wrong');
      }
    } catch (err) {
      alert('Network error');
    }
  };

  if (loading) return <p>Loading user...</p>;

  return (
    <div className="page-content py-2">
      <Container fluid>
        <Row>
          <Col lg={12}>
            <div className="page-title-box d-flex justify-content-between align-items-center">
              <h4 style={{ color: "#14468C", fontWeight: 600 }}>Edit User</h4>
              <Button className="btn btn-primary" style={{ backgroundColor: "#14468C", borderColor: "#14468C" }}>
                <Link className="text-white text-decoration-none" to="/admin/users">Back to List</Link>
              </Button>
            </div>
          </Col>
        </Row>
        <Card>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col lg={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} required />
                  </Form.Group>
                </Col>
                <Col lg={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
                  </Form.Group>
                </Col>
                <Col lg={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
                  </Form.Group>
                </Col>
                <Col lg={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Role</Form.Label>
                    <Form.Select name="role_id" value={formData.role_id} onChange={handleChange} required>
                      <option value="">-- Select Role --</option>
                      {roles.map(role => (
                        <option key={role._id} value={role._id}>{role.role_name}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col lg={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Status</Form.Label>
                    <Form.Select name="status" value={formData.status} onChange={handleChange}>
                      <option value="1">Active</option>
                      <option value="0">Inactive</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col lg={12}>
                  <Button type="submit" variant="primary">Update User</Button>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
}

export default EditUser;
