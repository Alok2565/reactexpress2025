// // import React, { useState, useEffect } from "react";
// // import Button from "react-bootstrap/Button";
// // import Col from "react-bootstrap/Col";
// // import Form from "react-bootstrap/Form";
// // import Container from "react-bootstrap/Container";
// // import InputGroup from "react-bootstrap/InputGroup";
// // import Row from "react-bootstrap/Row";
// // import { Link } from "react-router-dom";
// // import { FaEnvelope } from "react-icons/fa";
// // import authLogo from "../../assets/images/auth_icmr_logo.png";
// // import CaptchaComponent from "../CaptchaComponent";
// // import { useNavigate } from 'react-router-dom';
// // import axios from "axios";

// // function Register() {
// //     const navigate = useNavigate();
// //     const [verified, setVerified] = useState(false);
// //     const [validated, setValidated] = useState(false);
// //     const [iec_code, setiec_code] = useState("");
// //     const [isIecSubmitted, setIsIecSubmitted] = useState(false);
// //     // const [role, setRole] = useState([]);

// //     const handleIecSubmit = (event) => {
// //         event.preventDefault();
// //         if (iec_code.length === 10) {
// //             setIsIecSubmitted(true);
// //         }
// //     };
// //     const handleFormSubmit = (event) => {
// //         const form = event.currentTarget;
// //         if (form.checkValidity() === false) {
// //             event.preventDefault();
// //             event.stopPropagation();
// //         }
// //         setValidated(true);
// //         console.log(setValidated);
// //     };

    
// //     const [name, setName] = useState();
// //     const [name_ofCPerson, setCPersonName] = useState();
// //     const [designation, setDesignation] = useState();
// //     const [address, setAddress] = useState();
// //     const [address2, setAddress2] = useState();
// //     const [city, setCity] = useState();
// //     const [state, setState] = useState();
// //     const [pincode, setPincode] = useState();
// //     const [mobile_number, setMobileNumber] = useState();
// //     const [email, setemail] = useState();
// //     const [role, setRole] = useState(null);
    

// //     function RegisterData() {
// //         console.log("Name:-" + name, "name_ofCPerson:-" + name_ofCPerson, "designation:-" + designation, "address:-" + address, "address2:-" + address2, "city:-" + city, "state:-" + state, "pincode:-" + pincode, "mobile_number:-" + mobile_number, "email:-" + email);
// //     }
// //      useEffect(() => {
// //   axios
// //     .get("http://localhost:5000/api/roles?slug=imp-exp")
// //     .then((res) => {
// //       if (res.data && res.data._id) {
// //         setRole(res.data); // Save entire role object
// //       } else {
// //         console.error("Invalid role response", res.data);
// //       }
// //     })
// //     .catch((err) => console.error("Failed to fetch role:", err));
// // }, []);

// //     function RegisterData() {
// //         const data = {
// //              role_id: role._id,
// //   iec_code,
// //   name,
// //   name_ofCPerson,
// //   designation,
// //   address,
// //   address2,
// //   city,
// //   state,
// //   pincode,
// //   mobile_number,
// //   email
// //         };
    
// //         fetch("http://localhost:5000/api/importers-exporters", {
// //             method: "POST",
// //             headers: {
// //                 "Content-Type": "application/json"
// //             },
// //             body: JSON.stringify(data)
// //         })
// //         .then(async (response) => {
// //             if (!response.ok) {
// //                 const error = await response.json();
// //                 throw new Error(error.message || "Failed to register");
// //             }
// //             return response.json();
// //         })
// //         .then((result) => {
// //             // alert("Registration successful!");
// //             navigate('/admin/impexp-holders?success=Registering successfully');
// //             //console.log("Response from server:", result);
// //             // Optionally clear form fields here
// //         })
// //         .catch((error) => {
// //             alert("Registration failed: " + error.message);
// //            // console.error("Error during registration:", error);
// //         });
// //     }
    

// //     return (
// //         <Container>
// //             <Row>
// //                 <Col md={{ span: 12, offset: 0 }}>
// //                     <Col className="codex-authbox register mt-5 mb-5">
// //                         <Col className="auth-header p-2">
// //                             <Col className="d-flex justify-content-center align-items-center">
// //                                 <Link to="#">
// //                                     <img
// //                                         className="img-fluid light-logo"
// //                                         src={authLogo}
// //                                         width="100%"
// //                                         style={{ maxWidth: "400px" }}
// //                                         alt="logo"
// //                                     />
// //                                 </Link>
// //                             </Col>
// //                             <h5 className="justify-content-between text-center mb-3" style={{ fontWeight: "600" }}>
// //                                 Registration Form for Applicant
// //                             </h5>
// //                         </Col>

