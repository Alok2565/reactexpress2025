import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, Table, Button, Spinner } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

function ImpExpHolderLists() {
    
  const [impexpData, setImpExp] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const successMessage = queryParams.get('success');

  useEffect(() => {
    const fetchImpExp = async (req,resp) => {
      try {
        const resp = await fetch('http://localhost:5000/api/importers-exporters');
        const data = await resp.json();
        setImpExp(data);
        setLoading(false);
      } catch (err) {
        //console.error('Failed to fetch roles', err);
        setLoading(false);
      }
    };

    fetchImpExp();
  }, []);

  return (
    <div className="page-content py-2">
      <Container fluid>
        <Row>
          <Col lg={12}>
            <div className="page-title-box">
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="mb-3" style={{ color: "#14468C", fontWeight: 600 }}>importer/Exporter List</h4>
                <Link to="/admin/add-impexp-holder/">
                  <Button className="btn btn-primary mb-2" style={{ backgroundColor: "#14468C", borderColor: "#14468C" }}>
                    Add New ImpExporter
                  </Button>
                </Link>
              </div>
            </div>
          </Col>
        </Row>

        <Card>
        <div>
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {/* Your role list table here */}
    </div>
          <CardBody>
            {loading ? (
              <div className="text-center py-3">
                <Spinner animation="border" variant="primary" />
              </div>
            ) : (
              <Table bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>IEC Code</th>
                    <th>Name</th>
                    <th>Name of Contact Person</th>
                    <th>Designation</th>
                    <th>Email Address</th>
                    <th>Address</th>
                    <th>Mobile</th>
                    <th>Created At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {impexpData.map((impexp, index) => (
                    <tr key={impexp._id}>
                      <td>{index + 1}</td>
                      <td>{impexp.iec_code}</td>
                      <td>{impexp.name}</td>
                      <td>{impexp.name_ofCPerson}</td>
                      <td>{impexp.designation}</td>
                      <td>{impexp.email}</td>
                      <td>{impexp.address}, {impexp.address2}, {impexp.city}, {impexp.state}, {impexp.pincode}</td>
                      {/* <td>{impexp.city}</td>
                      <td>{impexp.state}</td>
                      <td>{impexp.pincode}</td> */}
                      <td>{impexp.mobile_number}</td>
                      <td>{new Date(impexp.createdAt).toLocaleDateString()}</td>
                      
                      <td>
                        {/* Add edit/delete logic here */}
                        <Button variant="warning" size="sm" className="me-2">Edit</Button>
                        <Button variant="danger" size="sm">Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </CardBody>
        </Card>
      </Container>
    </div>
  );
}

export default ImpExpHolderLists;
