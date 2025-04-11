import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CDBBtn } from "cdbreact";
import { Container, Row, Col, Button, Form, Card, CardBody, Modal } from 'react-bootstrap';
import { FaInfoCircle, FaList, FaCheckCircle, FaLongArrowAltLeft, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { HsCodeOptionsDescription, natureOfBiomaterialOptions, whereSampleCollectedOption, selectSpecifyPurposeOption, funcwhetherSamplesUsedResearchOption, funcPurposeofSamplesOption } from '../../modules/ExporterSelectData';
import ValidationNocRequest from "./ValidationNocRequest";

const { HsCodeOptions, HsCodeDescrip } = HsCodeOptionsDescription();
const { nature_of_biomaterialoptions } = natureOfBiomaterialOptions();
const { where_sample_collectedOption } = whereSampleCollectedOption();
const { SpecifyPurposeOption } = selectSpecifyPurposeOption();
const { whetherSamplesUsedResearchOption } = funcwhetherSamplesUsedResearchOption();
const { PurposeofSamplesOption } = funcPurposeofSamplesOption();

function ApplyNocRequest() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        iec_code: "",
        upload_comp_institute_denied_export: "",
        denied_export_auth_details: "",
        upload_sending_bg_company_add: "",
        nameof_recipient: "",
        designationof_recipient: "",
        company_addressof_recipient: "",
        uploadbg_company_addressof_recipient: "",
        end_user_receiving_party_yesno: "",
        end_user_receiving_party_description: "",
        hs_code: "",
        hs_code_description: "",
        nature_of_biomaterial: "",
        nature_of_biomaterial_details: "",
        whether_samples_used_research_analysis_description: "",
        certifythat: "",
    });
    const [errors, setErrors] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const [showInputsDeniedExport, setShowInputsDeniedExport] = useState(false);
    const [showTextAreaNature, setShowTextAreaNature] = useState(false);
    const [showInputEndUser, setShowInputEndUser] = useState(false);
    const [sample_collectedTextArea, setsample_collectedTextArea] = useState(false);
    const [showInputsbeing_exported, setShowInputsbeing_exported] = useState(false);
    const [showInputsSamplesEnvisaged, setInputsSamplesEnvisaged] = useState(false);
    const [whethershowTextArea, setWhetherShowTextArea] = useState(false);
    const [whetherShowSelectInput, setWhetherShowSelectInput] = useState(false);
    const [SpecifyPurposeTextArea, setSpecifyPurposeTextArea] = useState(false);
    const [showInputsLeftoverSamples, setshowInputsLeftoverSamples] = useState(false);
    const [showInputsPurposeofSamples, setshowInputsPurposeofSamples] = useState(false);
    const [showInputsNationalSecurity, setshowInputsNationalSecurity] = useState(false);
    const [showInputsTextForeignCountry, setshowInputsTextForeignCountry] = useState(false);
    const [showInputsTextBiomaterialMicro, setshowInputsTextBiomaterialMicro] = useState(false);
    const [showInputsTextIbscRcgm, setshowInputsTextIbscRcgm] = useState(false);

    useEffect(() => {
        const savedData = localStorage.getItem("nocFormData");
        if (savedData) {
            setFormData(JSON.parse(savedData));
        }
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        if (name === "hs_code") {
            const selectedOption = HsCodeDescrip.find(function (option) {
                return option.value === value;
            });

            setFormData(function (prevState) {
                return {
                    ...prevState,
                    hs_code: value,
                    hs_code_description: selectedOption ? selectedOption.description : "",
                };
            });
        }

        if (name === "denied_export_auth_last_3_years_yes_no") {
            setShowInputsDeniedExport(value === "Yes");
        }
        if (name === "end_user_receiving_party_yesno") {
            setShowInputEndUser(value === "Yes");
        }
        if (name === "nature_of_biomaterial") {
            if (["Any Tissue/Cells", "Other body fluids", "Others"].includes(value)) {
                setShowTextAreaNature(true);
            } else {
                setShowTextAreaNature(false);
                setFormData((prevData) => ({
                    ...prevData,
                    biomaterial_description: "",
                }));
            }
        }
        if (name === "where_sample_collected") {
            if (value === "Others") {
                setsample_collectedTextArea(true);
            } else {
                setsample_collectedTextArea(false);
                setFormData((prevData) => ({
                    ...prevData,
                    sample_collected_description: "",
                }));
            }
        }
        if (name === "samples_being_exported") {
            setShowInputsbeing_exported(value === "Yes");
        }
        if (name === "repeat_samples_envisaged_yesno") {
            setInputsSamplesEnvisaged(value === "Yes");
        }
        // Handle radio button selection (Yes/No)
        if (name === "whether_samples_used_research_analysis_yesno") {
            if (value === "Yes") {
                setWhetherShowSelectInput(true);
            } else {
                setWhetherShowSelectInput(false);
                setWhetherShowTextArea(false);
                setFormData((prevData) => ({
                    ...prevData,
                    whether_samples_used_research_analysis_description: "",
                }));
            }
        }

        // Handle select dropdown selection (Others)
        if (name === "whether_samples_used_research_analysis") {
            if (value === "Others") {
                setWhetherShowTextArea(true);
            } else {
                setWhetherShowTextArea(false);
                setFormData((prevData) => ({
                    ...prevData,
                    whether_samples_used_research_analysis_description: "",
                }));
            }
        }
        if (name === "specify_purpose_end_use") {
            if (value === "Others") {
                setSpecifyPurposeTextArea(true);
            } else {
                setSpecifyPurposeTextArea(false);
                setFormData((prevData) => ({
                    ...prevData,
                    specify_purpose_end_use_description: "",
                }));
            }
        }
        if (name === "leftover_samples_store_yes_no") {
            setshowInputsLeftoverSamples(value === "Yes");
        }
        if (name === "purposeof_sample_store") {
            if (value === "Further Analysis") {
                setshowInputsPurposeofSamples(true);
            } else {
                setshowInputsPurposeofSamples(false);
                setFormData((prevData) => ({
                    ...prevData,
                    purposeof_sample_store_description: "",
                }));
            }
        }
        if (name === "national_security_angle_yes_no") {
            setshowInputsNationalSecurity(value === "Yes");
        }

        if (name === "foreign_country_army_military_yes_no") {
            setshowInputsTextForeignCountry(value === "Yes");
        }

        if (name === "biomaterial_approval_yesno") {
            setshowInputsTextBiomaterialMicro(value === "Yes");
        }

        if (name === "ibsc_rcgm_approval_applicable_yesno") {
            setshowInputsTextIbscRcgm(value === "Yes");
        }
    }

    const handleSubmit = () => {
        const validationErrors = ValidationNocRequest(formData);
        console.log("Validation Errors:", validationErrors); // Debugging

        if (Object.keys(validationErrors).length === 0) {
            setModalMessage("Form Submitted Successfully!");
            setShowModal(true);
            localStorage.removeItem("nocFormData");
        } else {
            setErrors(validationErrors);
            console.log("Errors Found:", validationErrors); // Debugging
            setModalMessage(
                "Please fill all the mandetory fields before submit the form."
            );
            setShowModal(true);
        }
    };

    const saveAsDraft = () => {
        localStorage.setItem("nocFormData", JSON.stringify(formData));
        setModalMessage("Draft Saved!");
        setShowModal(true);
    };

    return (
        <>
            <div className="page-content py-3">
                <Container fluid>
                    <Row>
                        <Col xl={12}>
                            <div className="page-title-box">
                                <div className="page-title-right">
                                    <button className="btn btn-primary float-end mb-2" style={{ backgroundColor: "#14468C", border: "#14468C" }}>
                                        <FaLongArrowAltLeft /> Back
                                    </button>
                                </div>
                                <h4 className="page-title text-center" style={{ fontSize: "20px", fontWeight: "600", color: "#14468C" }}>
                                    Application form for Export of Human Biological Material
                                </h4>
                            </div>
                        </Col>
                    </Row>
                    {/* Step Navigation */}
                    <Card>
                        <Row className="mb-4">
                            <Col>
                                <div className="step-nav">
                                    <div className={`step-item ${step === 1 ? 'active' : ''}`} onClick={() => setStep(1)}>
                                        <FaInfoCircle /> PART-A: Basic Information
                                    </div>
                                    <div className={`step-item ${step === 2 ? 'active' : ''}`} onClick={() => setStep(2)}>
                                        <FaList /> PART-B: Other Details
                                    </div>
                                    <div className={`step-item ${step === 3 ? 'active' : ''}`} onClick={() => setStep(3)}>
                                        <FaCheckCircle /> PART-C: Declarations
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Form noValidate>
                            <Row>
                                <div className="card-body-custom">
                                    {step === 1 && (
                                        <>
                                            <Col>
                                                <Col className="form-card-sub-tite text-black">
                                                    <Row>
                                                        <Col as={Col} md="12">
                                                            <Col className="sub-title p-1">
                                                                <span className="text-center p-1"><strong>(1) Sending Party</strong></span>
                                                            </Col>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Col>
                                            <CardBody>
                                                <Row>
                                                    <Form.Group as={Col} md="4">
                                                        <Form.Label className="form-label"><b>(i) Importer Exporter Code (IEC)</b></Form.Label>
                                                        <Form.Control type="text" placeholder="AAICR8954R" name="iec_code"
                                                            value={formData.iec_code} onChange={handleChange} readOnly autoComplete="off" />
                                                    </Form.Group>
                                                    <Form.Group as={Col} md="4">
                                                        <Form.Label className="form-label"><b>(ii) Name of the Applicant</b></Form.Label>
                                                        <Form.Control type="text" placeholder="RUDANI ENTERPRISES PRIVATE LIMITED" name="name_of_applicant"
                                                            value={formData.name_of_applicant} onChange={handleChange} readOnly autoComplete="off" />
                                                    </Form.Group>
                                                    <Form.Group as={Col} md="4">
                                                        <Form.Label className="form-label"><b>(iii) Designation of the Applicant</b></Form.Label>
                                                        <Form.Control type="text" placeholder="Developer" name="designation"
                                                            value={formData.designation} onChange={handleChange} readOnly autoComplete="off" />
                                                    </Form.Group>
                                                    <Form.Group as={Col} md="4 mt-3">
                                                        <Form.Label className="form-label"><b>(iv) Address of the Company/Institution</b></Form.Label>
                                                        <Form.Control as="textarea" placeholder="Developer" name="sending_company_add"
                                                            value={formData.sending_company_add} onChange={handleChange} readOnly autoComplete="off" />
                                                    </Form.Group>
                                                    <Col md="8 py-2">
                                                        <Row>
                                                            <Form.Group className="mt-3">
                                                                <Form.Label className="form-label">
                                                                    <b>
                                                                        (v) Whether the applicant/ company/ institution has been denied export authorization in the last 3 years?
                                                                        <span className="text-danger">*</span>
                                                                    </b>
                                                                </Form.Label>
                                                                <Col md="3">
                                                                    <Form.Group>
                                                                        <Form.Check type="radio" value="Yes" name="denied_export_auth_last_3_years_yes_no" checked={formData.denied_export_auth_last_3_years_yes_no === "Yes"} onChange={handleChange} inline label="Yes" />
                                                                        <Form.Check type="radio" value="No" name="denied_export_auth_last_3_years_yes_no" checked={formData.denied_export_auth_last_3_years_yes_no === "No"} onChange={handleChange} inline label="No" />
                                                                    </Form.Group>
                                                                </Col>

                                                                {showInputsDeniedExport && (
                                                                    <>
                                                                        <Col md="4">
                                                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                                                <Form.Label>
                                                                                    Upload relevant documents, if any
                                                                                    <span className="text-danger">*</span>
                                                                                </Form.Label>
                                                                                <Form.Control type="file" name="upload_comp_institute_denied_export" autoComplete="off" />
                                                                            </Form.Group>
                                                                            {errors.upload_comp_institute_denied_export && (
                                                                                <p style={{ color: "red" }}>{errors.upload_comp_institute_denied_export}</p>
                                                                            )}
                                                                        </Col>

                                                                        <Col md="5">
                                                                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                                                <Form.Label>
                                                                                    Provide details
                                                                                    <span className="text-danger">*</span>
                                                                                </Form.Label>
                                                                                <Form.Control
                                                                                    as="textarea"
                                                                                    name="denied_export_auth_details"
                                                                                    rows={2}
                                                                                    placeholder="Add details"
                                                                                    autoComplete="off"
                                                                                />
                                                                            </Form.Group>
                                                                            {errors.denied_export_auth_details && (
                                                                                <p style={{ color: "red" }}>{errors.denied_export_auth_details}</p>
                                                                            )}
                                                                        </Col>
                                                                    </>
                                                                )}
                                                                {errors.denied_export_auth_last_3_years_yes_no && (
                                                                    <p style={{ color: "red" }}>{errors.denied_export_auth_last_3_years_yes_no}</p>
                                                                )}
                                                            </Form.Group>          </Row>
                                                    </Col>
                                                    <Form.Group as={Col} md="4 mt-3">
                                                        <Form.Label className="form-label"><b>(vi) Background of Company/Institute</b></Form.Label>
                                                        <Form.Control type="file" name="upload_sending_bg_company_add" value={formData.upload_sending_bg_company_add} onChange={handleChange} autoComplete="off" />
                                                        {errors.upload_sending_bg_company_add && (
                                                            <p style={{ color: "red" }}>{errors.upload_sending_bg_company_add}</p>
                                                        )}
                                                    </Form.Group>
                                                </Row>
                                            </CardBody>
                                            <Col className="form-card-sub-tite text-black">
                                                <Row>
                                                    <Col as={Col} md="12">
                                                        <Col className="sub-title p-1">
                                                            <span className="text-center p-1"><strong>(2) Receiving Party</strong></span>
                                                        </Col>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <CardBody>
                                                <Row>
                                                    <Form.Group as={Col} md="4">
                                                        <Form.Label className="form-label"><b>(i) Name of the Recipient<span className="text-danger">*</span></b></Form.Label>
                                                        <Form.Control type="text" name="nameof_recipient" value={formData.nameof_recipient} onChange={handleChange} autoComplete="off" />
                                                        {errors.nameof_recipient && (
                                                            <p style={{ color: "red" }}>{errors.nameof_recipient}</p>
                                                        )}
                                                    </Form.Group>
                                                    <Form.Group as={Col} md="4">
                                                        <Form.Label className="form-label"><b>(ii) Designation of Recipient<span className="text-danger">*</span></b></Form.Label>
                                                        <Form.Control type="text" name="designationof_recipient" value={formData.designationof_recipient} onChange={handleChange} autoComplete="off" />
                                                        {errors.designationof_recipient && (
                                                            <p style={{ color: "red" }}>{errors.designationof_recipient}</p>
                                                        )}
                                                    </Form.Group>
                                                    <Form.Group as={Col} md="4">
                                                        <Form.Label className="form-label"><b>(iii) Address of the Company/Institution<span className="text-danger">*</span></b></Form.Label>
                                                        <Form.Control type="text" name="company_addressof_recipient" value={formData.company_addressof_recipient} onChange={handleChange} autoComplete="off" />
                                                        {errors.company_addressof_recipient && (
                                                            <p style={{ color: "red" }}>{errors.company_addressof_recipient}</p>
                                                        )}
                                                    </Form.Group>
                                                    <Form.Group as={Col} md="4 mt-3">
                                                        <Form.Label className="form-label"><b>(vi) Background of Company/Institute</b></Form.Label>
                                                        <Form.Control type="file" name="uploadbg_company_addressof_recipient" value={formData.uploadbg_company_addressof_recipient} onChange={handleChange} autoComplete="off" />
                                                        {errors.uploadbg_company_addressof_recipient && (
                                                            <p style={{ color: "red" }}>{errors.uploadbg_company_addressof_recipient}</p>
                                                        )}
                                                    </Form.Group>
                                                </Row>
                                            </CardBody>
                                            <Col className="form-card-sub-tite text-black">
                                                <Row>
                                                    <Col as={Col} md="12">
                                                        <Col className="sub-title p-1">
                                                            <span className="text-center p-1"><strong>(3) End User</strong></span>
                                                        </Col>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <CardBody>
                                                <Row>
                                                    <Form.Group as={Col} md="4">
                                                        <Form.Label className="form-label">
                                                            <b>
                                                                (i) If other than the receiving party
                                                                <span className="text-danger">*</span>
                                                            </b>
                                                        </Form.Label>
                                                        <Form.Group>
                                                            <Form.Check type="radio" value="Yes" name="end_user_receiving_party_yesno" checked={formData.end_user_receiving_party_yesno === "Yes"} onChange={handleChange} label="Yes" />
                                                            {showInputEndUser && (
                                                                <>
                                                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                                        <Form.Label>
                                                                            Provide details
                                                                            <span className="text-danger">*</span>
                                                                        </Form.Label>
                                                                        <Form.Control
                                                                            as="textarea"
                                                                            name="end_user_receiving_party_description"
                                                                            rows={2}
                                                                            placeholder="Add details"
                                                                            autoComplete="off"
                                                                        />
                                                                        {errors.end_user_receiving_party_description && (
                                                                            <p style={{ color: "red" }}>{errors.end_user_receiving_party_description}</p>
                                                                        )}
                                                                    </Form.Group>
                                                                </>
                                                            )}
                                                            <Form.Check type="radio" value="No" name="end_user_receiving_party_yesno" checked={formData.end_user_receiving_party_yesno === "No"} onChange={handleChange} label="No" />
                                                            {errors.end_user_receiving_party_yesno && (
                                                                <p style={{ color: "red" }}>{errors.end_user_receiving_party_yesno}</p>
                                                            )}
                                                        </Form.Group>

                                                    </Form.Group>

                                                    {showInputEndUser && (
                                                        <>
                                                            <Form.Group as={Col} md="4">
                                                                <Form.Label className="form-label"><b>(ii) Name of the End user<span className="text-danger">*</span></b></Form.Label>
                                                                <Form.Control type="text" name="nameof_end_user" value={formData.nameof_end_user} onChange={handleChange} autoComplete="off" />
                                                            </Form.Group>
                                                            <Form.Group as={Col} md="4">
                                                                <Form.Label className="form-label"><b>(iii) Address of the End user<span className="text-danger">*</span></b></Form.Label>
                                                                <Form.Control type="text" name="addressof_end_user" value={formData.addressof_end_user} onChange={handleChange} autoComplete="off" />
                                                            </Form.Group>
                                                        </>
                                                    )}
                                                </Row>
                                                <div className="d-flex justify-content-between mt-2 m-2">
                                                    <Button variant="primary" size="md" onClick={saveAsDraft}>Save as Draft</Button>
                                                    <Button variant="primary" size="md" onClick={() => setStep(2)}>Add More Info <FaArrowRight /></Button>
                                                </div>
                                            </CardBody>
                                        </>
                                    )}
                                    {step === 2 && (
                                        <>

                                            <Col className="form-card-sub-tite text-black">
                                                <Row>
                                                    <Col as={Col} md="12">
                                                        <Col className="sub-title p-1">
                                                            <span className="text-center p-1"><strong>(1) Details of Biomaterial to be exported</strong></span>
                                                        </Col>
                                                    </Col>
                                                </Row>
                                            </Col>

                                            <CardBody>
                                                <Row>
                                                    <Col md={4}>
                                                        <Form.Label>
                                                            <strong>(i) Harmonized System (HS) Code of Item to be exported
                                                                <span className="text-danger">*</span>
                                                            </strong>
                                                        </Form.Label>
                                                        <Form.Select
                                                            aria-label="Default select example"
                                                            name="hs_code"
                                                            value={formData.hs_code}
                                                            onChange={handleChange}
                                                        >
                                                            <option value="">Please Select</option>
                                                            {HsCodeOptions.map((option) => (
                                                                <option key={option.value} value={option.value}>
                                                                    {option.label}
                                                                </option>
                                                            ))}

                                                        </Form.Select>
                                                        {errors.hs_code && <p style={{ color: "red" }}>{errors.hs_code}</p>}
                                                    </Col>

                                                    <Col md={4}>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label>
                                                                <strong>Harmonized System (HS) Code Description
                                                                    <span className="text-danger">*</span>
                                                                </strong>
                                                            </Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name="hs_code_description"
                                                                id="hs_code_description"
                                                                value={formData.hs_code_description}
                                                                onChange={handleChange}
                                                                readOnly />
                                                            {errors.hs_code_description && <p style={{ color: "red" }}>{errors.hs_code_description}</p>}
                                                        </Form.Group>

                                                    </Col>
                                                    <Col md={4}>
                                                        <Form.Group>
                                                            <Form.Label>
                                                                <strong>(ii) Nature of biomaterial to be exported <span className="text-danger">*</span></strong>
                                                            </Form.Label>
                                                            <Form.Select
                                                                name="nature_of_biomaterial"
                                                                value={formData.nature_of_biomaterial}
                                                                onChange={handleChange}
                                                            >
                                                                <option value="">Please Select</option>
                                                                {nature_of_biomaterialoptions.map((option) => (
                                                                    <option key={option.value} value={option.value}>
                                                                        {option.label}
                                                                    </option>
                                                                ))}

                                                            </Form.Select>
                                                            {showTextAreaNature && (
                                                                <Form.Group className="mb-3 mt-3" controlId="biomaterialDescription">
                                                                    <Form.Control
                                                                        as="textarea"
                                                                        name="nature_of_biomaterial_details"
                                                                        value={formData.nature_of_biomaterial_details}
                                                                        onChange={handleChange}
                                                                        rows={2}
                                                                        placeholder="Add Details"
                                                                    />
                                                                    {errors.nature_of_biomaterial_details && <p style={{ color: "red" }}>{
                                                                        errors.nature_of_biomaterial_details
                                                                    }</p>}
                                                                </Form.Group>
                                                            )}
                                                        </Form.Group>
                                                        {errors.nature_of_biomaterial && <p style={{ color: "red" }}>{
                                                            errors.nature_of_biomaterial
                                                        }</p>}
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Label>
                                                            <strong>(iii) Where were the samples collected? <span className="text-danger">*</span></strong>
                                                        </Form.Label>
                                                        <Form.Select
                                                            name="where_sample_collected"
                                                            value={formData.where_sample_collected}
                                                            onChange={handleChange}
                                                        >
                                                            <option value="">Please Select</option>
                                                            {where_sample_collectedOption.map((option) => (
                                                                <option key={option.value} value={option.value}>
                                                                    {option.label}
                                                                </option>
                                                            ))}
                                                        </Form.Select>
                                                        {sample_collectedTextArea && (
                                                            <Form.Group className="mb-3 mt-3" controlId="sampleCollectedDescription">
                                                                <Form.Control
                                                                    as="textarea"
                                                                    name="sample_collected_description"
                                                                    value={formData.sample_collected_description}
                                                                    onChange={handleChange}
                                                                    rows={2}
                                                                    placeholder="Add Details"
                                                                />
                                                            </Form.Group>
                                                        )}
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Label>
                                                            <strong>(iv) Has consent been taken from the individuals for the exact purpose for which the samples are being exported? <span className="text-danger">*</span></strong>
                                                        </Form.Label>

                                                        <Form.Group>
                                                            <Form.Check type="radio" value="Yes" name="samples_being_exported" checked={formData.samples_being_exported === "Yes"} onChange={handleChange} inline label="Yes" />
                                                            <Form.Check type="radio" value="No" name="samples_being_exported" checked={formData.samples_being_exported === "No"} onChange={handleChange} inline label="No" />
                                                            {showInputsbeing_exported && (
                                                                <>
                                                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                                        <Form.Label>
                                                                            Provide details
                                                                            <span className="text-danger">*</span>
                                                                        </Form.Label>
                                                                        <Form.Control
                                                                            as="textarea"
                                                                            name="samples_being_exported"
                                                                            rows={2}
                                                                            placeholder="Add details"
                                                                            autoComplete="off"
                                                                        />
                                                                    </Form.Group>
                                                                </>
                                                            )}
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Label>
                                                            <strong>(v) Details of Quantity of samples to be exported<span className="text-danger">*</span></strong>
                                                        </Form.Label>
                                                        <Row>
                                                            <Col md={4}>
                                                                <Form.Group className="mb-3">
                                                                    <Form.Label><strong>Total number of samples<span className="text-danger">*</span></strong></Form.Label>
                                                                    <Form.Control type="text" name="exported_number" id="exported_number"
                                                                        value={formData.exported_number} onChange={handleChange} />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={8}>

                                                                <Form.Label className="text-center w-100"><strong>Volume of each sample<span className="text-danger">*</span></strong></Form.Label>
                                                                <Row>
                                                                    <Col md={6}>
                                                                        <Form.Control type="text" name="vol_of_sample_text" id="vol_of_sample_text"
                                                                            value={formData.vol_of_sample_text} onChange={handleChange} />
                                                                    </Col>
                                                                    <Col md={6}>
                                                                        <Form.Control type="text" name="exported_volume" id="exported_volume"
                                                                            value={formData.exported_volume} onChange={handleChange} />
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Label>
                                                            <strong>(vi) Whether repeat export of samples is envisaged?<span className="text-danger">*</span></strong>
                                                        </Form.Label>
                                                        <Form.Group>
                                                            <Form.Check type="radio" value="Yes" name="repeat_samples_envisaged_yesno" checked={formData.repeat_samples_envisaged_yesno === "Yes"} onChange={handleChange} label="Yes" />
                                                            {showInputsSamplesEnvisaged && (
                                                                <>
                                                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                                        <Form.Label>
                                                                            Provide details
                                                                            <span className="text-danger">*</span>
                                                                        </Form.Label>
                                                                        <Form.Control
                                                                            as="textarea"
                                                                            name="repeat_samples_envisaged"
                                                                            rows={2}
                                                                            placeholder="Add details"
                                                                            autoComplete="off"
                                                                        />
                                                                    </Form.Group>
                                                                </>
                                                            )}
                                                            <Form.Check type="radio" value="No" name="repeat_samples_envisaged_yesno" checked={formData.repeat_samples_envisaged_yesno === "No"} onChange={handleChange} label="No" />

                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                            </CardBody>
                                            <Col className="form-card-sub-tite text-black">
                                                <Row>
                                                    <Col as={Col} md="12">
                                                        <Col className="sub-title p-1">
                                                            <span className="text-center p-1"><strong>(2) Purpose of export of samples</strong></span>
                                                        </Col>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <CardBody>
                                                <Row>
                                                    <Form.Group as={Col} md="4">
                                                        <Form.Label>
                                                            <strong>(i) Specify purpose/ end use<span className="text-danger">*</span></strong>
                                                        </Form.Label>

                                                        <Form.Select
                                                            name="specify_purpose_end_use"
                                                            value={formData.specify_purpose_end_use}
                                                            onChange={handleChange}
                                                        >
                                                            <option value="">Please Select</option>
                                                            {SpecifyPurposeOption.map((option) => (
                                                                <option key={option.value} value={option.value}>
                                                                    {option.label}
                                                                </option>
                                                            ))}
                                                        </Form.Select>
                                                        {SpecifyPurposeTextArea && (
                                                            <Form.Group className="mb-3 mt-3" controlId="sampleCollectedDescription">
                                                                <Form.Control
                                                                    as="textarea"
                                                                    name="specify_purpose_end_use_description"
                                                                    value={formData.specify_purpose_end_use_description}
                                                                    onChange={handleChange}
                                                                    rows={2}
                                                                    placeholder="Add Details"
                                                                />
                                                            </Form.Group>
                                                        )}

                                                    </Form.Group>

                                                    <Form.Group as={Col} md="5">
                                                        <Form.Label className="form-label">
                                                            <strong>(ii) Whether the samples will be used for any research analysis? <span className="text-danger">*</span></strong>
                                                        </Form.Label>
                                                        <div>
                                                            <Form.Check
                                                                type="radio"
                                                                name="whether_samples_used_research_analysis_yesno"
                                                                value="Yes"
                                                                label="Yes"
                                                                onChange={handleChange}
                                                                checked={formData.whether_samples_used_research_analysis_yesno === "Yes"}
                                                                inline
                                                            />
                                                            <Form.Check
                                                                type="radio"
                                                                name="whether_samples_used_research_analysis_yesno"
                                                                value="No"
                                                                label="No"
                                                                onChange={handleChange}
                                                                checked={formData.whether_samples_used_research_analysis_yesno === "No"}
                                                                inline
                                                            />
                                                        </div>

                                                        {/* Select Box (Shown when 'Yes' is selected) */}
                                                        {whetherShowSelectInput && (
                                                            <Form.Select
                                                                name="whether_samples_used_research_analysis"
                                                                onChange={handleChange}
                                                                value={formData.whether_samples_used_research_analysis}
                                                            >
                                                                <option value="">Please Select</option>
                                                                {whetherSamplesUsedResearchOption.map((option) => (
                                                                    <option key={option.value} value={option.value}>
                                                                        {option.label}
                                                                    </option>
                                                                ))}
                                                            </Form.Select>
                                                        )}

                                                        {/* Textarea (Shown when 'Others' is selected) */}
                                                        {whethershowTextArea && (
                                                            <Form.Control
                                                                className="mt-2"
                                                                as="textarea"
                                                                name="whether_samples_used_research_analysis_description"
                                                                placeholder="Add details"
                                                                onChange={handleChange}
                                                                value={formData.whether_samples_used_research_analysis_description}
                                                            />
                                                        )}
                                                    </Form.Group>



                                                    <Form.Group as={Col} md="3">
                                                        <Form.Label>
                                                            <strong>(iii) Give details of the planned analysis<span className="text-danger">*</span></strong>
                                                        </Form.Label>
                                                        <Form.Control type="file" name="details_planned_analysis" value={formData.details_planned_analysis} onChange={handleChange} autoComplete="off" />

                                                    </Form.Group>
                                                </Row>
                                            </CardBody>
                                            <Col className="form-card-sub-tite text-black">
                                                <Row>
                                                    <Col as={Col} md="12">
                                                        <Col className="sub-title p-1">
                                                            <span className="text-center p-1"><strong>(3) Storage of samples/Leftover samples **</strong></span>
                                                        </Col>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <CardBody>
                                                <Row>
                                                    <Form.Group as={Col} md="6">
                                                        <Form.Label>
                                                            <strong>(i) Will leftover samples be stored?<span className="text-danger">*</span></strong>
                                                        </Form.Label>
                                                        <Form.Check type="radio" value="Yes" name="leftover_samples_store_yes_no" checked={formData.leftover_samples_store_yes_no === "Yes"} onChange={handleChange} label="Yes" />
                                                        {showInputsLeftoverSamples && (
                                                            <>
                                                                <Form.Control
                                                                    as="textarea"
                                                                    name="leftover_samples_store"
                                                                    rows={2}
                                                                    placeholder="Add details"
                                                                    autoComplete="off" />
                                                            </>
                                                        )}
                                                        <Form.Check type="radio" value="No" name="leftover_samples_store_yes_no" checked={formData.leftover_samples_store_yes_no === "No"} onChange={handleChange} label="No" />
                                                    </Form.Group>
                                                    <Form.Group as={Col} md="6">
                                                        <Form.Label>
                                                            <strong>(ii) Purpose of samples storage<span className="text-danger">*</span></strong>
                                                        </Form.Label>
                                                        <Form.Select
                                                            name="purposeof_sample_store"
                                                            value={formData.purposeof_sample_store}
                                                            onChange={handleChange}
                                                        >
                                                            <option value="">Please Select</option>
                                                            {PurposeofSamplesOption.map((option) => (
                                                                <option key={option.value} value={option.value}>
                                                                    {option.label}
                                                                </option>
                                                            ))}
                                                        </Form.Select>
                                                        {showInputsPurposeofSamples && (
                                                            <>
                                                                <Form.Control className="mt-2"
                                                                    as="textarea"
                                                                    name="purposeof_sample_store_description"
                                                                    rows={2}
                                                                    placeholder="Add details"
                                                                    autoComplete="off" />
                                                            </>
                                                        )}
                                                    </Form.Group>
                                                    <Form.Group as={Col} md="6">
                                                        <Form.Label>
                                                            <strong>(iii) Duration of the samples storage<span className="text-danger">*</span></strong>
                                                        </Form.Label>
                                                        <Form.Control type="text" name="duration_sample_store"
                                                            value={formData.duration_sample_store} onChange={handleChange} autoComplete="off" />
                                                    </Form.Group>
                                                    <Form.Group as={Col} md="6">
                                                        <Form.Label>
                                                            <strong>(iv) Facility where samples will be stored<span className="text-danger">*</span></strong>
                                                        </Form.Label>
                                                        <Form.Control type="text" name="facilitywhere_samplestore"
                                                            value={formData.facilitywhere_samplestore} onChange={handleChange} autoComplete="off" />
                                                    </Form.Group>
                                                </Row>
                                            </CardBody>
                                            <Col className="form-card-sub-tite text-black">
                                                <Row>
                                                    <Col as={Col} md="12">
                                                        <Col className="sub-title p-1">
                                                            <span className="text-center p-1"><strong>(4) National security concerns</strong></span>
                                                        </Col>
                                                    </Col>
                                                </Row>
                                            </Col>

                                            <CardBody>
                                                <Row>
                                                    <Form.Group as={Col} md="6">
                                                        <Form.Label>
                                                            <strong>(i) Whether the company/institution/department where the material is being exported has any adverse reporting or has figured adversely from a national security angle?<span className="text-danger">*</span></strong>
                                                        </Form.Label>
                                                        <Form.Check type="radio" value="Yes" name="national_security_angle_yes_no" checked={formData.national_security_angle_yes_no === "Yes"} onChange={handleChange} label="Yes" />
                                                        {showInputsNationalSecurity && (
                                                            <>
                                                                <Form.Control
                                                                    as="textarea"
                                                                    name="national_security_angle"
                                                                    rows={2}
                                                                    placeholder="Add details"
                                                                    autoComplete="off" />
                                                            </>
                                                        )}
                                                        <Form.Check type="radio" value="No" name="national_security_angle_yes_no" checked={formData.national_security_angle_yes_no === "No"} onChange={handleChange} label="No" />
                                                    </Form.Group>
                                                    <Form.Group as={Col} md="6">
                                                        <Form.Label>
                                                            <strong>(ii) Whether the company/institution/department where the material is being exported is a subsidiary of a foreign country's army/military?<span className="text-danger">*</span></strong>
                                                        </Form.Label>
                                                        <Form.Check type="radio" value="Yes" name="foreign_country_army_military_yes_no" checked={formData.foreign_country_army_military_yes_no === "Yes"} onChange={handleChange} label="Yes" />
                                                        {showInputsTextForeignCountry && (
                                                            <>
                                                                <Form.Control
                                                                    as="textarea"
                                                                    name="foreign_country_army_military"
                                                                    rows={2}
                                                                    placeholder="Add details"
                                                                    autoComplete="off" />
                                                            </>
                                                        )}
                                                        <Form.Check type="radio" value="No" name="foreign_country_army_military_yes_no" checked={formData.foreign_country_army_military_yes_no === "No"} onChange={handleChange} label="No" />
                                                    </Form.Group>
                                                    <Form.Group as={Col} md="12">
                                                        <Form.Label>
                                                            <strong>(iii) If the Biomaterial contains micro-organisms listed in appendix 3 category 2 of list of SCOMET items, has approval been obtained from DGFT?<span className="text-danger">*</span></strong>
                                                        </Form.Label>
                                                        <Form.Check type="radio" value="Yes" name="biomaterial_approval_yesno" checked={formData.biomaterial_approval_yesno === "Yes"} onChange={handleChange} label="Yes" />
                                                        <Col md={6}>
                                                            {showInputsTextBiomaterialMicro && (
                                                                <>
                                                                    <Form.Control type="file"
                                                                        name="biomaterial_micro_organisms_approval" id="biomaterial_micro_organisms_approval"
                                                                        autoComplete="off" />
                                                                </>
                                                            )}
                                                        </Col>
                                                        <Form.Check type="radio" value="No" name="biomaterial_approval_yesno" checked={formData.biomaterial_approval_yesno === "No"} onChange={handleChange} label="No" />
                                                    </Form.Group>
                                                </Row>
                                            </CardBody>
                                            <Col className="form-card-sub-tite text-black">
                                                <Row>
                                                    <Col as={Col} md="12">
                                                        <Col className="sub-title p-1">
                                                            <span className="text-center p-1"><strong>(5) IBSC/RCGM approval, as applicable ***</strong></span>
                                                        </Col>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <CardBody>
                                                <Row>
                                                    <Form.Group as={Col} md="12">
                                                        <Form.Label>
                                                            <strong>(i) For the export of hazardous micro organisms/genetically engineered organisms or cells has IBSC/RCGM approval been obtained?<span className="text-danger">*</span></strong>
                                                        </Form.Label>
                                                        <Form.Check type="radio" value="Yes" name="ibsc_rcgm_approval_applicable_yesno" checked={formData.ibsc_rcgm_approval_applicable_yesno === "Yes"} onChange={handleChange} label="Yes" />
                                                        <Col md={6}>
                                                            {showInputsTextIbscRcgm && (
                                                                <>
                                                                    <Form.Control type="file"
                                                                        name="ibsc_rcgm_approval_applicable" id="ibsc_rcgm_approval_applicable"
                                                                        autoComplete="off" />
                                                                </>
                                                            )}
                                                        </Col>
                                                        <Form.Check type="radio" value="No" name="ibsc_rcgm_approval_applicable_yesno" checked={formData.ibsc_rcgm_approval_applicable_yesno === "No"} onChange={handleChange} label="No" />
                                                    </Form.Group>
                                                </Row>
                                                <Col xl={12} className="d-flex justify-content-between mt-3">
                                                    <Button variant="warning" size="md" onClick={() => setStep(1)}><FaArrowLeft /> Back to Previous</Button>
                                                    <Col className="save-btn float-right text-end">
                                                        <Button variant="primary" size="md" onClick={saveAsDraft}>Save as Draft</Button>
                                                        <Button variant="primary" size="md" onClick={() => setStep(3)} className="ms-2">Add More Info <FaArrowRight /></Button>
                                                    </Col>
                                                </Col>
                                            </CardBody>
                                        </>
                                    )}
                                    {step === 3 && (
                                        <>
                                            <Col className="form-card-sub-tite text-black">
                                                <Row>
                                                    <Col as={Col} md="12">
                                                        <Col className="sub-title p-1">
                                                            <span className="text-center p-1"><strong>(i) Declaration by the person requesting export/storage of samples (Sender)</strong></span>
                                                        </Col>
                                                    </Col>
                                                </Row>
                                            </Col>

                                            <CardBody>
                                                <Row>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label><span className="d-flex"><Form.Check type="checkbox" name="certifythat" aria-label="checkbox 1" /> &nbsp;<span class="text-danger">*</span>&nbsp;I certify that the information provided in this request form is true and correct to the best of my knowledge, and I hereby declare that the samples referred to herein will be utilized for the purpose of
                                                            <br /> </span><Form.Control type="text" placeholder="Only fetch data populated"
                                                                value={formData.icertify} onChange={handleChange} readOnly /> only, the samples will not be used for any other purposes.
                                                        </Form.Label>
                                                        {errors.certifythat && <p style={{ color: "red" }}>{errors.certifythat}</p>}
                                                    </Form.Group>
                                                </Row>
                                            </CardBody>
                                            <Col className="form-card-sub-tite text-black">
                                                <Row>
                                                    <Col as={Col} md="12">
                                                        <Col className="sub-title p-1">
                                                            <span className="text-center p-1"><strong>(ii) Copy of Commercial contract/Proforma invoice</strong></span>
                                                        </Col>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <CardBody>
                                                <Row>
                                                    <Form.Group as={Col} md="12">
                                                        <span className="d-flex">
                                                            <Form.Check type="checkbox" aria-label="checkbox 1" />&nbsp;
                                                            <span class="text-danger">*</span>
                                                            &nbsp;Certified copy of commercial contract/Proforma invoice is enclosed. Further I undertake to comply FEMA regulations and other guidelines issued by RBI regarding foreign transactions.</span>
                                                    </Form.Group>
                                                    <Form.Group as={Col} md="6">
                                                        <Form.Label className="mt-3"><strong><span class="text-danger">*</span>Upload Certified copy of commercial Contract/Proforma Invoice</strong></Form.Label>
                                                        <Form.Control type="file" id="exampleFormControlFile1" name="certified_copy_proforma" onChange
                                                            value={formData.certified_copy_proforma} />
                                                    </Form.Group>
                                                </Row>
                                            </CardBody>
                                            <Col className="form-card-sub-tite text-black">
                                                <Row>
                                                    <Col as={Col} md="12">
                                                        <Col className="sub-title p-1">
                                                            <span className="text-center p-1"><strong>(iii) Declaration by Recipient of samples</strong></span>
                                                        </Col>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <CardBody>
                                                <Row>
                                                    <Form.Group as={Col} md="6">
                                                        <Form.Label className="mt-3"><strong><span class="text-danger">*</span>Upload duly signed declaration of letter</strong></Form.Label>
                                                        <Form.Control type="file" id="exampleFormControlFile1" name="declaration_letter" onChange
                                                            value={formData.declaration_letter} />
                                                    </Form.Group>
                                                    <Col md={6}>
                                                        <Form.Label className="mt-3">
                                                            <strong>Format for declaration letter</strong>
                                                        </Form.Label>
                                                        <Col>
                                                            <Link to="" className="text-decoration-none">
                                                                <Button variant="primary" size="sm" className="m-2"><i className="fa fa-download"></i> Download</Button>
                                                            </Link>
                                                        </Col>
                                                    </Col>
                                                    <Col>
                                                        <p className="p-2 py-5" style={{ color: "green" }}><b>Note:-</b> Please upload declaration of letter with authorized signature.</p>
                                                    </Col>
                                                    <Col className="col-md-12">
                                                        <Col className="content-for-exp p-2 m-3" style={{ border: "1px solid #ddd" }}>
                                                            <p>*If samples are to be exported to more than one institution/department, a separate request form should be completed for each recipient.</p>
                                                            <p>**Request for storage is necessary if the samples are to be stored.</p>
                                                            <p>*** For the export of infectious biological material, IBSC/RCGM approval to be sought as per the Revised Simplified Procedures/ Guidelines on Import, Export and Exchange of GE organisms and products thereof for R&D purpose, 2020 vide DBT OM dated 17.01.2020 and accordingly, form B3, duly filled in every aspect, to be submitted through IBKP portal. (https://ibkp.dbtindia.gov.in/)</p>
                                                            <p>****To be completed every time prior to shipping sample.</p>
                                                        </Col>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xl={12} className="d-flex justify-content-between mt-2">
                                                        <Button variant="warning" size="md" className="m-2" onClick={() => setStep(2)}><FaArrowLeft /> Back to Previous</Button>
                                                        <div className="save-btn float-right text-end">
                                                            <Button variant="primary" size="md" className="m-2" onClick={saveAsDraft}>Save as Draft</Button>
                                                            <Button variant="primary" size="md" className="m-2" onClick={handleSubmit}>Submit</Button>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </CardBody>


                                        </>
                                    )}
                                </div>
                            </Row>
                        </Form>
                    </Card>
                    {/* Modal for validation messages */}
                    <Modal show={showModal} onHide={() => setShowModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Notification</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{modalMessage}</Modal.Body>
                        <Modal.Footer>
                            <CDBBtn color="primary" onClick={() => setShowModal(false)}>OK</CDBBtn>
                        </Modal.Footer>
                    </Modal>
                </Container>
            </div>

        </>
    );
}

export default ApplyNocRequest;