// //                         {!isIecSubmitted && (
// //                             <Form noValidate onSubmit={handleIecSubmit}>
// //                                 <Row className="mb-3">
// //                                     <Form.Group as={Col} md="12">
// //                                         <Form.Label>
// //                                             Importer-Exporter Code (IEC) <span className="text-danger">*</span>
// //                                         </Form.Label>
// //                                         <Form.Control
// //                                             required
// //                                             type="text"
// //                                             placeholder="IEC Code"
// //                                             value={iec_code}
// //                                             onChange={(e) => setiec_code(e.target.value)}
// //                                             maxLength={10} />
// //                                     </Form.Group>
// //                                     <Col className="col-md-12">
// //                                         <Form.Group className="py-2 d-flex">
// //                                             <button
// //                                                 id="show_record"
// //                                                 disabled={iec_code.length !== 10}
// //                                                 className="btn btn-primary btn-md m-1 show_hide_btn px-4 font-bold"
// //                                                 type="submit"
// //                                             >
// //                                                 Submit
// //                                             </button>
// //                                             <button
// //                                                 id="reset_data"
// //                                                 className="btn btn-primary btn-md m-1 show_hide_btn px-4 font-bold"
// //                                                 type="reset"
// //                                                 onClick={() => setiec_code("")}
// //                                             >
// //                                                 Reset
// //                                             </button>
// //                                         </Form.Group>
// //                                     </Col>
// //                                 </Row>
// //                             </Form>
// //                         )}
// //                         {isIecSubmitted && (
// //                             <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
// //                             <Row className="mb-3">
// // {role ? (
// //   <Form.Group as={Col} md="12 py-2">
// //     <Form.Label>Role</Form.Label>
// //     <Form.Control type="text" readOnly value={role.role_slug} />
// //   </Form.Group>
// // ) : (
// //   <p>Loading role...</p>
// // )}
// //                                     <Form.Group as={Col} md="12 py-2">
// //                                         <Form.Label>Importer-Exporter Code (IEC) *</Form.Label>
// //                                         <Form.Control required type="text" value={iec_code} onChange={(e) => setiec_code(e.target.value)} placeholder="IEC COde" />
// //                                     </Form.Group>
// //                             </Row>
// //                                 <Row className="mb-3">
// //                                     <Form.Group as={Col} md="12 py-2">
// //                                         <Form.Label>Name *</Form.Label>
// //                                         <Form.Control required type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
// //                                     </Form.Group>
// //                                 </Row>
// //                                 <Row className="mb-3">
// //                                     <Form.Group as={Col} md="6 py-2">
// //                                         <Form.Label>Name of Contact Person</Form.Label>
// //                                         <Form.Control required type="text" value={name_ofCPerson} onChange={(e) => setCPersonName(e.target.value)} />
// //                                     </Form.Group>
// //                                     <Form.Group as={Col} md="6 py-2">
// //                                         <Form.Label>Designation of Contact Person</Form.Label>
// //                                         <Form.Control required type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} />
// //                                     </Form.Group>
// //                                     <Form.Group as={Col} md="6 py-2">
// //                                         <Form.Label>Address</Form.Label>
// //                                         <Form.Control required type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
// //                                     </Form.Group>
// //                                     <Form.Group as={Col} md="6 py-2">
// //                                         <Form.Label>Address2</Form.Label>
// //                                         <Form.Control required type="text" value={address2} onChange={(e) => setAddress2(e.target.value)} />
// //                                     </Form.Group>
// //                                     <Form.Group as={Col} md="6 py-2">
// //                                         <Form.Label>City</Form.Label>
// //                                         <Form.Control required type="text" value={city} onChange={(e) => setCity(e.target.value)} />
// //                                     </Form.Group>
// //                                     <Form.Group as={Col} md="6 py-2">
// //                                         <Form.Label>State</Form.Label>
// //                                         <Form.Control required type="text" value={state} onChange={(e) => setState(e.target.value)} />
// //                                     </Form.Group>
// //                                     <Form.Group as={Col} md="6 py-2">
// //                                         <Form.Label>PinCode</Form.Label>
// //                                         <Form.Control required type="text" value={pincode} onChange={(e) => setPincode(e.target.value)} />
// //                                     </Form.Group>
// //                                     <Form.Group as={Col} md="6 py-2">
// //                                         <Form.Label>Email Address</Form.Label>
// //                                         <InputGroup hasValidation>
// //                                             <InputGroup.Text>
// //                                                 <FaEnvelope />
// //                                             </InputGroup.Text>
// //                                             <Form.Control type="email" required value={email} onChange={(e) => setemail(e.target.value)} />
// //                                         </InputGroup>
// //                                     </Form.Group>
// //                                     <Form.Group as={Col} md="6 py-2">
// //                                         <Form.Label>Mobile Number</Form.Label>
// //                                         <Form.Control required type="text" value={mobile_number} onChange={(e) => setMobileNumber(e.target.value)} />
// //                                     </Form.Group>
// //                                     <Form.Group as={Col} md="6 py-2">
// //                                         {!verified ? (
// //                                             <CaptchaComponent onVerify={() => setVerified(true)} />
// //                                         ) : null}
// //                                     </Form.Group>
// //                                     <Form.Group>
// //                                         <div className="d-flex flex-column align-items-center bg-base-100">

