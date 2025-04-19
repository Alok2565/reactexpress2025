import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, Form, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function AddUser() {
  const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: '',
//     name: '',
//     email: '',
//     role_id: '',
//     status: '1'
//   });
  const [formData, setFormData] = useState({ name: '',username:'', email: '', role_id: '', status: '1' });
  const [roles, setRoles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/roles')
      .then(resp => resp.json())
      .then(data => setRoles(data))
      .catch(err => console.error('Error fetching roles:', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    if (!formData.name.trim()) {
      alert('Name is required');
      return;
    }
    if (!formData.username.trim()) {
      alert('Username is required');
      return;
    }
    if (!formData.email.trim()) {
      alert('Email is required');
      return;
    }
    if (!formData.role_id) {
      alert('Role is required');
      return;
    }

    setIsSubmitting(true);
    try {
      const resp = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (resp.ok) {
        //navigate('/admin/users');
        navigate('/admin/users?success=User added successfully');
      } else {
        const err = await resp.json();
        alert(err.error || 'Failed to add user');
      }
    } catch (err) {
      alert('Network error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-content py-2">
    <Container fluid>
      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <h4 className="mb-3">Add User</h4>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" name="name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" name="username" value={formData.username} onChange={e => setFormData({ ...formData, username: e.target.value })} required/>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Role</Form.Label>
                  <Form.Select name="role_id" value={formData.role_id} onChange={e => setFormData({ ...formData, role_id: e.target.value })} required>
                    <option value="">-- Select Role --</option>
                    {roles.map(role => (
                      <option key={role._id} value={role._id}>{role.role_name}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select name="status" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </Form.Select>
                </Form.Group>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <Spinner animation="border" size="sm" /> : 'Add User'}
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
  );
}

export default AddUser;
