// import React, { useState, useEffect } from 'react'
// import {
//     Button,
//     Card,
//     Col,
//     Container,
//     Form,
//     Row,
//     Table,
// } from 'react-bootstrap'
// import { FaPenNib, FaPlus } from 'react-icons/fa'
// import { RiDeleteBin6Fill } from 'react-icons/ri'
// import { MdOutlineToggleOn, MdOutlineToggleOff } from 'react-icons/md'
// import { Link, useLocation, useNavigate } from 'react-router-dom'
// import Swal from 'sweetalert2'
// import axios from 'axios'

// function ListHomeBanners() {
//     const navigate = useNavigate()
//     const location = useLocation()
//     const queryParams = new URLSearchParams(location.search)
//     const successMessage = queryParams.get('success')

//     const [banners, setHomeSlider] = useState([])
//     const [searchTerm, setSearchTerm] = useState('')
//     const [deleteMessage, setDeleteMessage] = useState('')
//     const [entriesPerPage, setEntriesPerPage] = useState(10)
//     const [currentPage, setCurrentPage] = useState(1)

//      const [previewImage, setPreviewImage] = useState('');

//     const fetchBannerData = async () => {
//         try {
//             const response = await axios.get('http://localhost:5000/api/home_sliders')
//             const home_slider = response.data;
//             setHomeSlider(home_slider);
//             setPreviewImage(`http://localhost:5000/uploads/banner_sliders/${home_slider.image}`);

//         } catch (err) {
//             console.error('Error fetching Home Slider:', err)
//         }
//     }

//     useEffect(() => {
//         fetchBannerData()
//     }, [])

//     const handleEdit = (id) => navigate(`/admin/home-banner/edit/${id}`)

//     const handleDelete = async (id) => {
//         const result = await Swal.fire({
//             title: 'Are you sure?',
//             text: "You won't be able to revert this!",
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#d33',
//             cancelButtonColor: '#3085d6',
//             confirmButtonText: 'Yes, delete it!',
//         })

//         if (result.isConfirmed) {
//             try {
//                 const response = await fetch(`http://localhost:5000/api/home_sliders/delete/${id}`, {
//                     method: 'DELETE',
//                 })

//                 if (response.ok) {
//                     Swal.fire('Deleted!', 'Home Banner Slider has been deleted.', 'success')
//                     setDeleteMessage('Home Banner Slider has been deleted successfully.')
//                     fetchBannerData()
//                 } else {
//                     Swal.fire('Error!', 'Failed to delete the home sliders.', 'error')
//                 }
//             } catch (err) {
//                 setDeleteMessage('Something went wrong. Try again.' + err.message)
//                 Swal.fire('Oops!', 'Something went wrong.', 'error')
//             }
//         }
//     }

//     const handleStatus = async (id) => {
//         try {
//             const response = await fetch(
//                 `http://localhost:5000/api/home_sliders/status/${id}`,
//                 { method: 'PUT' }
//             )
//             const data = await response.json()
//             if (response.ok) {
//                 alert('Home Banner Slider status updated successfully.')
//                 fetchBannerData()
//             } else {
//                 alert('Failed to update Home Banner Slider status: ' + data.error)
//             }
//         } catch (err) {
//             console.error('Error updating Home Banner Slider status:', err)
//         }
//     }

//     // Filter and paginate
//     const filteredBannersData = banners.filter((banner) =>
//         banner.name.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//     const indexOfLastItem = currentPage * entriesPerPage
//     const indexOfFirstItem = indexOfLastItem - entriesPerPage
//     const currentBanners = filteredBannersData.slice(indexOfFirstItem, indexOfLastItem)
//     const totalPages = Math.ceil(filteredBannersData.length / entriesPerPage)

//     return (
//         <div className="page-content py-3">
//             <Container fluid>
//                 <Row>
//                     <Col xl={12}>
//                         <div className="page-title-box d-flex justify-content-between align-items-center">
//                             <h4
//                                 className="page-title text-start"
//                                 style={{
//                                     fontSize: '20px',
//                                     fontWeight: '600',
//                                     color: '#14468C',
//                                 }}
//                             >
//                                 All Home Banner Slider List
//                             </h4>
//                             <div className="page-title-right">
//                                 <Link to="/admin/Home-banner/add_new">
//                                     <button
//                                         className="btn btn-primary mb-2"
//                                         style={{ backgroundColor: '#14468C', border: 'none' }}
//                                     >
//                                         <FaPlus /> Add Home Slider
//                                     </button>
//                                 </Link>
//                             </div>
//                         </div>
//                     </Col>
//                 </Row>

//                 {deleteMessage && (
//                     <div
//                         className="alert alert-danger alert-dismissible fade show"
//                         banner="alert"
//                     >
//                         <strong>Deleted!</strong> {deleteMessage}
//                         <button
//                             type="button"
//                             className="btn-close"
//                             data-bs-dismiss="alert"
//                         ></button>
//                     </div>
//                 )}
//                 {successMessage && (
//                     <div
//                         className="alert alert-success alert-dismissible fade show"
//                         banner="alert"
//                     >
//                         <strong>Success!</strong> {successMessage}
//                         <button
//                             type="button"
//                             className="btn-close"
//                             data-bs-dismiss="alert"
//                         ></button>
//                     </div>
//                 )}



