
import React, { useState, useEffect } from 'react'
import {
    Button,
    Card,
    Col,
    Container,
    Form,
    Row,
    Table,
} from 'react-bootstrap'
import { FaPenNib, FaPlus } from 'react-icons/fa'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import { MdOutlineToggleOn, MdOutlineToggleOff } from 'react-icons/md'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'

function ListSamplesCollected() {
    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const successMessage = queryParams.get('success')

    const [samples_collected, setSampleCollected] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [deleteMessage, setDeleteMessage] = useState('')
    const [entriesPerPage, setEntriesPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)

    const fetchSamplesData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/samples_collected')
            setSampleCollected(response.data)
        } catch (err) {
            console.error('Error fetching Samples Collected:', err)
        }
    }

    useEffect(() => {
        fetchSamplesData()
    }, [])

    const handleEdit = (id) => navigate(`/admin/sample-collected/edit/${id}`)

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        })

        if (result.isConfirmed) {
            try {
                const response = await fetch(`http://localhost:5000/api/samples_collected/delete/${id}`, {
                    method: 'DELETE',
                })

                if (response.ok) {
                    Swal.fire('Deleted!', 'Sample Collected has been deleted.', 'success')
                    setDeleteMessage('Sample Collected has been deleted successfully.')
                    fetchSamplesData()
                } else {
                    Swal.fire('Error!', 'Failed to delete the Sample Collected.', 'error')
                }
            } catch (err) {
                setDeleteMessage('Something went wrong. Try again.' + err.message)
                Swal.fire('Oops!', 'Something went wrong.', 'error')
            }
        }
    }

    const handleStatus = async (id) => {
        try {
            const response = await fetch(
                `http://localhost:5000/api/samples_collected/status/${id}`,
                { method: 'PUT' }
            )
            const data = await response.json()
            if (response.ok) {
                alert('Sample Collected status updated successfully.')
                fetchSamplesData()
            } else {
                alert('Failed to update Sample Collected status: ' + data.error)
            }
        } catch (err) {
            console.error('Error updating Sample Collected status:', err)
        }
    }

    // Filter and paginate
    const filteredSampleData = samples_collected.filter((sample_collected) =>
        sample_collected.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const indexOfLastItem = currentPage * entriesPerPage
    const indexOfFirstItem = indexOfLastItem - entriesPerPage
    const currentSamples = filteredSampleData.slice(indexOfFirstItem, indexOfLastItem)
    const totalPages = Math.ceil(filteredSampleData.length / entriesPerPage)

    return (
        <div className="page-content py-3">
            <Container fluid>
                <Row>
                    <Col xl={12}>
                        <div className="page-title-box d-flex justify-content-between align-items-center">
                            <h4
                                className="page-title text-start"
                                style={{
                                    fontSize: '20px',
                                    fontWeight: '600',
                                    color: '#14468C',
                                }}
                            >
                                All Samples Collected List
                            </h4>
                            <div className="page-title-right">
                                <Link to="/admin/sample-collected/add_new">
                                    <button
                                        className="btn btn-primary mb-2"
                                        style={{ backgroundColor: '#14468C', border: 'none' }}
                                    >
                                        <FaPlus /> Add Sample Collected
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </Col>
                </Row>

                {deleteMessage && (
                    <div
                        className="alert alert-danger alert-dismissible fade show"
                        sample_collected="alert"
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
                    <div
                        className="alert alert-success alert-dismissible fade show"
                        sample_collected="alert"
                    >
                        <strong>Success!</strong> {successMessage}
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="alert"
                        ></button>
                    </div>
                )}



                <Row>
                    <Col xl={12}>
                        <Card>
                            <Card.Body>
                                <Row className="mb-3 align-items-center">
                                    <Col md={6}>
                                        <div className="d-flex align-items-center">
                                            <label className="me-2 mb-0">Show entries</label>
                                            <Form.Select
                                                style={{ width: '80px' }}
                                                value={entriesPerPage}
                                                onChange={(e) => {
                                                    setEntriesPerPage(Number(e.target.value))
                                                    setCurrentPage(1)
                                                }}
                                            >
                                                <option value="5">5</option>
                                                <option value="10">10</option>
                                                <option value="25">25</option>
                                                <option value="50">50</option>
                                            </Form.Select>
                                        </div>
                                    </Col>
                                    <Col md={6} className="text-end">
                                        <Form.Control
                                            type="text"
                                            placeholder="Search"
                                            value={searchTerm}
                                            onChange={(e) => {
                                                setSearchTerm(e.target.value)
                                                setCurrentPage(1)
                                            }}
                                            style={{ maxWidth: '250px', marginLeft: 'auto' }}
                                        />
                                    </Col>
                                </Row>
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>Sr. No</th>
                                            <th>Sample Collected Name</th>
                                            <th>Sample Collected Slug</th>
                                            <th>Date of Creation</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentSamples.length > 0 ? (
                                            currentSamples.map((sample_collected, index) => (
                                                <tr key={sample_collected._id}>
                                                    <td>{indexOfFirstItem + index + 1}</td>
                                                    <td>{sample_collected.name}</td>
                                                    <td>{sample_collected.slug}</td>
                                                    <td>{new Date(sample_collected.createdAt).toLocaleString()}</td>
                                                    <td>
                                                        <Button
                                                            onClick={() => handleStatus(sample_collected._id)}
                                                            variant={
                                                                sample_collected.status === '1' ? 'success' : 'danger'
                                                            }
                                                        >
                                                            {sample_collected.status === '1' ? (
                                                                <MdOutlineToggleOn />
                                                            ) : (
                                                                <MdOutlineToggleOff />
                                                            )}
                                                        </Button>
                                                    </td>
                                                    <td>
                                                        <Button
                                                            variant="primary"
                                                            onClick={() => handleEdit(sample_collected._id)}
                                                        >
                                                            <FaPenNib />
                                                        </Button>{' '}
                                                        <Button
                                                            variant="danger"
                                                            onClick={() => handleDelete(sample_collected._id)}
                                                        >
                                                            <RiDeleteBin6Fill />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="text-center">
                                                    No Sample Collected found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>

                                {/* Pagination */}
                                <div className="d-flex justify-content-between align-items-center mt-3">
                                    <div>
                                        Showing {indexOfFirstItem + 1} to{' '}
                                        {Math.min(indexOfLastItem, filteredSampleData.length)} of{' '}
                                        {filteredSampleData.length} entries
                                    </div>
                                    <nav>
                                        <ul className="pagination mb-0">
                                            {[...Array(totalPages)].map((_, index) => (
                                                <li
                                                    key={index}
                                                    className={`page-item ${currentPage === index + 1 ? 'active' : ''
                                                        }`}
                                                >
                                                    <button
                                                        className="page-link"
                                                        onClick={() => setCurrentPage(index + 1)}
                                                        style={{
                                                            borderColor: '#dee2e6',
                                                            backgroundColor:
                                                                currentPage === index + 1 ? '#0d6efd' : '',
                                                            color: currentPage === index + 1 ? 'white' : '',
                                                            borderRadius: '0.375rem',
                                                        }}
                                                    >
                                                        {index + 1}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </nav>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ListSamplesCollected

