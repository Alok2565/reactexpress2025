import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import authLogo from "../../assets/images/auth_icmr_logo.png";
import axios from 'axios';
import ForgotPasswordLink from './ForgotPasswordLink';

function AllForgotPasswordLink() {
  const location = useLocation();

  // Determine user role from pathname
  const userRole = location.pathname.includes('/admin')
    ? 'admin'
    : location.pathname.includes('/imp-exp')
    ? 'imp-exp'
    : location.pathname.includes('/icmr')
    ? 'icmr'
    : location.pathname.includes('/committee')
    ? 'committee'
    : 'guest';

  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch only if user is admin
    if (userRole === 'admin') {
      const fetchUserData = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/users/');
          setUsers(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    }
  }, [userRole]);

  return (
    <div className="page-content">
      <Container fluid>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <div className="codex-authbox register mt-5 mb-5">
              <div className="auth-header p-2 text-center">
                <Link to="#">
                  <img
                    src={authLogo}
                    className="img-fluid"
                    style={{ maxWidth: '400px' }}
                    alt="logo"
                  />
                </Link>
              </div>

              {/* Role-specific section */}
              {userRole === 'imp-exp' && (
                <>
                  <h5 className="text-center mb-3 fw-semibold">
                    Reset Your Password
                  </h5>
                        <p className="text-dark mb-4">Enter your email address and we'll send you an email with instructions to reset your password.</p>
                  <ul>
                    {users.map((user) => (
                      <li key={user._id}>{user.name}</li>
                    ))}
                  </ul>
                   <ForgotPasswordLink />
                </>
              )}

              {userRole === 'icmr' && (
                <>
                  <h5 className="text-center mb-3 fw-semibold">
                    Password generation for ICMR Officers
                  </h5>
                  <ForgotPasswordLink />
                </>
              )}

              {userRole === 'committee' && (
                <>
                  <h5 className="text-center mb-3 fw-semibold">
                    Password generation for Committee Members
                  </h5>
                  <ForgotPasswordLink />
                </>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AllForgotPasswordLink;
