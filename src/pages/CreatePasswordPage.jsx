import React from 'react';
import PasswordForm from '../components/PasswordForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/wondr-logo.png';
import './CreatePassword.css';
import { Container, Row, Col } from 'react-bootstrap';
import passIcon from '../assets/Password.png';

function CreatePasswordPage() {
  return (
    <div className="vh-100 d-flex flex-column bg-light">
      {/* Logo at the top-left */}
      <div className="p-3">
        <img src={logo} alt="logo wondr" style={{ width: '130px' }} />
      </div>

      {/* Centered main content */}
      <div className="flex-grow-1 d-flex align-items-center justify-content-center">
        <Container className="p-4 rounded-4 shadow bg-white">
          <Row className="align-items-center">
            {/* Text and form */}
            <Col md={6}>
              <h2 className="mb-3 fw-bold text-primary">Buat Password Kamu</h2>
              <p className="text-muted mb-4">
                Pastikan password yang kamu buat sesuai dengan petunjuk ya!
              </p>
              <PasswordForm />
            </Col>

            {/* Icon on the right */}
            <Col
              md={6}
              className="d-none d-md-flex justify-content-center align-items-center"
            >
              <img
                src={passIcon}
                alt="Icon Password"
                className="img-fluid"
                style={{ maxWidth: '80%' }}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default CreatePasswordPage;