// //                                         </div>
// //                                     </Form.Group>
// //                                 </Row>
// //                                 <Row>
// //                                     <Form.Group as={Col} md="6 py-2">
// //                                         <span className="text-danger">* Please fill all mandatory fields</span>
// //                                     </Form.Group>
// //                                     <Form.Group as={Col} md="6 py-2">
// //                                         <Button onClick={RegisterData} type="button" disabled={!verified}>Register</Button>
// //                                     </Form.Group>
// //                                 </Row>
// //                             </Form>
// //                         )}
// //                     </Col>
// //                 </Col>
// //             </Row>
// //         </Container>
// //     );
// // }

// // export default Register;
// import React, { useState, useEffect } from "react";
// import Button from "react-bootstrap/Button";
// import Col from "react-bootstrap/Col";
// import Form from "react-bootstrap/Form";
// import Container from "react-bootstrap/Container";
// import InputGroup from "react-bootstrap/InputGroup";
// import Row from "react-bootstrap/Row";
// import { Link, useNavigate } from "react-router-dom";
// import { FaEnvelope } from "react-icons/fa";
// import authLogo from "../../assets/images/auth_icmr_logo.png";
// import CaptchaComponent from "../CaptchaComponent";
// import axios from "axios";

// function Register() {
//     const navigate = useNavigate();
//     const [verified, setVerified] = useState(false);
//     const [validated, setValidated] = useState(false);
//     const [iec_code, setiec_code] = useState("");
//     const [isIecSubmitted, setIsIecSubmitted] = useState(false);

//     const [name, setName] = useState("");
//     const [name_ofCPerson, setCPersonName] = useState("");
//     const [designation, setDesignation] = useState("");
//     const [address, setAddress] = useState("");
//     const [address2, setAddress2] = useState("");
//     const [city, setCity] = useState("");
//     const [state, setState] = useState("");
//     const [pincode, setPincode] = useState("");
//     const [mobile_number, setMobileNumber] = useState("");
//     const [email, setemail] = useState("");
//     const [roles, setRoles] = useState([]);
//     const [role_id, setRoleId] = useState("");

//     const handleIecSubmit = (event) => {
//         event.preventDefault();
//         if (iec_code.length === 10) {
//             setIsIecSubmitted(true);
//         }
//     };

//     const handleFormSubmit = (event) => {
//         const form = event.currentTarget;
//         if (form.checkValidity() === false) {
//             event.preventDefault();
//             event.stopPropagation();
//         }
//         setValidated(true);
//     };

//     useEffect(() => {
//         axios.get("http://localhost:5000/api/roles")
//             .then((res) => setRoles(res.data))
//             .catch((err) => console.error("Failed to fetch roles", err));
//     }, []);

//     function RegisterData(e) {
//         const form = e.currentTarget;

//         if (form.checkValidity() === false) {
//             e.stopPropagation();
//             setValidated(true);
//             return;
//         }

//         setValidated(true);
//         //setLoading(true);

