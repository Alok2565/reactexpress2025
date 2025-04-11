// import React, { useState } from 'react';
// import { Table, Card, Dropdown, Form, Row, Col, Button,DropdownButton,Modal } from 'react-bootstrap';
// import { FaSortUp, FaSortDown,FaToggleOn } from 'react-icons/fa';

// function RejectExpAppList() {
//   //const [showDropdownIndex, setShowDropdownIndex] = useState(null);
//   const [sortOrder, setSortOrder] = useState('asc');
//   const [sortColumn, setSortColumn] = useState('application_number');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [entriesPerPage, setEntriesPerPage] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);

//   const initialData = [
//     { application_number: 'APP001APP006APP006', purpose_of: 'testing purpose testing purposetesting purposetesting purposetesting purposetesting purposetesting purpose', date_ofsub: '20-05-2004', archive_sataus: 'Unrchived' },
//     { application_number: 'APP002', purpose_of: 'another purpose', date_ofsub: '15-06-2005', archive_sataus: 'Unrchived' },
//     { application_number: 'APP003', purpose_of: 'demo purpose', date_ofsub: '10-07-2006', archive_sataus: 'Unrchived' },
//     { application_number: 'APP004', purpose_of: 'trial purpose', date_ofsub: '12-08-2007', archive_sataus: 'Unrchived' },
//     { application_number: 'APP005', purpose_of: 'test again', date_ofsub: '01-01-2008', archive_sataus: 'Unrchived' },
//     { application_number: 'APP006', purpose_of: 'review', date_ofsub: '02-02-2009', archive_sataus: 'Unrchived' },
//     { application_number: 'APP007', purpose_of: 'inspection', date_ofsub: '03-03-2010', archive_sataus: 'Unrchived' },
//     { application_number: 'APP008', purpose_of: 'final purpose', date_ofsub: '04-04-2011', archive_sataus: 'Unrchived' },
//     { application_number: 'APP001APP006APP006', purpose_of: 'testing purpose testing purposetesting purposetesting purposetesting purposetesting purposetesting purpose', date_ofsub: '20-05-2004', archive_sataus: 'Unrchived' },
//     { application_number: 'APP002', purpose_of: 'another purpose', date_ofsub: '15-06-2005', archive_sataus: 'Unrchived' },
//     { application_number: 'APP003', purpose_of: 'demo purpose', date_ofsub: '10-07-2006', archive_sataus: 'Unrchived' },
//     { application_number: 'APP004', purpose_of: 'trial purpose', date_ofsub: '12-08-2007', archive_sataus: 'Unrchived' },
//     { application_number: 'APP005', purpose_of: 'test again', date_ofsub: '01-01-2008', archive_sataus: 'Unrchived' },
//     { application_number: 'APP006', purpose_of: 'review', date_ofsub: '02-02-2009', archive_sataus: 'Unrchived' },
//     { application_number: 'APP007', purpose_of: 'inspection', date_ofsub: '03-03-2010', archive_sataus: 'Unrchived' },
//     { application_number: 'APP008', purpose_of: 'final purpose', date_ofsub: '04-04-2011', archive_sataus: 'Unrchived' },
//   ];

//   const handleSort = (column) => {
//     const isAsc = sortColumn === column && sortOrder === 'asc';
//     setSortOrder(isAsc ? 'desc' : 'asc');
//     setSortColumn(column);
//   };

//   const getSortIcon = (column) => {
//     if (sortColumn !== column) return <FaSortUp style={{ color: '#ccc' }} />;
//     return sortOrder === 'asc' ? <FaSortUp /> : <FaSortDown />;
//   };

//   const filteredData = initialData.filter((item) =>
//     Object.values(item).some((value) =>
//       value.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   );

//   const sortedData = [...filteredData].sort((a, b) => {
//     if (a[sortColumn] < b[sortColumn]) return sortOrder === 'asc' ? -1 : 1;
//     if (a[sortColumn] > b[sortColumn]) return sortOrder === 'asc' ? 1 : -1;
//     return 0;
//   });

