import React, { useEffect, useState } from 'react'
import { Button, Container, Row,Col, Card, Table } from 'react-bootstrap';
import {Link, useLocation} from "react-router-dom"
import { FaPenNib, FaPlus,} from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
// import Swal from 'sweetalert2';
function Users() {

    const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const successMessage = queryParams.get("success");

    const [users, setUsers] = useState([]);
  useEffect(() =>{
    const fetchUsers = async () =>{
        try {
            const response = await fetch('http://localhost:5000/api/users');
            const data = await response.json();
            setUsers(data);
            console.log(data);
            } catch (error) {
                console.error(error);
                }
    };
    fetchUsers();
}, []);
  
  return (
    <>
    <div className="page-content py-3">
          <Container fluid>
            <Row>
              <Col xl={12}>
                <div className="page-title-box d-flex justify-content-between align-items-center">
                  <h4
                    className="page-title text-start"
                    style={{ fontSize: "20px", fontWeight: "600", color: "#14468C" }}>All User List
                  </h4>
                  <div className="page-title-right">
                    <Link to="/admin/user/add"><button className="btn btn-primary mb-2" style={{ backgroundColor: "#14468C", border: "none" }}> <FaPlus /> Add New User
                    </button></Link>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
                <Col xl={12}>
                    {successMessage &&  (
                    <div className="alert alert-success alert-dismissible fade show" user="alert">
                    <strong>Success!</strong>  {successMessage}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                )}
                <Card>
                            <Card.Body>
                              <Card.Title>user List</Card.Title>
                              <Table striped bordered hover responsive>
                                <thead>
                                  <tr>
                                  <th>Sr. No</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Designation</th>
                                    <th>Mobile Number</th>
                                    <th>Date of Creation</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {users.map((user, index) => (
                                    <tr key={index}>
                                      <td>{index + 1}</td>
                                      <td>{user.name}</td>
                                      <td>{user.email}</td>
                                      <td>{user.designation}</td>
                                      <td>{user.mobile_number}</td>
                                      <td>{new Date(user.createdAt).toLocaleString()}</td>
                                      <td>
                                        <Button variant={Number(user.status) === 1 ? 'success' : 'danger'}>
                                          {Number(user.status) === 1 ? 'Active' : 'Inactive'}
                                        </Button>
                                       </td>
                                      <td>
                                        <Button variant="primary" ><FaPenNib/> Edit</Button>&nbsp;
                                        <Button variant="danger" ><RiDeleteBin6Fill/> Delete</Button>
                                      </td>
                                        {/* <td>
                                        <Button variant="primary"><FaPenNib/> Edit</Button>&nbsp;
                                        <Button variant="danger"><RiDeleteBin6Fill/> Delete</Button>
                                        </td> */}
                                    </tr>
                                  )
                                )}
                                </tbody>
                              </Table>
                            </Card.Body>
                          </Card>
                </Col>
            </Row>
    </Container>
    </div>
    </>
  )
}

export default Users