//         const data = {
//             role_id: // sending actual role_id
//             iec_code,
//             name,
//             name_ofCPerson,
//             designation,
//             address,
//             address2,
//             city,
//             state,
//             pincode,
//             mobile_number,
//             email
//         };

//         fetch("http://localhost:5000/api/importers-exporters", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(data)
//         })
//             .then(async (response) => {
//                 if (!response.ok) {
//                     const error = await response.json();
//                     throw new Error(error.message || "Failed to register");
//                 }
//                 return response.json();
//             })
//             .then((result) => {
//                 navigate('/admin/impexp-holders?success=Registering successfully');
//             })
//             .catch((error) => {
//                 alert("Registration failed: " + error.message);
//             });
//     }

//     return (
//         <Container>
//             <Row>
//                 <Col md={{ span: 12 }}>
//                     <Col className="codex-authbox register mt-5 mb-5">
//                         <Col className="auth-header p-2">
//                             <Col className="d-flex justify-content-center align-items-center">
//                                 <Link to="#">
//                                     <img
//                                         className="img-fluid light-logo"
//                                         src={authLogo}
//                                         width="100%"
//                                         style={{ maxWidth: "400px" }}
//                                         alt="logo"
//                                     />
//                                 </Link>
//                             </Col>
//                             <h5 className="justify-content-between text-center mb-3" style={{ fontWeight: "600" }}>
//                                 Registration Form for Applicant
//                             </h5>
//                         </Col>

//                         {!isIecSubmitted && (
//                             <Form noValidate validated={validated} onSubmit={handleIecSubmit}>
//                                 <Row className="mb-3">
//                                     <Form.Group as={Col} md="12">
//                                         <Form.Label>
//                                             Importer-Exporter Code (IEC) <span className="text-danger">*</span>
//                                         </Form.Label>
//                                         <Form.Control
//                                             required
//                                             type="text"
//                                             placeholder="IEC Code"
//                                             value={iec_code}
//                                             onChange={(e) => setiec_code(e.target.value)}
//                                             maxLength={10}
//                                         />
//                                     </Form.Group>
//                                     <Col className="col-md-12">
//                                         <Form.Group className="py-2 d-flex">
//                                             <button
//                                                 id="show_record"
//                                                 disabled={iec_code.length !== 10}
//                                                 className="btn btn-primary btn-md m-1 show_hide_btn px-4 font-bold"
//                                                 type="submit"
//                                             >
//                                                 Submit
//                                             </button>
//                                             <button
//                                                 id="reset_data"
//                                                 className="btn btn-primary btn-md m-1 show_hide_btn px-4 font-bold"
//                                                 type="reset"
//                                                 onClick={() => setiec_code("")}
//                                             >
//                                                 Reset
//                                             </button>
//                                         </Form.Group>
//                                     </Col>
//                                 </Row>
//                             </Form>
//                         )}

//                         {isIecSubmitted && (
//                             <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
//                                 <Row className="mb-3">
//                                                             <Form.Group as={Col} md="6" controlId="roles">
//                                                                 <Form.Label>Role <span className="text-danger">*</span></Form.Label>
//                                                                 <Form.Select
//                                                                     value={role_id}
//                                                                     onChange={(e) => setRoleId(e.target.value)}
//                                                                     required
//                                                                 >
//                                                                     <option value="">Select Role</option>
//                                                                     {roles.map((role) => (
//                                                                         <option key={role._id} value={role._id}>
//                                                                             {role.role_slug}
//                                                                         </option>
//                                                                     ))}
//                                                                 </Form.Select>
//                                                             </Form.Group>
//                                                         </Row>
//                                 <Row className="mb-3">
                                    