//   const totalPages = Math.ceil(sortedData.length / entriesPerPage);
//   const paginatedData = sortedData.slice(
//     (currentPage - 1) * entriesPerPage,
//     currentPage * entriesPerPage
//   );

//   const renderPageNumbers = () => {
//     return Array.from({ length: totalPages }, (_, i) => (
//       <Button
//         key={i}
//         size="sm"
//         variant={currentPage === i + 1 ? 'primary' : 'outline-primary'}
//         className="me-1"
//         onClick={() => setCurrentPage(i + 1)}
//       >
//         {i + 1}
//       </Button>
//     ));
//   };
//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
//   return (
//     <div className="container mt-4">
//       <Card>
//         <Card.Body>
//           <Row className="mb-3 d-flex justify-content-between align-items-center">
//             <Col xs={12} md={4} className="mb-2">
//               <Form.Group controlId="entriesPerPage" className="d-flex align-items-center">
//                 <Form.Label className="mb-0 me-2">Show entries</Form.Label>
//                 <Form.Select
//                   size="sm"
//                   style={{ width: '80px' }}
//                   value={entriesPerPage}
//                   onChange={(e) => {
//                     setEntriesPerPage(Number(e.target.value));
//                     setCurrentPage(1);
//                   }}
//                 >
//                   {[10, 20, 30, 50, 100].map((num) => (
//                     <option key={num} value={num}>
//                       {num}
//                     </option>
//                   ))}
//                 </Form.Select>
//               </Form.Group>
//             </Col>
//             <Col xs={12} md={4} className="mb-2 ms-auto">
//               <Form.Control
//                 type="text"
//                 placeholder="Search"
//                 size="sm"
//                 value={searchTerm}
//                 onChange={(e) => {
//                   setSearchTerm(e.target.value);
//                   setCurrentPage(1);
//                 }}
//               />
//             </Col>
//           </Row>

//           <Table striped bordered hover responsive>
//             <thead>
//               <tr>
//                 <th>Sr. No</th>
//                 <th onClick={() => handleSort('application_number')} style={{ cursor: 'pointer' }}>
//                   Application Number {getSortIcon('application_number')}
//                 </th>
//                 <th onClick={() => handleSort('purpose_of')} style={{ cursor: 'pointer' }}>
//                   Purpose of Application {getSortIcon('purpose_of')}
//                 </th>
//                 <th onClick={() => handleSort('date_ofsub')} style={{ cursor: 'pointer' }}>
//                   Date of Submission {getSortIcon('date_ofsub')}
//                 </th>
//                 <th onClick={() => handleSort('archive_sataus')} style={{ cursor: 'pointer' }}>
//                   Archive Status {getSortIcon('archive_sataus')}
//                 </th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {paginatedData.length > 0 ? (
//                 paginatedData.map((row, index) => (
//                   <tr key={index}>
//                     <td>{(currentPage - 1) * entriesPerPage + index + 1}</td>
//                     <td>{row.application_number}</td>
//                     <td>{row.purpose_of}</td>
//                     <td>{row.date_ofsub}</td>
//                     <td>
//                     <Button variant="success" size="sm" onClick={handleShow}>
//                     <FaToggleOn /> {row.archive_sataus}
//         </Button>
//         <Modal
//         show={show}
//         onHide={handleClose}
//         backdrop="static"
//         keyboard={false}
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Modal title</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           I will not close if you click outside me. Do not even try to press
//           escape key.
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="primary">Understood</Button>
//         </Modal.Footer>
//       </Modal>
//                     </td>
//                     <td>
//                       {/* <Dropdown
//                         show={showDropdownIndex === index}
//                         onMouseEnter={() => setShowDropdownIndex(index)}
//                         onMouseLeave={() => setShowDropdownIndex(null)}
//                       >
//                         <Dropdown.Toggle variant="secondary" size="sm" id={`dropdown-${index}`}>
//                           Options
//                         </Dropdown.Toggle>
//                         <Dropdown.Menu className="custom-dropdown-menu">
//   <Dropdown.Item href="#/view">View</Dropdown.Item>
//   <Dropdown.Item href="#/edit">Edit</Dropdown.Item>
//   <Dropdown.Item href="#/delete">Delete</Dropdown.Item>
// </Dropdown.Menu>
//                       </Dropdown> */}
//                       <DropdownButton size="sm" id="dropdown-item-button" title="View/Action">
//       <Dropdown.Item as="button" className="text-bg-primary" style={{ fontSize:"15px" }}>View form</Dropdown.Item>
//       <Dropdown.Item as="button" className="text-bg-info" style={{ fontSize:"15px" }}>Assign to Committee</Dropdown.Item>
//       <Dropdown.Item as="button" className="text-bg-danger" style={{ fontSize:"15px" }}>Query Raised</Dropdown.Item>
//     </DropdownButton>
    
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="6" className="text-center">No records found.</td>
//                 </tr>
//               )}
//             </tbody>
//           </Table>

