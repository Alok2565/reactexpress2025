import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, Table, Button, Spinner } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

function Roles() {
    
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const successMessage = queryParams.get('success');

  // Fetch roles from the backend
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/roles');
        const data = await res.json();
        setRoles(data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch roles', err);
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  return (
    <div className="page-content py-2">
      <Container fluid>
        <Row>
          <Col lg={12}>
            <div className="page-title-box">
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="mb-3" style={{ color: "#14468C", fontWeight: 600 }}>Role List</h4>
                <Link to="/admin/add-role">
                  <Button className="btn btn-primary mb-2" style={{ backgroundColor: "#14468C", borderColor: "#14468C" }}>
                    Add New Role
                  </Button>
                </Link>
              </div>
            </div>
          </Col>
        </Row>

        <Card>
        <div>
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {/* Your role list table here */}
    </div>
          <CardBody>
            {loading ? (
              <div className="text-center py-3">
                <Spinner animation="border" variant="primary" />
              </div>
            ) : (
              <Table bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Role Name</th>
                    <th>Slug</th>
                    <th>Created At</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {roles.map((role, index) => (
                    <tr key={role._id}>
                      <td>{index + 1}</td>
                      <td>{role.role_name}</td>
                      <td>{role.role_slug}</td>
                      <td>{new Date(role.createdAt).toLocaleDateString()}</td>
                      <td>{role.status}</td>
                      <td>
                        {/* Add edit/delete logic here */}
                        <Button variant="warning" size="sm" className="me-2">Edit</Button>
                        <Button variant="danger" size="sm">Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </CardBody>
        </Card>
      </Container>
    </div>
  );
}

export default Roles;
