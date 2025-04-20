// import React, { useState } from 'react'
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { Container, Col, Row, Form, Button, Card } from 'react-bootstrap';
// import { FaLongArrowAltLeft } from 'react-icons/fa';

// function EditRole() {
//     const {id} = useParams();

//     const [role_name, setRoleName] = useState('');
//     const [role_slug, setRoleSlug] = useState('');

//     const [loading, setLoading] = useState(false); 

//     const handleUpdateRole = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//           const response = await fetch(`http://localhost:5000/api/roles/${id}`, {
//             method: 'PUT',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ role_name, role_slug }),
//           });
      
//           const data = await response.json();
//           if (response.ok) {
//             alert("Role updated successfully");
//             // Navigate or refresh
//           } else {
//             alert("Update failed: " + data.error);
//           }
//         } catch (err) {
//           alert("An error occurred: " + err.message);
//         } finally {
//           setLoading(false);
//         }
//       };

//   return (
//     <>
//     <div className="page-content py-3">
//             <Container fluid>
//               <Row>
//                 <Col xl={12}>
//                   <div className="page-title-box d-flex justify-content-between align-items-center">
//                     <h4
//                       className="page-title text-start"
//                       style={{ fontSize: "20px", fontWeight: "600", color: "#14468C" }}>Update Role
//                     </h4>
//                     <div className="page-title-right">
//                       <button className="btn btn-primary mb-2" style={{ backgroundColor: "#14468C", border: "none" }}> <FaLongArrowAltLeft /> Back
//                       </button>
//                     </div>
//                   </div>
//               </Col>
//               </Row>
//               <div className="container">
//               <Row>
//                 <Col xl={12}>
//                 <Card>
//                   <Card.Body>
//               <Form noValidate>
//                 <Row className="mb-3">
//                   <Form.Group as={Col} md="6" controlId="validationCustom01">
//                     <Form.Label>Role Name <span className="text-danger">*</span></Form.Label>
//                     <Form.Control
//                       value={role_name}
//                       onChange={e => setRoleName(e.target.value)}
//                       required
//                       placeholder="name"
//                       autoComplete="off"
//                     />
//                   </Form.Group>
//                   <Form.Group as={Col} md="6" controlId="validationCustom02">
//                     <Form.Label>Role Slug <span className="text-danger">*</span></Form.Label>
//                     <Form.Control
//                       value={role_slug}
//                       onChange={e => setRoleSlug(e.target.value)}
//                       required
//                       placeholder="Slug"
//                       autoComplete="off"
//                     />
//                   </Form.Group>
//                 </Row>
//                 <Button
//                   onClick={handleUpdateRole}
//                   type="submit"
//                   disabled={loading} // Disable button during request
//                 >
//                   {loading ? "Adding..." : "Update Role"}
//                 </Button>
//               </Form>
//                   </Card.Body>
//                 </Card>
//                 </Col>
//               </Row>
//               </div>
//             </Container>
//           </div>
//     </>
//   )
// }

// export default EditRole

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Col, Row, Form, Button, Card } from 'react-bootstrap';
import { FaLongArrowAltLeft } from 'react-icons/fa';

function EditRole() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [role_name, setRoleName] = useState('');
  const [role_slug, setRoleSlug] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/roles/${id}`);
        const role = response.data;
        setRoleName(role.role_name);
        setRoleSlug(role.role_slug);
      } catch (error) {
        alert("Failed to fetch role details: " + error.message);
      }
    };
    fetchRole();
  }, [id]);

  // Handle role update
  const handleUpdateRole = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/roles/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role_name, role_slug }),
      });
  
      const data = await response.json();
      if (response.ok) {
        // alert("Role updated successfully");
        navigate("/admin/roles?success=Role%20has%20been%20Updated%20successfully");
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
    <>
      <div className="page-content py-3">
        <Container fluid>
          <Row>
            <Col xl={12}>
              <div className="page-title-box d-flex justify-content-between align-items-center">
                <h4
                  className="page-title text-start"
                  style={{ fontSize: "20px", fontWeight: "600", color: "#14468C" }}>
                  Update Role
                </h4>
                <div className="page-title-right">
                  <button
                    className="btn btn-primary mb-2"
                    style={{ backgroundColor: "#14468C", border: "none" }}
                    onClick={() => navigate(-1)}
                  >
                    <FaLongArrowAltLeft /> Back
                  </button>
                </div>
              </div>
            </Col>
          </Row>
          <div className="container">
            <Row>
              <Col xl={12}>
                <Card>
                  <Card.Body>
                    <Form noValidate>
                      <Row className="mb-3">
                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                          <Form.Label>
                            Role Name <span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Control
                            value={role_name}
                            onChange={(e) => setRoleName(e.target.value)}
                            required
                            placeholder="Enter role name"
                            autoComplete="off"
                          />
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                          <Form.Label>
                            Role Slug <span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Control
                            value={role_slug}
                            onChange={(e) => setRoleSlug(e.target.value)}
                            required
                            placeholder="Enter role slug"
                            autoComplete="off"
                          />
                        </Form.Group>
                      </Row>
                      <Button onClick={handleUpdateRole}
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? "Updating..." : "Update Role"}
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
}

export default EditRole;

