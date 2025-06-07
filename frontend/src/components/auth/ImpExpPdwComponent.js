import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import {Link, useLocation } from 'react-router-dom';
import authLogo from "../../assets/images/auth_icmr_logo.png";
import ImpExpPasswordGeneration from './ImpExpPasswordGeneration';

function ImpExpPdwComponent() {
  const location = useLocation();
    const userRole = location.pathname.startsWith("/imp-exp")
    ? "imp-exp"
    : "guest";

    // const [imp_exp_users, setImpExpUsers] = useState([]);
        
    //       const fetchUserData = async () => {
    //         try {
    //           const response = await axios.get('http://localhost:5000/api/importers-exporters/');
    //           setImpExpUsers(response.data);
    //         } catch (error) {
    //           console.error('Error fetching user data:', error);
    //         }
    //       };
        
    //       useEffect(() => {
    //         fetchUserData();
    //       }, []);
  return (
    <>
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
                {userRole == "imp-exp" && (
                    <>
                    <ImpExpPasswordGeneration/>
                    </>
                )}
              </Col>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
export default ImpExpPdwComponent
