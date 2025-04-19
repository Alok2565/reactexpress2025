import React, { useState, useEffect } from 'react'
import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap'
import { FaPenNib, FaPlus,} from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import {Link, useLocation, useNavigate} from "react-router-dom"
import Swal from 'sweetalert2';

function Roles() {
const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const successMessage = queryParams.get("success");
  const [roles, setRoles] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState('');
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/roles');
        const data = await response.json();
        setRoles(data);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };
  
    fetchRoles();
  }, []);
  const handleEdit = (id) => {
    navigate(`/admin/role/edit/${id}`);
  };
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });
    // if (window.confirm("Are you sure you want to delete this role?")) {
    //   try {
    //     const response = await fetch(`http://localhost:5000/api/roles/${id}`, {
    //       method: 'DELETE',
    //     });
    //     const data = await response.json();
    //     if (response.ok) {
    //       setDeleteMessage("Role has been deleted successfully.");
          
    //     } else {
    //       // alert("Delete failed: " + data.error);
    //       setDeleteMessage("Failed to delete the role." + data.error);
    //     }
    //   } catch (err) {
    //     //alert("An error occurred: " + err.message);
        
    //   setDeleteMessage("Something went wrong. Try again."+ err.message);
    //   }
    

  if (result.isConfirmed) {
    try {
      const response = await fetch(`http://localhost:5000/api/roles/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        
        Swal.fire(
          'Deleted!',
          'Role has been deleted.',
          'success'
        );
        setDeleteMessage("Role has been deleted successfully.");
        // Optional: redirect after success
        setTimeout(() => {
          setDeleteMessage("Role has been deleted successfully.");
        }, 2000);
      } else {
        Swal.fire('Error!', 'Failed to delete the role.', 'error');
      }
    } catch (err) {
      //console.error("Error deleting role:", error);
      setDeleteMessage("Something went wrong. Try again."+ err.message);
      Swal.fire('Oops!', 'Something went wrong.', 'error');
    }
  }
};

 return (
   <>
   <div className="page-content py-3">
      <Container fluid>
        <Row>
          <Col xl={12}>
            <div className="page-title-box d-flex justify-content-between align-items-center">
              <h4
                className="page-title text-start"
                style={{ fontSize: "20px", fontWeight: "600", color: "#14468C" }}>All Role List
              </h4>
              <div className="page-title-right">
                <Link to="/admin/role/add"><button className="btn btn-primary mb-2" style={{ backgroundColor: "#14468C", border: "none" }}> <FaPlus /> Add New Role
                </button></Link>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xl={12}>
          <div>
      {deleteMessage && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Deleted!</strong> {deleteMessage}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )}
    </div>
          {successMessage &&  (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
         <strong>Success!</strong>  {successMessage}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )}
          <Card>
            <Card.Body>
              <Card.Title>Role List</Card.Title>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                  <th>Sr. No</th>
                    <th>Role Name</th>
                    <th>Role Slug</th>
                    <th>Date of Creation</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {roles.map((role, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{role.role_name}</td>
                      <td>{role.role_slug}</td>
                      <td>{new Date(role.createdAt).toLocaleString()}</td>
                      <td>
                        <Button variant={Number(role.status) === 1 ? 'success' : 'danger'}>
                          {Number(role.status) === 1 ? 'Active' : 'Inactive'}
                        </Button>
                       </td>
                      <td>
                        <Button variant="primary" onClick={() => handleEdit(role._id)}><FaPenNib/> Edit</Button>&nbsp;
                        <Button variant="danger" onClick={() => handleDelete(role._id)}><RiDeleteBin6Fill/> Delete</Button>
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

export default Roles
