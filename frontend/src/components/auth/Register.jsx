import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import authLogo from "../../assets/images/auth_icmr_logo.png";
import CaptchaComponent from "../CaptchaComponent";

function Register() {
    const [verified, setVerified] = useState(false);
    const [validated, setValidated] = useState(false);
    const [iecCode, setIecCode] = useState("");
    const [isIecSubmitted, setIsIecSubmitted] = useState(false);

    const handleIecSubmit = (event) => {
        event.preventDefault();
        if (iecCode.length === 10) {
            setIsIecSubmitted(true);
        }
    };
    const handleFormSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        console.log(setValidated);
    };

    // const handleReset = () => {
    //     setIecCode("");
    //     setIsIecSubmitted(false);
    //     setValidated(false);
    // };

    const [name, setName] = useState();
    const [name_ofCPerson, setCPersonName] = useState();
    const [designation, setDesignation] = useState();
    const [address, setAddress] = useState();
    const [address2, setAddress2] = useState();
    const [city, setCity] = useState();
    const [state, setState] = useState();
    const [pincode, setPincode] = useState();
    const [mobile_number, setMobileNumber] = useState();
    const [email, setemail] = useState();

    function RegisterData() {
        console.log("Name:-" + name, "name_ofCPerson:-" + name_ofCPerson, "designation:-" + designation, "address:-" + address, "address2:-" + address2, "city:-" + city, "state:-" + state, "pincode:-" + pincode, "mobile_number:-" + mobile_number, "email:-" + email);
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
                            <h5 className="justify-content-between text-center mb-3" style={{ fontWeight: "600" }}>
                                Registration Form for Applicant
                            </h5>
                        </Col>

                        {!isIecSubmitted && (
                            <Form noValidate onSubmit={handleIecSubmit}>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="12">
                                        <Form.Label>
                                            Importer-Exporter Code (IEC) <span className="text-danger">*</span>
                                        </Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="IEC Code"
                                            value={iecCode}
                                            onChange={(e) => setIecCode(e.target.value)}
                                            maxLength={10} />
                                    </Form.Group>
                                    <Col className="col-md-12">
                                        <Form.Group className="py-2 d-flex">
                                            <button
                                                id="show_record"
                                                disabled={iecCode.length !== 10}
                                                className="btn btn-primary btn-md m-1 show_hide_btn px-4 font-bold"
                                                type="submit"
                                            >
                                                Submit
                                            </button>
                                            <button
                                                id="reset_data"
                                                className="btn btn-primary btn-md m-1 show_hide_btn px-4 font-bold"
                                                type="reset"
                                                onClick={() => setIecCode("")}
                                            >
                                                Reset
                                            </button>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form>
                        )}
                        {isIecSubmitted && (
                            <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="12 py-2">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control required type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="6 py-2">
                                        <Form.Label>Name of Contact Person</Form.Label>
                                        <Form.Control required type="text" value={name_ofCPerson} onChange={(e) => setCPersonName(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group as={Col} md="6 py-2">
                                        <Form.Label>Designation of Contact Person</Form.Label>
                                        <Form.Control required type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group as={Col} md="6 py-2">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control required type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group as={Col} md="6 py-2">
                                        <Form.Label>Address2</Form.Label>
                                        <Form.Control required type="text" value={address2} onChange={(e) => setAddress2(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group as={Col} md="6 py-2">
                                        <Form.Label>City</Form.Label>
                                        <Form.Control required type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group as={Col} md="6 py-2">
                                        <Form.Label>State</Form.Label>
                                        <Form.Control required type="text" value={state} onChange={(e) => setState(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group as={Col} md="6 py-2">
                                        <Form.Label>PinCode</Form.Label>
                                        <Form.Control required type="text" value={pincode} onChange={(e) => setPincode(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group as={Col} md="6 py-2">
                                        <Form.Label>Email Address</Form.Label>
                                        <InputGroup hasValidation>
                                            <InputGroup.Text>
                                                <FaEnvelope />
                                            </InputGroup.Text>
                                            <Form.Control type="email" required value={email} onChange={(e) => setemail(e.target.value)} />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group as={Col} md="6 py-2">
                                        <Form.Label>Mobile Number</Form.Label>
                                        <Form.Control required type="text" value={mobile_number} onChange={(e) => setMobileNumber(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group as={Col} md="6 py-2">
                                        {!verified ? (
                                            <CaptchaComponent onVerify={() => setVerified(true)} />
                                        ) : null}
                                    </Form.Group>
                                    <Form.Group>
                                        <div className="d-flex flex-column align-items-center bg-base-100">

                                        </div>
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group as={Col} md="6 py-2">
                                        <span className="text-danger">* Please fill all mandatory fields</span>
                                    </Form.Group>
                                    <Form.Group as={Col} md="6 py-2">
                                        <Button onClick={RegisterData} type="button" disabled={!verified}>Register</Button>

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