//           {/* Pagination Controls */}
//           <div className="d-flex justify-content-between align-items-center">
//             <div>
//               Showing {(currentPage - 1) * entriesPerPage + 1} to{' '}
//               {Math.min(currentPage * entriesPerPage, sortedData.length)} of {sortedData.length} entries
//             </div>
//             <div>
//               <Button
//                 size="sm"
//                 variant="outline-primary"
//                 className="me-1"
//                 disabled={currentPage === 1}
//                 onClick={() => setCurrentPage(currentPage - 1)}
//               >
//                 Previous
//               </Button>
//               {renderPageNumbers()}
//               <Button
//                 size="sm"
//                 variant="outline-primary"
//                 disabled={currentPage === totalPages}
//                 onClick={() => setCurrentPage(currentPage + 1)}
//               >
//                 Next
//               </Button>
//             </div>
//           </div>
//         </Card.Body>
//       </Card>
//     </div>
//   );
// }

// export default RejectExpAppList;

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
  Modal,Container,
} from 'react-bootstrap';
import { FaSortUp, FaSortDown, FaToggleOn, FaLongArrowAltLeft, } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function RejectExpAppList() {
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortColumn, setSortColumn] = useState('application_number');
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [show, setShow] = useState(false);
  const [activeRow, setActiveRow] = useState(null);

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

  const handleShow = (row) => {
    setActiveRow(row);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setActiveRow(null);
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

  return (
    <>
    <div className="page-content py-3">
      <Container fluid>
        <Row>
                                <Col xl={12}>
                                    <div className="page-title-box">
                                        <div className="page-title-right">
                                            <Link to="#">
                                            <Button className="btn btn-primary float-end mb-2" style={{ backgroundColor: "#14468C", border: "#14468C" }}>
                                                <FaLongArrowAltLeft /> Back to Lists
                                            </Button></Link>
                                        </div>
                                        <h4 className="page-title" style={{ fontSize: "20px", fontWeight: "600", color: "#14468C" }}>
                                        List of Reject Applications
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
                    <option key={num} value={num}>
                      {num}
                    </option>
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
                      <Button variant="success" size="sm" onClick={() => handleShow(row)}>
                        <FaToggleOn /> {row.archive_sataus}
                      </Button>
                    </td>
                    <td>
                      <DropdownButton size="sm" id="dropdown-item-button" title="View/Action">
                        <Dropdown.Item as="button" className="text-bg-primary" style={{ fontSize: '15px' }}>
                          View form
                        </Dropdown.Item>
                        <Dropdown.Item as="button" className="text-bg-info" style={{ fontSize: '15px' }}>
                          Assign to Committee
                        </Dropdown.Item>
                        <Dropdown.Item as="button" className="text-bg-danger" style={{ fontSize: '15px' }}>
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

      {/* Modal for archive status */}
      <Modal className="modal-lg" show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Archive Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {activeRow ? `Are you sure you want to archive ${activeRow.application_number}?` : ''}

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      </Container>
    </div>
    </>
  );
}

export default RejectExpAppList;

