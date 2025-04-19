import React, { useEffect, useState } from 'react';
import { Container, Table, Row, Col, Card, CardBody, Button, Spinner, Alert } from 'react-bootstrap';
import { Link, useLocation} from 'react-router-dom';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/users');
      if (!res.ok) throw new Error('Error fetching users');
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const successMessage = queryParams.get('success');
const [show, setShow] = useState(true);
  return (
    <div className="page-content py-2">
    <Container fluid>
      <Row>
        <Col>
        <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>User List</h4>
                <Button as={Link} to="/admin/add-user" variant="primary">Add New User</Button>
              </div>
          <Card>
          <div>
  {/* {successMessage && <div className="alert alert-success">{successMessage}</div>} */}
  
  {successMessage && show && (
    <Alert variant="success" size="sm" onClose={() => setShow(false)} dismissible>
      <p><strong>Success!</strong> {successMessage}</p>
    </Alert>
  )}

  {/* Your role list table here */}
</div>

            <CardBody>
              
              {loading ? (
                <Spinner animation="border" />
              ) : error ? (
                <Alert variant="danger">{error}</Alert>
              ) : (
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr key={user._id}>
                        <td>{index + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role_id?.role_name}</td>
                        <td>{user.status === '1' ? 'Active' : 'Inactive'}</td>
                        <td>
                          {/* Add edit/delete functionality later */}
                          <Link to={`/admin/edit-user/${user._id}`}><Button size="sm" variant="outline-primary" className="me-2">Edit</Button></Link>
                          <Button size="sm" variant="outline-danger">Delete</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
  );
}

export default Users;
