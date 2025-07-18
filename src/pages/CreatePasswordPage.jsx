import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import logo from '../assets/wondr-logo.png';
import passIcon from '../assets/Password.png';
import PasswordForm from '../components/PasswordForm';
import './CreatePassword.css';
import { useNavigate } from 'react-router-dom';


export default function CreatePasswordPage() {
  const navigate = useNavigate();
  return (
    <div className="vh-100 d-flex flex-column bg-light">
      <header className="p-3 ps-4">
        <img src={logo} alt="Wondr logo" width={130} loading="eager" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}/>
      </header>
      <main className="flex-grow-1 d-flex align-items-center justify-content-center">
        <Container className="p-4 rounded-4 shadow bg-white">
          <Row className="align-items-center">
            <Col md={6}>
              <h2 className="mb-3 fw-bold text-primary">Buat Password Kamu</h2>
              <p className="text-muted mb-4">
                Pastikan password yang kamu buat sesuai dengan petunjuk!
              </p>
              <PasswordForm />
            </Col>
            <Col md={6} className="d-none d-md-flex justify-content-center align-items-center">
              <img src={passIcon} alt="Password icon" className="img-fluid" style={{ maxWidth: '80%' }} loading="lazy" />
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}
