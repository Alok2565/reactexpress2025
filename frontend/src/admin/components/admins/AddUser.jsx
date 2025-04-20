// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Container, Col, Row, Form, Button } from 'react-bootstrap';
// import { FaLongArrowAltLeft } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';

// function AddUser() {
//     const [role_id, setRoleId] = useState("");
//     const [name, setName] = useState("");
//     const [username, setUserName] = useState("");
//     const [email, setEmail] = useState("");
//     const [designation, setDesignation] = useState("");
//     const [address, setAddress] = useState("");
//     const [mobile_number, setMobile] = useState("");
//     const [roles, setRoles] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [validated, setValidated] = useState(false);

//     const navigate = useNavigate();

//     useEffect(() => {
//         axios.get("http://localhost:5000/api/roles")
//             .then((res) => setRoles(res.data))
//             .catch((err) => console.error("Failed to fetch roles", err));
//     }, []);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const form = e.currentTarget;

//         if (form.checkValidity() === false) {
//             e.stopPropagation();
//             setValidated(true);
//             return;
//         }

//         setValidated(true);
//         setLoading(true);

//         const newUser = {
//             role_id,
//             name,
//             username,
//             email,
//             designation,
//             address,
//             mobile_number,
//         };
//         try {
//               await axios.post("http://localhost:5000/api/users", newUser);
//               navigate("/admin/users?success=User%20has%20been%20created%20successfully");
//             //   setName("");
//             //   setUserName("");
//             //   setEmail("");
//             //   setRoleId("");
//               alert("User created successfully");
//             } catch (error) {
//               console.error("User creation failed:", error.response?.data);
//               alert("Error: " + (error.response?.data?.error || "Unknown error"));
//             }
//           };

//     //     try {
//     //         await axios.post("http://localhost:5000/api/users", newUser);
//     //         navigate("/admin/users?success=User%20has%20been%20created%20successfully");
//     //     } catch (error) {
//     //         console.error("Error details:", error.response?.data || error.message);
//     //         if (error.response?.data?.message) {
//     //             alert("Error: " + error.response.data.message);
//     //         } else if (typeof error.response?.data === 'string') {
//     //             alert("Error: " + error.response.data);
//     //         } else {
//     //             alert("Error: Something went wrong");
//     //         }
//     //     } finally {
//     //         setLoading(false);
//     //     }
//     // };

//     return (
//         <div className="page-content py-3">
//             <Container fluid>
//                 <Row>
//                     <Col xl={12}>
//                         <div className="page-title-box d-flex justify-content-between align-items-center">
//                             <h4
//                                 className="page-title text-start"
//                                 style={{ fontSize: "20px", fontWeight: "600", color: "#14468C" }}>
//                                 Add User
//                             </h4>
//                             <div className="page-title-right">
//                                 <button
//                                     className="btn btn-primary mb-2"
//                                     style={{ backgroundColor: "#14468C", border: "none" }}
//                                     onClick={() => navigate("/admin/users")}
//                                 >
//                                     <FaLongArrowAltLeft /> Back
//                                 </button>
//                             </div>
//                         </div>
//                     </Col>
//                 </Row>

//                 <div className="container">
//                     <Form noValidate validated={validated} onSubmit={handleSubmit}>
//                         <Row className="mb-3">
//                             <Form.Group as={Col} md="6" controlId="name">
//                                 <Form.Label>Name <span className="text-danger">*</span></Form.Label>
//                                 <Form.Control
//                                     value={name}
//                                     onChange={(e) => setName(e.target.value)}
//                                     required
//                                     placeholder="Full name"
//                                     autoComplete="off"
//                                 />
//                             </Form.Group>

//                             <Form.Group as={Col} md="6" controlId="username">
//                                 <Form.Label>Username <span className="text-danger">*</span></Form.Label>
//                                 <Form.Control
//                                     value={username}
//                                     onChange={(e) => setUserName(e.target.value)}
//                                     required
//                                     placeholder="Username"
//                                     autoComplete="off"
//                                 />
//                             </Form.Group>
//                         </Row>

//                         <Row className="mb-3">
//                             <Form.Group as={Col} md="6" controlId="email">
//                                 <Form.Label>Email <span className="text-danger">*</span></Form.Label>
//                                 <Form.Control
//                                     type="email"
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                     required
//                                     autoComplete="off"
//                                 />
//                             </Form.Group>

