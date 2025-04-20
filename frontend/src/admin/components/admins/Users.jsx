// import React, { useEffect, useState } from 'react'
// import { Button, Container, Row, Col, Card, Table } from 'react-bootstrap';
// import { Link, useLocation } from "react-router-dom"
// import { FaPenNib, FaPlus, } from "react-icons/fa";
// import { RiDeleteBin6Fill } from "react-icons/ri";
// import { MdOutlineToggleOn, MdOutlineToggleOff } from "react-icons/md";
// import { useNavigate } from "react-router-dom";
// import axios from 'axios';
// // import Swal from 'sweetalert2';
// function Users() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const successMessage = queryParams.get("success");

//   const [users, setUsers] = useState([]);

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/users');
//       setUsers(response.data);
//     } catch (err) {
//       console.error('Error fetching users:', err);
//     }
//   };
//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const handleEdit = (id) => {
//     navigate(`/admin/user/edit/${id}`);
//   };

//   const handleStatus = async (id) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/users/status/${id}`, {
//         method: 'PUT',
//       });
//       const data = await response.json();
//       if (response.ok) {
//         alert("User status updated successfully.");
//         fetchUsers();
//       } else {
//         alert("Failed to update role status: " + data.error);
//       }
//     } catch (err) {
//       console.error("Error updating role status:", err);
//     }
//   };

//   return (
//     <>
//       <div className="page-content py-3">
//         <Container fluid>
//           <Row>
//             <Col xl={12}>
//               <div className="page-title-box d-flex justify-content-between align-items-center">
//                 <h4
//                   className="page-title text-start"
//                   style={{ fontSize: "20px", fontWeight: "600", color: "#14468C" }}>All User List
//                 </h4>
//                 <div className="page-title-right">
//                   <Link to="/admin/user/add"><button className="btn btn-primary mb-2" style={{ backgroundColor: "#14468C", border: "none" }}> <FaPlus /> Add New User
//                   </button></Link>
//                 </div>
//               </div>
//             </Col>
//           </Row>
//           <Row>
//             <Col xl={12}>
//               {successMessage && (
//                 <div className="alert alert-success alert-dismissible fade show" user="alert">
//                   <strong>Success!</strong>  {successMessage}
//                   <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
//                 </div>
//               )}
//               <Card>
//                 <Card.Body>
//                   <Card.Title>user List</Card.Title>
//                   <Table striped bordered hover responsive>
//                     <thead>
//                       <tr>
//                         <th>Sr. No</th>
//                         <th>Name</th>
//                         <th>Email</th>
//                         <th>Designation</th>
//                         <th>Mobile Number</th>
//                         <th>Address</th>
//                         <th>Date of Creation</th>
//                         <th>Status</th>
//                         <th>Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {users.map((user, index) => (
//                         <tr key={index}>
//                           <td>{index + 1}</td>
//                           <td>{user.name}</td>
//                           <td>{user.email}</td>
//                           <td>{user.designation}</td>
//                           <td>{user.mobile_number}</td>
//                           <td>{user.address}</td>
//                           <td>{new Date(user.createdAt).toLocaleString()}</td>
//                           <td>
//                             <Button onClick={() => handleStatus(user._id)} variant={user.status === '1' ? 'success' : 'danger'}>
//                               {user.status === '1' ? <MdOutlineToggleOn /> : <MdOutlineToggleOff />}
//                             </Button>
//                           </td>
//                           <td>
//                             <Button variant="primary" onClick={() => handleEdit(user._id)}><FaPenNib /> Edit</Button>&nbsp;
//                             {/* <Button variant="primary" ><FaPenNib /> Edit</Button>&nbsp; */}
//                             <Button variant="danger" ><RiDeleteBin6Fill /> Delete</Button>
//                           </td>
//                         </tr>
//                       )
//                       )}
//                     </tbody>
//                   </Table>
//                 </Card.Body>
//               </Card>
//             </Col>
//           </Row>
//         </Container>
//       </div>
//     </>
//   )
// }


import React, { useEffect, useState } from 'react'
import { Button, Container, Row, Col, Card, Table, Form } from 'react-bootstrap';
import { Link, useLocation } from "react-router-dom"
import { FaPenNib, FaPlus } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdOutlineToggleOn, MdOutlineToggleOff } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';