//                                     <Form.Group as={Col} md="12 py-2">
//                                         <Form.Label>importer-Exporter Code (IEC Code) *</Form.Label>
//                                         <Form.Control required type="text" value={iec_code} onChange={(e) => setiec_code(e.target.value)} />
//                                     </Form.Group>
//                                 </Row>
//                                 <Row className="mb-3">
//                                     <Form.Group as={Col} md="12 py-2">
//                                         <Form.Label>Name *</Form.Label>
//                                         <Form.Control required type="text" value={name} onChange={(e) => setName(e.target.value)} />
//                                     </Form.Group>
//                                 </Row>
//                                 <Row className="mb-3">
//                                     <Form.Group as={Col} md="6 py-2">
//                                         <Form.Label>Name of Contact Person *</Form.Label>
//                                         <Form.Control required type="text" value={name_ofCPerson} onChange={(e) => setCPersonName(e.target.value)} />
//                                     </Form.Group>
//                                     <Form.Group as={Col} md="6 py-2">
//                                         <Form.Label>Designation *</Form.Label>
//                                         <Form.Control required type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} />
//                                     </Form.Group>
//                                     <Form.Group as={Col} md="6 py-2">
//                                         <Form.Label>Address *</Form.Label>
//                                         <Form.Control required type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
//                                     </Form.Group>
//                                     <Form.Group as={Col} md="6 py-2">
//                                         <Form.Label>Address2 *</Form.Label>
//                                         <Form.Control required type="text" value={address2} onChange={(e) => setAddress2(e.target.value)} />
//                                     </Form.Group>
//                                     <Form.Group as={Col} md="6 py-2">
//                                         <Form.Label>City *</Form.Label>
//                                         <Form.Control required type="text" value={city} onChange={(e) => setCity(e.target.value)} />
//                                     </Form.Group>
//                                     <Form.Group as={Col} md="6 py-2">
//                                         <Form.Label>State *</Form.Label>
//                                         <Form.Control required type="text" value={state} onChange={(e) => setState(e.target.value)} />
//                                     </Form.Group>
//                                     <Form.Group as={Col} md="6 py-2">
//                                         <Form.Label>Pincode *</Form.Label>
//                                         <Form.Control required type="text" value={pincode} onChange={(e) => setPincode(e.target.value)} />
//                                     </Form.Group>
//                                     <Form.Group as={Col} md="6 py-2">
//                                         <Form.Label>Email Address *</Form.Label>
//                                         <InputGroup hasValidation>
//                                             <InputGroup.Text><FaEnvelope /></InputGroup.Text>
//                                             <Form.Control required type="email" value={email} onChange={(e) => setemail(e.target.value)} />
//                                         </InputGroup>
//                                     </Form.Group>
//                                     <Form.Group as={Col} md="6 py-2">
//                                         <Form.Label>Mobile Number *</Form.Label>
//                                         <Form.Control required type="text" value={mobile_number} onChange={(e) => setMobileNumber(e.target.value)} />
//                                     </Form.Group>
//                                     <Form.Group as={Col} md="6 py-2">
//                                         {!verified && <CaptchaComponent onVerify={() => setVerified(true)} />}
//                                     </Form.Group>
//                                 </Row>
//                                 <Row>
//                                     <Form.Group as={Col} md="6 py-2">
//                                         <span className="text-danger">* Please fill all mandatory fields</span>
//                                     </Form.Group>
//                                     <Form.Group as={Col} md="6 py-2">
//                                         <Button onClick={RegisterData} type="button" disabled={!verified}>Register</Button>
//                                     </Form.Group>
//                                 </Row>
//                             </Form>
//                         )}
//                     </Col>
//                 </Col>
//             </Row>
//         </Container>
//     );
// }

