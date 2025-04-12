import React, { useState } from 'react';
import {
  Table,
  Card,
  Dropdown,
  Form,
  Row,
  Col,
  Button,
  DropdownButton,
  Modal,
  Container
} from 'react-bootstrap';
import { FaSortUp, FaSortDown, FaToggleOn, FaLongArrowAltLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AiOutlineInteraction } from "react-icons/ai";

function ExporterAppList() {
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortColumn, setSortColumn] = useState('application_number');
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [activeRow, setActiveRow] = useState(null);

  // New state for dynamic modals
  const [currentModal, setCurrentModal] = useState(null);
  const [modalData, setModalData] = useState(null);

  const initialData = [
    { application_number: 'APP001APP006APP006', purpose_of: 'testing purpose testing purposetesting purposetesting purposetesting purposetesting purposetesting purpose', date_ofsub: '20-05-2004', archive_sataus: 'Unarchived' },
    { application_number: 'APP002', purpose_of: 'another purpose', date_ofsub: '15-06-2005', archive_sataus: 'Unarchived' },
    { application_number: 'APP003', purpose_of: 'demo purpose', date_ofsub: '10-07-2006', archive_sataus: 'Unarchived' },
    { application_number: 'APP004', purpose_of: 'trial purpose', date_ofsub: '12-08-2007', archive_sataus: 'Unarchived' },
    { application_number: 'APP005', purpose_of: 'test again', date_ofsub: '01-01-2008', archive_sataus: 'Unarchived' },
    { application_number: 'APP006', purpose_of: 'review', date_ofsub: '02-02-2009', archive_sataus: 'Unarchived' },
    { application_number: 'APP007', purpose_of: 'inspection', date_ofsub: '03-03-2010', archive_sataus: 'Unarchived' },
    { application_number: 'APP008', purpose_of: 'final purpose', date_ofsub: '04-04-2011', archive_sataus: 'Unarchived' },
  ];

  const handleSort = (column) => {
    const isAsc = sortColumn === column && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortColumn(column);
  };

  const getSortIcon = (column) => {
    if (sortColumn !== column) return <FaSortUp style={{ color: '#ccc' }} />;
    return sortOrder === 'asc' ? <FaSortUp /> : <FaSortDown />;
  };

  const handleShowArchive = (row) => {
    setActiveRow(row);
    setShowArchiveModal(true);
  };

  const handleCloseArchive = () => {
    setShowArchiveModal(false);
    setActiveRow(null);
  };

  const openModal = (modalName, rowData) => {
    setCurrentModal(modalName);
    setModalData(rowData);
  };

  const closeModal = () => {
    setCurrentModal(null);
    setModalData(null);
  };

  const filteredData = initialData.filter((item) =>
    Object.values(item).some((value) =>
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortOrder === 'asc' ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedData.length / entriesPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const renderPageNumbers = () => {
    return Array.from({ length: totalPages }, (_, i) => (
      <Button
        key={i}
        size="sm"
        variant={currentPage === i + 1 ? 'primary' : 'outline-primary'}
        className="me-1"
        onClick={() => setCurrentPage(i + 1)}
      >
        {i + 1}
      </Button>
    ));
  };
//Query Raised Data
const [subjectof_query_raised,setSubjectof_query_raised] = useState();
const [commentof_query_raised,setCommentof_query_raised] = useState();
const [attechof_query_raised,setAttechof_query_raised] = useState();
  const queryRaisedData = () => {
    console.log("Subject:-" + subjectof_query_raised, "Comment:-" + commentof_query_raised,"Attech:-"+attechof_query_raised);
} 

  return (
    <div className="page-content py-3">
      <Container fluid>
        <Row>
          <Col xl={12}>
            <div className="page-title-box">
              <div className="page-title-right">
                <Link to="#">
                  <Button className="btn btn-primary float-end mb-2" style={{ backgroundColor: "#14468C", border: "#14468C" }}>
                    <FaLongArrowAltLeft /> Back to Lists
                  </Button>
                </Link>
              </div>
              <h4 className="page-title" style={{ fontSize: "20px", fontWeight: "600", color: "#14468C" }}>
                List of New Request Applications
              </h4>
            </div>
          </Col>
        </Row>

        <Card>
          <Card.Body>
            <Row className="mb-3 d-flex justify-content-between align-items-center">
              <Col xs={12} md={4} className="mb-2">
                <Form.Group controlId="entriesPerPage" className="d-flex align-items-center">
                  <Form.Label className="mb-0 me-2">Show entries</Form.Label>
                  <Form.Select
                    size="sm"
                    style={{ width: '80px' }}
                    value={entriesPerPage}
                    onChange={(e) => {
                      setEntriesPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                  >
                    {[10, 20, 30, 50, 100].map((num) => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12} md={4} className="mb-2 ms-auto">
                <Form.Control
                  type="text"
                  placeholder="Search"
                  size="sm"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </Col>
            </Row>

            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Sr. No</th>
                  <th onClick={() => handleSort('application_number')} style={{ cursor: 'pointer', backgroundColor: sortColumn === 'application_number' ? '#f0f0f0' : '' }}>
                    Application Number {getSortIcon('application_number')}
                  </th>
                  <th onClick={() => handleSort('purpose_of')} style={{ cursor: 'pointer', backgroundColor: sortColumn === 'purpose_of' ? '#f0f0f0' : '' }}>
                    Purpose of Application {getSortIcon('purpose_of')}
                  </th>
                  <th onClick={() => handleSort('date_ofsub')} style={{ cursor: 'pointer', backgroundColor: sortColumn === 'date_ofsub' ? '#f0f0f0' : '' }}>
                    Date of Submission {getSortIcon('date_ofsub')}
                  </th>
                  <th onClick={() => handleSort('archive_sataus')} style={{ cursor: 'pointer', backgroundColor: sortColumn === 'archive_sataus' ? '#f0f0f0' : '' }}>
                    Archive Status {getSortIcon('archive_sataus')}
                  </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((row, index) => (
                    <tr key={index}>
                      <td>{(currentPage - 1) * entriesPerPage + index + 1}</td>
                      <td>{row.application_number}</td>
                      <td>{row.purpose_of.length > 50 ? row.purpose_of.slice(0, 50) + '...' : row.purpose_of}</td>
                      <td>{row.date_ofsub}</td>
                      <td>
                        <Button variant="success" size="sm" onClick={() => handleShowArchive(row)}>
                          <FaToggleOn /> {row.archive_sataus}
                        </Button>
                      </td>
                      <td>
                        <DropdownButton size="sm" id="dropdown-item-button" title={
                          <>
                            <AiOutlineInteraction style={{ marginRight: '5px' }} />
                            <span style={{ fontSize: "15px", padding: "5px" }}>View/Action</span>
                          </>
                        }>
                          <Dropdown.Item
                            as="button"
                            className="text-bg-primary"
                            style={{ fontSize: '15px' }}
                            onClick={() => openModal('viewForm', row)}
                          >
                            View form
                          </Dropdown.Item>
                          <Dropdown.Item
                            as="button"
                            className="text-bg-info"
                            style={{ fontSize: '15px' }}
                            onClick={() => openModal('assignCommittee', row)}
                          >
                            Assign to Committee
                          </Dropdown.Item>
                          <Dropdown.Item
                            as="button"
                            className="text-bg-danger"
                            style={{ fontSize: '15px' }}
                            onClick={() => openModal('queryRaised', row)}
                          >
                            Query Raised
                          </Dropdown.Item>
                        </DropdownButton>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">No records found.</td>
                  </tr>
                )}
              </tbody>
            </Table>

            <div className="d-flex justify-content-between align-items-center">
              <div>
                Showing {(currentPage - 1) * entriesPerPage + 1} to{' '}
                {Math.min(currentPage * entriesPerPage, sortedData.length)} of {sortedData.length} entries
              </div>
              <div>
                <Button
                  size="sm"
                  variant="outline-primary"
                  className="me-1"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Previous
                </Button>
                {renderPageNumbers()}
                <Button
                  size="sm"
                  variant="outline-primary"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>

        {/* Archive Confirmation Modal */}
        <Form>
        <Modal show={showArchiveModal} onHide={handleCloseArchive} backdrop="static" size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Archive Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {activeRow && `Are you sure you want to archive ${activeRow.application_number}?`}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseArchive}>Cancel</Button>
            <Button variant="primary" onClick={handleCloseArchive}>Confirm</Button>
          </Modal.Footer>
        </Modal>
        </Form>
        {/* View Form Modal */}
        <Modal show={currentModal === 'viewForm'} onHide={closeModal} backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>View Application</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <pre>{JSON.stringify(modalData, null, 2)}</pre>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>

        {/* Assign to Committee Modal */}
        <Form>
        <Modal show={currentModal === 'assignCommittee'} onHide={closeModal} size="lg" backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>Assign to Committee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Assigning application <strong>{modalData?.application_number}</strong> to a committee.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>Cancel</Button>
            <Button variant="success" onClick={closeModal}>Confirm</Button>
          </Modal.Footer>
        </Modal>
        </Form>
        {/* Query Raised Modal */}
        <Form noValidate method="post"  encType="multipart/form-data">
        <Modal show={currentModal === 'queryRaised'} onHide={closeModal} size="lg" backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>Raise Query</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* <p>Raise a query for application <strong>{modalData?.application_number}</strong>.</p>
            --*/}
            <Form.Control type="hidden" name="app_no" value={modalData?.application_number}/>
             <Form.Group className="mb-3">
        <Form.Label>Query Suject<span className="text-danger">*</span></Form.Label>
        <Form.Control type="text" name="subjectof_query_raised" id="subjectof_query_raised"
                    value={subjectof_query_raised} onChange={(e) => setSubjectof_query_raised(e.target.value)} autoComplete="off" />
            
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Query Comment <span className="text-danger">*</span></Form.Label>
        <Form.Control as="textarea" name="commentof_query_raised" id="commentof_query_raised"
                    value={commentof_query_raised} onChange={(e) => setCommentof_query_raised(e.target.value)} rows={2} autoComplete="off" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Upload Document <span className="text-danger">*</span></Form.Label>
        <Form.Control type="file" name="attechof_query_raised" id="attechof_query_raised"
                    value={attechof_query_raised} onChange={(e) => setAttechof_query_raised(e.target.value)} autoComplete="off" />
      </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={closeModal}>Cancel</Button>
            <Button variant="primary" onClick={queryRaisedData}>Submit Query</Button>
          </Modal.Footer>
        </Modal>
        </Form>
      </Container>
    </div>
  );
}

export default ExporterAppList;