//                             <Form.Group as={Col} md="6" controlId="designation">
//                                 <Form.Label>Designation <span className="text-danger">*</span></Form.Label>
//                                 <Form.Control
//                                     value={designation}
//                                     onChange={(e) => setDesignation(e.target.value)}
//                                     required
//                                     autoComplete="off"
//                                 />
//                             </Form.Group>
//                         </Row>

//                         <Row className="mb-3">
//                             <Form.Group as={Col} md="6" controlId="address">
//                                 <Form.Label>Address <span className="text-danger">*</span></Form.Label>
//                                 <Form.Control
//                                     value={address}
//                                     onChange={(e) => setAddress(e.target.value)}
//                                     required
//                                     autoComplete="off"
//                                 />
//                             </Form.Group>

//                             <Form.Group as={Col} md="6" controlId="mobile">
//                                 <Form.Label>Mobile Number <span className="text-danger">*</span></Form.Label>
//                                 <Form.Control
//                                     value={mobile_number}
//                                     onChange={(e) => setMobile(e.target.value)}
//                                     required
//                                     autoComplete="off"
//                                 />
//                             </Form.Group>
//                         </Row>

//                         <Row className="mb-3">
//                             <Form.Group as={Col} md="6" controlId="roles">
//                                 <Form.Label>Role <span className="text-danger">*</span></Form.Label>
//                                 <Form.Select
//                                     value={role_id}
//                                     onChange={(e) => setRoleId(e.target.value)}
//                                     required
//                                 >
//                                     <option value="">Select Role</option>
//                                     {roles.map((role) => (
//                                         <option key={role._id} value={role._id}>
//                                             {role.role_slug}
//                                         </option>
//                                     ))}
//                                 </Form.Select>
//                             </Form.Group>
//                         </Row>

//                         <Button type="submit" disabled={loading}>
//                             {loading ? "Adding..." : "Add User"}
//                         </Button>
//                     </Form>
//                 </div>
//             </Container>
//         </div>
//     );
// }

// export default AddUser;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Col, Row, Form, Button } from 'react-bootstrap';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function AddUser() {
    const [role_id, setRoleId] = useState("");
    const [name, setName] = useState("");
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [designation, setDesignation] = useState("");
    const [address, setAddress] = useState("");
    const [mobile_number, setMobile] = useState("");
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [validated, setValidated] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:5000/api/roles")
            .then((res) => setRoles(res.data))
            .catch((err) => console.error("Failed to fetch roles", err));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
            return;
        }

        setValidated(true);
        setLoading(true);

        const newUser = {
            role_id,
            name,
            username,
            email,
            designation,
            address,
            mobile_number,
        };

        try {
            await axios.post("http://localhost:5000/api/users", newUser);
            navigate("/admin/users?success=User%20has%20been%20created%20successfully");
        } catch (error) {
            //console.error("User creation failed:", error.response?.data);
            alert("Error: " + (error.response?.data?.message || "Unknown error"));
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
                            <h4 className="page-title text-start" style={{ fontSize: "20px", fontWeight: "600", color: "#14468C" }}>
                                Add User
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

                <div className="container">
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="name">
                                <Form.Label>Name <span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    placeholder="Full name"
                                    autoComplete="off"
                                />
                            </Form.Group>

                            <Form.Group as={Col} md="6" controlId="username">
                                <Form.Label>Username <span className="text-danger">*</span></Form.Label>
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
                                <Form.Label>Email <span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    autoComplete="off"
                                />
                            </Form.Group>

                            <Form.Group as={Col} md="6" controlId="designation">
                                <Form.Label>Designation <span className="text-danger">*</span></Form.Label>
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
                                <Form.Label>Address <span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                    autoComplete="off"
                                />
                            </Form.Group>

                            <Form.Group as={Col} md="6" controlId="mobile">
                                <Form.Label>Mobile Number <span className="text-danger">*</span></Form.Label>
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
                                <Form.Label>Role <span className="text-danger">*</span></Form.Label>
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
                            {loading ? "Adding..." : "Add User"}
                        </Button>
                    </Form>
                </div>
            </Container>
        </div>
    );
}

export default AddUser;