// export default Register;
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import authLogo from "../../assets/images/auth_icmr_logo.png";
import CaptchaComponent from "../CaptchaComponent";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);
  const [validated, setValidated] = useState(false);
  const [iec_code, setiec_code] = useState("");
  const [isIecSubmitted, setIsIecSubmitted] = useState(false);

  const [roles, setRoles] = useState([]);
  const [role_id, setRoleId] = useState("");

  const [name, setName] = useState("");
  const [name_ofCPerson, setCPersonName] = useState("");
  const [designation, setDesignation] = useState("");
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [mobile_number, setMobileNumber] = useState("");
  const [email, setemail] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/roles")
      .then((res) => {
        const impExpRole = res.data.find(
          (role) => role.role_slug === "imp-exp"
        );
        if (impExpRole) {
          setRoles([impExpRole]);
          setRoleId(impExpRole._id);
        }
      })
      .catch((err) => console.error("Failed to fetch roles", err));
  }, []);

  const handleIecSubmit = (event) => {
    event.preventDefault();
    if (iec_code.length === 10) {
      setIsIecSubmitted(true);
    }
  };
  const handleFormSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      RegisterData();
    }
    setValidated(true);
  };
  function RegisterData() {
    const data = {
      role_id,
      iec_code,
      name,
      name_ofCPerson,
      designation,
      address,
      address2,
      city,
      state,
      pincode,
      mobile_number,
      email,
    };

    fetch("http://localhost:5000/api/importers-exporters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || "Failed to register");
        }
        return response.json();
      })
      .then(() => {
        navigate("/admin/impexp-holders?success=Registering successfully");
      })
      .catch((error) => {
        alert("Registration failed: " + error.message);
      });
  }

  return (
    <Container>
      <Row>
        <Col md={{ span: 12, offset: 0 }}>
          <Col className="codex-authbox register mt-5 mb-5">
            <Col className="auth-header p-2">
              <Col className="d-flex justify-content-center align-items-center">
                <Link to="#">
                  <img
                    className="img-fluid light-logo"
                    src={authLogo}
                    width="100%"
                    style={{ maxWidth: "400px" }}
                    alt="logo"
                  />
                </Link>
              </Col>
              <h5
                className="justify-content-between text-center mb-3"
                style={{ fontWeight: "600" }}
              >
                Registration Form for Applicant
              </h5>
            </Col>

            {!isIecSubmitted && (
              <Form noValidate onSubmit={handleIecSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col} md="12">
                    <Form.Label>
                      Importer-Exporter Code (IEC){" "}
                      <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="IEC Code"
                      value={iec_code}
                      onChange={(e) => setiec_code(e.target.value)}
                      maxLength={10}
                    />
                  </Form.Group>
                  <Col className="col-md-12">
                    <Form.Group className="py-2 d-flex">
                      <button
                        id="show_record"
                        disabled={iec_code.length !== 10}
                        className="btn btn-primary btn-md m-1 show_hide_btn px-4 font-bold"
                        type="submit"
                      >
                        Submit
                      </button>
                      <button
                        id="reset_data"
                        className="btn btn-primary btn-md m-1 show_hide_btn px-4 font-bold"
                        type="reset"
                        onClick={() => setiec_code("")}
                      >
                        Reset
                      </button>
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            )}

            {isIecSubmitted && (
              <Form
                noValidate
                validated={validated}
                onSubmit={handleFormSubmit}
              >
                <Row className="mb-3">
                  <Form.Group as={Col} md="6">
                    {roles.length > 0 &&
                    roles.find((role) => role.role_slug === "imp-exp") ? (
                      <>
                        <Form.Control
                          type="hidden"
                          value="imp-exp"
                          readOnly
                          required
                        />
                        <input
                          type="hidden"
                          name="role_id"
                          value={
                            roles.find((role) => role.role_slug === "imp-exp")
                              ._id
                          }
                        />
                      </>
                    ) : (
                      <Form.Control
                        type="text"
                        value="Role not found"
                        readOnly
                        isInvalid
                      />
                    )}
                  </Form.Group>

                  <Form.Group as={Col} md="12 py-2">
                    <Form.Label>Importer-Exporter Code (IEC) *</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      value={iec_code}
                      onChange={(e) => setiec_code(e.target.value)}
                      placeholder="IEC Code"
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} md="12 py-2">
                    <Form.Label>Name *</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Name"
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} md="6 py-2">
                    <Form.Label>Name of Contact Person</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      value={name_ofCPerson}
                      onChange={(e) => setCPersonName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="6 py-2">
                    <Form.Label>Designation of Contact Person</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="6 py-2">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="6 py-2">
                    <Form.Label>Address2</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="6 py-2">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="6 py-2">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="6 py-2">
                    <Form.Label>PinCode</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="6 py-2">
                    <Form.Label>Email Address</Form.Label>
                    <InputGroup hasValidation>
                      <InputGroup.Text>
                        <FaEnvelope />
                      </InputGroup.Text>
                      <Form.Control
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group as={Col} md="6 py-2">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      value={mobile_number}
                      onChange={(e) => setMobileNumber(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="6 py-2">
                    {!verified && (
                      <CaptchaComponent onVerify={() => setVerified(true)} />
                    )}
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} md="6 py-2">
                    <span className="text-danger">
                      * Please fill all mandatory fields
                    </span>
                  </Form.Group>
                  <Form.Group as={Col} md="6 py-2">
                    <Button type="submit" disabled={!verified}>
                      Register
                    </Button>
                  </Form.Group>
                </Row>
              </Form>
            )}
          </Col>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
