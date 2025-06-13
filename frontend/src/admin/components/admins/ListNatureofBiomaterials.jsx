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

function ListNatureofBiomaterials() {
    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const successMessage = queryParams.get('success')

    const [natural_materials, setNaturalMaterial] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [deleteMessage, setDeleteMessage] = useState('')
    const [entriesPerPage, setEntriesPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)

    const fetchNaturalData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/natutalof_biomaterials')
            setNaturalMaterial(response.data)
        } catch (err) {
            console.error('Error fetching natutalof_biomaterials:', err)
        }
    }

    useEffect(() => {
        fetchNaturalData()
    }, [])

    const handleEdit = (id) => navigate(`/admin/naturalof-biomaterial/edit/${id}`)

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
                const response = await fetch(`http://localhost:5000/api/natutalof_biomaterials/delete/${id}`, {
                    method: 'DELETE',
                })

                if (response.ok) {
                    Swal.fire('Deleted!', 'Natural material has been deleted.', 'success')
                    setDeleteMessage('Natural material has been deleted successfully.')
                    fetchNaturalData()
                } else {
                    Swal.fire('Error!', 'Failed to delete the natural_material.', 'error')
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
                `http://localhost:5000/api/natutalof_biomaterials/status/${id}`,
                { method: 'PUT' }
            )
            const data = await response.json()
            if (response.ok) {
                alert('Natural material status updated successfully.')
                fetchNaturalData()
            } else {
                alert('Failed to update natural_material status: ' + data.error)
            }
        } catch (err) {
            console.error('Error updating natural_material status:', err)
        }
    }

    // Filter and paginate
    const filteredNaturalData = natural_materials.filter((natural_material) =>
        natural_material.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const indexOfLastItem = currentPage * entriesPerPage
    const indexOfFirstItem = indexOfLastItem - entriesPerPage
    const currentNaturals = filteredNaturalData.slice(indexOfFirstItem, indexOfLastItem)
    const totalPages = Math.ceil(filteredNaturalData.length / entriesPerPage)

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
                                All Naturals Biomaterial List
                            </h4>
                            <div className="page-title-right">
                                <Link to="/admin/naturalof-biomaterial/add_new">
                                    <button
                                        className="btn btn-primary mb-2"
                                        style={{ backgroundColor: '#14468C', border: 'none' }}
                                    >
                                        <FaPlus /> Add Natural of material
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </Col>
                </Row>

                {deleteMessage && (
                    <div
                        className="alert alert-danger alert-dismissible fade show"
                        natural_material="alert"
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
                        natural_material="alert"
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
                                            <th>Natural of Biomaterial Name</th>
                                            <th>Natural of Material Slug</th>
                                            <th>Date of Creation</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentNaturals.length > 0 ? (
                                            currentNaturals.map((natural_material, index) => (
                                                <tr key={natural_material._id}>
                                                    <td>{indexOfFirstItem + index + 1}</td>
                                                    <td>{natural_material.name}</td>
                                                    <td>{natural_material.slug}</td>
                                                    <td>{new Date(natural_material.createdAt).toLocaleString()}</td>
                                                    <td>
                                                        <Button
                                                            onClick={() => handleStatus(natural_material._id)}
                                                            variant={
                                                                natural_material.status === '1' ? 'success' : 'danger'
                                                            }
                                                        >
                                                            {natural_material.status === '1' ? (
                                                                <MdOutlineToggleOn />
                                                            ) : (
                                                                <MdOutlineToggleOff />
                                                            )}
                                                        </Button>
                                                    </td>
                                                    <td>
                                                        <Button
                                                            variant="primary"
                                                            onClick={() => handleEdit(natural_material._id)}
                                                        >
                                                            <FaPenNib />
                                                        </Button>{' '}
                                                        <Button
                                                            variant="danger"
                                                            onClick={() => handleDelete(natural_material._id)}
                                                        >
                                                            <RiDeleteBin6Fill />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="text-center">
                                                    No Natural of material found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>

                                {/* Pagination */}
                                <div className="d-flex justify-content-between align-items-center mt-3">
                                    <div>
                                        Showing {indexOfFirstItem + 1} to{' '}
                                        {Math.min(indexOfLastItem, filteredNaturalData.length)} of{' '}
                                        {filteredNaturalData.length} entries
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

export default ListNatureofBiomaterials