//                 <Row>
//                     <Col xl={12}>
//                         <Card>
//                             <Card.Body>
//                                 <Row className="mb-3 align-items-center">
//                                     <Col md={6}>
//                                         <div className="d-flex align-items-center">
//                                             <label className="me-2 mb-0">Show entries</label>
//                                             <Form.Select
//                                                 style={{ width: '80px' }}
//                                                 value={entriesPerPage}
//                                                 onChange={(e) => {
//                                                     setEntriesPerPage(Number(e.target.value))
//                                                     setCurrentPage(1)
//                                                 }}
//                                             >
//                                                 <option value="5">5</option>
//                                                 <option value="10">10</option>
//                                                 <option value="25">25</option>
//                                                 <option value="50">50</option>
//                                             </Form.Select>
//                                         </div>
//                                     </Col>
//                                     <Col md={6} className="text-end">
//                                         <Form.Control
//                                             type="text"
//                                             placeholder="Search"
//                                             value={searchTerm}
//                                             onChange={(e) => {
//                                                 setSearchTerm(e.target.value)
//                                                 setCurrentPage(1)
//                                             }}
//                                             style={{ maxWidth: '250px', marginLeft: 'auto' }}
//                                         />
//                                     </Col>
//                                 </Row>
//                                 <Table striped bordered hover responsive>
//                                     <thead>
//                                         <tr>
//                                             <th>Sr. No</th>
//                                             <th>Banner Name</th>
//                                             <th>banner Images</th>
//                                             <th>banner Description</th>
//                                             <th>Date of Creation</th>
//                                             <th>Status</th>
//                                             <th>Actions</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {currentBanners.length > 0 ? (
//                                             currentBanners.map((banner, index) => (
//                                                 <tr key={banner._id}>
//                                                     <td>{indexOfFirstItem + index + 1}</td>
//                                                     <td>{banner.name}</td>
//                                                     <td>
//                                                         {/* {banner.image} */}
//                                                         {previewImage && (
//                                         <div className="mt-2">
//                                             <img
//                                                 src={previewImage}
//                                                 alt="Preview"
//                                                 style={{ width: "150px", height: "auto" }}
//                                             />
//                                         </div>
//                                     )}
//                                                         </td>
//                                                     <td>{banner.description}</td>
                                                    
//                                                     <td>{new Date(banner.createdAt).toLocaleString()}</td>
//                                                     <td>
//                                                         <Button
//                                                             onClick={() => handleStatus(banner._id)}
//                                                             variant={
//                                                                 banner.status === '1' ? 'success' : 'danger'
//                                                             }
//                                                         >
//                                                             {banner.status === '1' ? (
//                                                                 <MdOutlineToggleOn />
//                                                             ) : (
//                                                                 <MdOutlineToggleOff />
//                                                             )}
//                                                         </Button>
//                                                     </td>
//                                                     <td>
//                                                         <Button
//                                                             variant="primary"
//                                                             onClick={() => handleEdit(banner._id)}
//                                                         >
//                                                             <FaPenNib />
//                                                         </Button>{' '}
//                                                         <Button
//                                                             variant="danger"
//                                                             onClick={() => handleDelete(banner._id)}
//                                                         >
//                                                             <RiDeleteBin6Fill />
//                                                         </Button>
//                                                     </td>
//                                                 </tr>
//                                             ))
//                                         ) : (
//                                             <tr>
//                                                 <td colSpan="6" className="text-center">
//                                                     No Natural of material found.
//                                                 </td>
//                                             </tr>
//                                         )}
//                                     </tbody>
//                                 </Table>

//                                 {/* Pagination */}
//                                 <div className="d-flex justify-content-between align-items-center mt-3">
//                                     <div>
//                                         Showing {indexOfFirstItem + 1} to{' '}
//                                         {Math.min(indexOfLastItem, filteredBannersData.length)} of{' '}
//                                         {filteredBannersData.length} entries
//                                     </div>
//                                     <nav>
//                                         <ul className="pagination mb-0">
//                                             {[...Array(totalPages)].map((_, index) => (
//                                                 <li
//                                                     key={index}
//                                                     className={`page-item ${currentPage === index + 1 ? 'active' : ''
//                                                         }`}
//                                                 >
//                                                     <button
//                                                         className="page-link"
//                                                         onClick={() => setCurrentPage(index + 1)}
//                                                         style={{
//                                                             borderColor: '#dee2e6',
//                                                             backgroundColor:
//                                                                 currentPage === index + 1 ? '#0d6efd' : '',
//                                                             color: currentPage === index + 1 ? 'white' : '',
//                                                             borderRadius: '0.375rem',
//                                                         }}
//                                                     >
//                                                         {index + 1}
//                                                     </button>
//                                                 </li>
//                                             ))}
//                                         </ul>
//                                     </nav>
//                                 </div>
//                             </Card.Body>
//                         </Card>
//                     </Col>
//                 </Row>
//             </Container>
//         </div>
//     )
// }

