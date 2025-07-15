import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './NameInput.css';
import logo from '../assets/wondr-logo.png';
import badgeIcon from '../assets/Nama-badge.png'; // ganti dengan gambar yang kamu pakai
import { useNavigate } from 'react-router-dom';

function NameInputPage() {
  const [name, setName] = useState('');
  const navigate = useNavigate() ;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Nama disimpan:', name);

    navigate('/phone') ;
  };

  return (
    <div className="vh-100 d-flex flex-column bg-light">
      {/* Logo at the top-left */}
      <div className="p-3">
        <img src={logo} alt="logo wondr" style={{ width: '130px' }} />
      </div>

      {/* Main content */}
      <div className="flex-grow-1 d-flex align-items-center justify-content-center">
        <Container className="p-4 rounded-5 shadow bg-white">
          <Row className="align-items-center">
            {/* Left - Image */}
            <Col
              md={6}
              className="d-none d-md-flex justify-content-center align-items-center"
            >
              <img
                src={badgeIcon}
                alt="Badge Icon"
                className="img-fluid"
                style={{ maxWidth: '80%', height:'500px' }}
              />
            </Col>

            {/* Right - Form */}
            <Col md={6}>
              <h2 className="mb-3 fw-bold text-dark">Siapa Nama Panggilanmu</h2>
              <p className="text-muted mb-4">
                Biarkan kami bisa mengenalmu lebih dekat
              </p>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                  <Form.Label className="fw-semibold">Nama Kamu</Form.Label>
                  <div className="position-relative">
                    <Form.Control
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="rounded-pill px-4 py-2 border-info"
                      required
                    />
                    {name && (
                      <button
                        type="button"
                        onClick={() => setName('')}
                        className="btn btn-sm btn-light border position-absolute top-50 end-0 translate-middle-y me-3 rounded-circle"
                        style={{ width: '30px', height: '30px' }}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </Form.Group>

                <div className="text-center mt-4 align-items-end">
                  <Button
                    type="submit"
                    variant="info"
                    className="text-white px-5 py-2 rounded-pill fw-bold"
                  >
                    Lanjutkan
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default NameInputPage;
