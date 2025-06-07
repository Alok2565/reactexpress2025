import React, { useState, useEffect } from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import authLogo from "../../assets/images/auth_icmr_logo.png";
import PasswordGenerateForm from './PasswordGenerateForm';
import axios from 'axios';

function AllUsersPasswordGenerate() {
  const location = useLocation();

  const userRole = location.pathname.startsWith("/admin")
    ? "admin"
    : location.pathname.startsWith("/icmr")
    ? "icmr"
    : location.pathname.startsWith("/committee")
    ? "committee"
    : "guest";

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="page-content py-3">
      <Container fluid>
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
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
              </Col>

              {userRole === 'admin' && (
                <>
                  <h5 className="text-center mb-3" style={{ fontWeight: "600" }}>
                    Password generation for Super Admin
                  </h5>
                  <ul>
                    {users.map((user) => (
                      <li key={user._id}>{user.name}</li>
                    ))}
                  </ul>
                  <PasswordGenerateForm />
                </>
              )}

              {userRole === 'icmr' && (
                <>
                  <h5 className="text-center mb-3" style={{ fontWeight: "600" }}>
                    Password generation for ICMR Officers
                  </h5>
                  <PasswordGenerateForm />
                </>
              )}

              {userRole === 'committee' && (
                <>
                  <h5 className="text-center mb-3" style={{ fontWeight: "600" }}>
                    Password generation for Committee Members
                  </h5>
                  <PasswordGenerateForm />
                </>
              )}
            </Col>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AllUsersPasswordGenerate;