// export default ListHomeBanners
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

function ListHomeBanners() {
    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const successMessage = queryParams.get('success')

    const [banners, setHomeSlider] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [deleteMessage, setDeleteMessage] = useState('')
    const [entriesPerPage, setEntriesPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)

    const fetchBannerData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/home_sliders')
            const home_slider = response.data
            setHomeSlider(home_slider)
        } catch (err) {
            console.error('Error fetching Home Slider:', err)
        }
    }

    useEffect(() => {
        fetchBannerData()
    }, [])

    const handleEdit = (id) => navigate(`/admin/home-banner/edit/${id}`)

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
                const response = await fetch(`http://localhost:5000/api/home_sliders/delete/${id}`, {
                    method: 'DELETE',
                })

                if (response.ok) {
                    Swal.fire('Deleted!', 'Home Banner Slider has been deleted.', 'success')
                    setDeleteMessage('Home Banner Slider has been deleted successfully.')
                    fetchBannerData()
                } else {
                    Swal.fire('Error!', 'Failed to delete the home sliders.', 'error')
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
                `http://localhost:5000/api/home_sliders/status/${id}`,
                { method: 'PUT' }
            )
            const data = await response.json()
            if (response.ok) {
                alert('Home Banner Slider status updated successfully.')
                fetchBannerData()
            } else {
                alert('Failed to update Home Banner Slider status: ' + data.error)
            }
        } catch (err) {
            console.error('Error updating Home Banner Slider status:', err)
        }
    }

    // Filter and paginate
    const filteredBannersData = banners.filter((banner) =>
        banner.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const indexOfLastItem = currentPage * entriesPerPage
    const indexOfFirstItem = indexOfLastItem - entriesPerPage
    const currentBanners = filteredBannersData.slice(indexOfFirstItem, indexOfLastItem)
    const totalPages = Math.ceil(filteredBannersData.length / entriesPerPage)

    return (
        <div className="page-content py-3">
            <Container fluid>
                <Row>
                    <Col xl={12}>
                        <div className="page-title-box d-flex justify-content-between align-items-center">
                            <h4 className="page-title text-start" style={{ fontSize: '20px', fontWeight: '600', color: '#14468C' }}>
                                All Home Banner Slider List
                            </h4>
                            <div className="page-title-right">
                                <Link to="/admin/Home-banner/add_new">
                                    <button className="btn btn-primary mb-2" style={{ backgroundColor: '#14468C', border: 'none' }}>
                                        <FaPlus /> Add Home Slider
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </Col>
                </Row>

                {deleteMessage && (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>Deleted!</strong> {deleteMessage}
                        <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
                    </div>
                )}
                {successMessage && (
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                        <strong>Success!</strong> {successMessage}
                        <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
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
                                            <th>Banner Name</th>
                                            <th>Banner Image</th>
                                            <th>Banner Description</th>
                                            <th>Date of Creation</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentBanners.length > 0 ? (
                                            currentBanners.map((banner, index) => (
                                                <tr key={banner._id}>
                                                    <td>{indexOfFirstItem + index + 1}</td>
                                                    <td>{banner.name}</td>
                                                    <td>
                                                        {banner.image ? (
                                                            <img
                                                                src={`http://localhost:5000/uploads/banner_sliders/${banner.image}`}
                                                                alt={banner.name}
                                                                style={{ width: '150px', height: 'auto' }}
                                                            />
                                                        ) : (
                                                            <span>No image</span>
                                                        )}
                                                    </td>
                                                    <td>{banner.description}</td>
                                                    <td>{new Date(banner.createdAt).toLocaleString()}</td>
                                                    <td>
                                                        <Button
                                                            onClick={() => handleStatus(banner._id)}
                                                            variant={banner.status === '1' ? 'success' : 'danger'}
                                                        >
                                                            {banner.status === '1' ? <MdOutlineToggleOn /> : <MdOutlineToggleOff />}
                                                        </Button>
                                                    </td>
                                                    <td>
                                                        <Button variant="primary" onClick={() => handleEdit(banner._id)}>
                                                            <FaPenNib />
                                                        </Button>{' '}
                                                        <Button variant="danger" onClick={() => handleDelete(banner._id)}>
                                                            <RiDeleteBin6Fill />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="7" className="text-center">
                                                    No banners found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>

                                {/* Pagination */}
                                <div className="d-flex justify-content-between align-items-center mt-3">
                                    <div>
                                        Showing {indexOfFirstItem + 1} to{' '}
                                        {Math.min(indexOfLastItem, filteredBannersData.length)} of{' '}
                                        {filteredBannersData.length} entries
                                    </div>
                                    <nav>
                                        <ul className="pagination mb-0">
                                            {[...Array(totalPages)].map((_, index) => (
                                                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                                    <button
                                                        className="page-link"
                                                        onClick={() => setCurrentPage(index + 1)}
                                                        style={{
                                                            borderColor: '#dee2e6',
                                                            backgroundColor: currentPage === index + 1 ? '#0d6efd' : '',
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

export default ListHomeBanners



