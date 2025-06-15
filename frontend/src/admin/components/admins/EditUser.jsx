import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Col, Row, Form, Button, Card } from "react-bootstrap";
import { FaLongArrowAltLeft } from "react-icons/fa";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("");
  const [address, setAddress] = useState("");
  const [mobile_number, setMobile] = useState("");
  const [role_id, setRoleId] = useState("");
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);

  // const fetchUser = async () => {
  //   try {
  //     const response = await axios.get(`http://localhost:5000/api/users/${id}`);
  //     const user = response.data;
  //     setName(user.name);
  //     setUserName(user.username);
  //     setEmail(user.email);
  //     setDesignation(user.designation);
  //     setAddress(user.address);
  //     setMobile(user.mobile_number);
  //     setRoleId(user.role_id);
  //   } catch (error) {
  //     alert("Failed to fetch user details: " + error.message);
  //   }
  // };

  // const fetchRoles = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:5000/api/roles");
  //     setRoles(response.data);
  //   } catch (error) {
  //     alert("Failed to fetch roles: " + error.message);
  //   }
  // };

  // useEffect(() => {
  //   fetchUser();
  //   fetchRoles();
  // }, []);

  useEffect(() => {
  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/${id}`);
      const user = response.data;
      setName(user.name);
      setUserName(user.username);
      setEmail(user.email);
      setDesignation(user.designation);
      setAddress(user.address);
      setMobile(user.mobile_number);
      setRoleId(user.role_id);
    } catch (error) {
      alert("Failed to fetch user details: " + error.message);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/roles");
      setRoles(response.data);
    } catch (error) {
      alert("Failed to fetch roles: " + error.message);
    }
  };

  fetchUser();
  fetchRoles();
}, [id]);

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updateData = {
        name,
        username,
        email,
        designation,
        address,
        mobile_number,
        role_id,
      };
      const response = await fetch(
        `http://localhost:5000/api/users/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        }
      );

      const data = await response.json();
      if (response.ok) {
        navigate(
          "/admin/users?success=User%20has%20been%20Updated%20successfully"
        );
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
              <h4
                className="page-title text-start"
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#14468C",
                }}
              >
                Update User
              </h4>
              <div className="page-title-right">
                <button
                  className="btn btn-primary mb-2"
                  style={{ backgroundColor: "#14468C", border: "none" }}
                  onClick={() => navigate("/admin/users")}
                >
                  <FaLongArrowAltLeft /> Back
                </button>
              </div>
            </div>
          </Col>
        </Row>
        <Card>
          <Card.Body>
            <div className="container">
              <Form onSubmit={handleUpdateUser}>
                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="name">
                    <Form.Label>
                      Name <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Full name"
                      autoComplete="off"
                    />
                  </Form.Group>

                  <Form.Group as={Col} md="6" controlId="username">
                    <Form.Label>
                      Username <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      value={username}
                      onChange={(e) => setUserName(e.target.value)}
                      required
                      placeholder="Username"
                      autoComplete="off"
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="email">
                    <Form.Label>
                      Email <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoComplete="off"
                    />
                  </Form.Group>

                  <Form.Group as={Col} md="6" controlId="designation">
                    <Form.Label>
                      Designation <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      required
                      autoComplete="off"
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="address">
                    <Form.Label>
                      Address <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                      autoComplete="off"
                    />
                  </Form.Group>

                  <Form.Group as={Col} md="6" controlId="mobile">
                    <Form.Label>
                      Mobile Number <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      value={mobile_number}
                      onChange={(e) => setMobile(e.target.value)}
                      required
                      autoComplete="off"
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="roles">
                    <Form.Label>
                      Role <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Select
                      value={role_id}
                      onChange={(e) => setRoleId(e.target.value)}
                      required
                    >
                      <option value="">Select Role</option>
                      {roles.map((role) => (
                        <option key={role._id} value={role._id}>
                          {role.role_slug}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Row>

                <Button type="submit" disabled={loading}>
                  {loading ? "Updating..." : "Update User"}
                </Button>
              </Form>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default EditUser;
