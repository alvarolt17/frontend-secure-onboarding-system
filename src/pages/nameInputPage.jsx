// src/pages/NameInputPage.jsx
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './nameInput.css';
import logo from '../assets/wondr-logo.png';
import badgeIcon from '../assets/Nama-badge.png';
import { useNavigate } from 'react-router-dom';

export default function NameInputPage() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    console.log('Nama disimpan:', trimmed);
    navigate('/phone');
  };

  return (
    <div className="vh-100 d-flex flex-column bg-light">
      <header className="p-3 ps-4">
        <img src={logo} alt="Wondr Logo" width={130} loading="eager" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}/>
      </header>

      <main className="flex-grow-1 d-flex align-items-center justify-content-center">
        <Container className="p-4 rounded-5 shadow bg-white my-3">
          <Row className="align-items-center">
            <Col md={6} className="d-none d-md-flex justify-content-center">
              <img
                src={badgeIcon}
                alt="Badge Illustration"
                className="img-fluid"
                style={{ maxWidth: '80%', maxHeight: '500px' }}
                loading="lazy"
              />
            </Col>

            <Col md={6}>
              <h2 className="fw-bold text-dark">Siapa Nama Panggilanmu?</h2>
              <p className="text-muted">Biarkan kami bisa mengenalmu lebih dekat</p>

              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="nickname">
                  <Form.Label className="fw-semibold">Nama Kamu</Form.Label>
                  <div className="position-relative">
                    <Form.Control
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="rounded-pill px-4 py-2 border-bni-teal"
                      required
                      aria-label="Nama panggilan"
                      maxLength={50}
                    />
                    {name && (
                      <button
                        type="button"
                        onClick={() => setName('')}
                        className="btn-clear"
                        aria-label="Hapus nama"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </Form.Group>

                <div className="text-center mt-4">
                  <Button
                    type="submit"
                    className="btn-wondr"
                  >
                    Lanjutkan
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}