function Users() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const successMessage = queryParams.get("success");
  const [deleteMessage, setDeleteMessage] = useState('')

  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  // const usersPerPage = 10;
  const [usersPerPage, setUsersPerPage] = useState(4);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (id) => {
    navigate(`/admin/user/edit/${id}`);
  };

  const handleStatus = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/status/${id}`, {
        method: 'PUT',
      });
      const data = await response.json();
      if (response.ok) {
        alert("User status updated successfully.");
        fetchUsers();
      } else {
        alert("Failed to update role status: " + data.error);
      }
    } catch (err) {
      console.error("Error updating role status:", err);
    }
  };
const handleDelete = async(id) => {
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
      });
  
      if (result.isConfirmed) {
        try {
          const response = await fetch(`http://localhost:5000/api/users/delete/${id}`, {
            method: 'DELETE',
          })
  
          if (response.ok) {
            Swal.fire('Deleted!', 'User has been deleted.', 'success')
            setDeleteMessage('User has been deleted successfully.')
            fetchUsers()
          } else {
            Swal.fire('Error!', 'Failed to delete the user.', 'error')
          }
        } catch (err) {
          setDeleteMessage('Something went wrong. Try again.' + err.message)
          Swal.fire('Oops!', 'Something went wrong.', 'error')
        }
      }
  }
  
  // Filtered and paginated users
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.mobile_number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
  };

  return (
    <>
      <div className="page-content py-3">
        <Container fluid>
          <Row>
            <Col xl={12}>
              <div className="page-title-box d-flex justify-content-between align-items-center">
                <h4 className="page-title text-start" style={{ fontSize: "20px", fontWeight: "600", color: "#14468C" }}>All User List</h4>
                <div className="page-title-right">
                  <Link to="/admin/user/add">
                    <button className="btn btn-primary mb-2" style={{ backgroundColor: "#14468C", border: "none" }}>
                      <FaPlus /> Add New User
                    </button>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xl={12}>
            {deleteMessage && (
          <div
            className="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            <strong>Deleted!</strong> {deleteMessage}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
            ></button>
          </div>
        )}
              {successMessage && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                  <strong>Success!</strong> {successMessage}
                  <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
              )}

              <Card>
                <Card.Body>
                  <div style={{ overflowX: 'auto' }}>
                  <Row className="mb-3 align-items-center">
  <Col md={6}>
    <div className="d-flex align-items-center">
      <label className="me-2 mb-0">Show entries</label>
      <Form.Select
        style={{ width: '80px' }}
        value={usersPerPage}
        onChange={(e) => {
          setCurrentPage(1); // Reset to page 1 on change
          setUsersPerPage(Number(e.target.value));
        }}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </Form.Select>
    </div>
  </Col>
  <Col md={6} className="text-end">
    <Form.Control
      type="text"
      placeholder="Search"
      value={searchTerm}
      onChange={(e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page on search
      }}
      style={{ maxWidth: '250px', marginLeft: 'auto' }}
    />
  </Col>
</Row>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Sr. No</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Designation</th>
                          <th>Mobile Number</th>
                          <th>Address</th>
                          <th>Date of Creation</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentUsers.length > 0 ? (
                          currentUsers.map((user, index) => (
                            <tr key={user._id}>
                              <td>{indexOfFirstUser + index + 1}</td>
                              <td>{user.name}</td>
                              <td>{user.email}</td>
                              <td>{user.designation}</td>
                              <td>{user.mobile_number}</td>
                              <td>{user.address}</td>
                              <td>{new Date(user.createdAt).toLocaleString()}</td>
                              <td>
                                <Button onClick={() => handleStatus(user._id)} variant={user.status === '1' ? 'success' : 'danger'}>
                                  {user.status === '1' ? <MdOutlineToggleOn /> : <MdOutlineToggleOff />}
                                </Button>
                              </td>
                              <td>
                                <Button variant="primary" onClick={() => handleEdit(user._id)}><FaPenNib /></Button>&nbsp;
                                <Button variant="danger" onClick={() => handleDelete(user._id)}><RiDeleteBin6Fill /></Button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="9" className="text-center">No users found.</td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  </div>

                  {/* Pagination Controls */}
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <div>Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} entries</div>
                    <div>
                      <nav>
                        <ul className="pagination mb-0">
                          {[...Array(totalPages)].map((_, idx) => (
                            <li key={idx} className={`page-item ${currentPage === idx + 1 ? 'active' : ''}`}>
                              <button className="page-link" onClick={() => handlePageChange(idx + 1)}>
                                {idx + 1}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </nav>
                    </div>
                  </div>

                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Users;


