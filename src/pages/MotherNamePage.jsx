// src/pages/MotherNamePage.jsx
import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Button
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/wondr-logo.png';
import momImage from '../assets/Ibu-kandung.png';
import { useFormData } from '../context/formContext';
import { useNavigate } from 'react-router-dom';
import './MotherName.css'

// Utility function to sanitize input
function sanitizeInput(str) {
  return str.replace(/['";\-\/\\]/g, '').trim();
}

export default function MotherNamePage() {
  const [motherName, setMotherName] = useState('');
  const navigate = useNavigate();
  const { updateForm } = useFormData();

  const sanitized = sanitizeInput(motherName);
  const isValid = sanitized.length > 0;

  const handleSubmit = e => {
    e.preventDefault();
    if (!isValid) return;
    updateForm({ namaIbuKandung: sanitized });
    navigate('/alamat');
  };

  return (
    <div className="vh-100 d-flex flex-column bg-light">
      <header className="p-3 ps-4">
        <img
          src={logo}
          alt="Wondr Logo"
          width={130}
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }}
        />
      </header>

      <main className="flex-grow-1 d-flex align-items-center justify-content-center">
        <Container
          className="p-4 bg-white rounded-4 shadow"
          style={{ width: '90%', maxWidth: '1200px' }}
        >
          <Row className="align-items-center">
            <Col lg={6} md={8} className="mx-auto mx-lg-0">
              <h2 className="fw-bold mb-3">Siapa nama gadis ibu kandung kamu?</h2>
              <p className="text-muted mb-4">
                Isi dengan lengkap nama ibu kandung kamu tanpa gelar.
              </p>

              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="motherName">
                  <Form.Label className="fw-semibold small">
                    Nama Ibu Kandung
                  </Form.Label>
                  <div className="position-relative">
                    <Form.Control
                      type="text"
                      placeholder="Yohana"
                      value={motherName}
                      onChange={e => setMotherName(e.target.value)}
                      className="border-brand rounded-pill px-4 py-2"
                      required
                      maxLength={50}
                      aria-label="Nama ibu kandung"
                    />
                    {motherName && (
                      <button
                        type="button"
                        onClick={() => setMotherName('')}
                        className="btn-clear position-absolute top-50 end-0 translate-middle-y me-3"
                        aria-label="Hapus nama"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </Form.Group>

                <div className="text-center mt-4">
                  <Button
                    type="submit"
                    disabled={!isValid}
                    className="btn-wondr rounded-pill fw-bold px-5 py-2"
                  >
                    Lanjutkan
                  </Button>
                </div>
              </Form>
            </Col>

            <Col lg={6} className="d-none d-lg-flex justify-content-end">
              <img
                src={momImage}
                alt="Mom Character"
                className="img-fluid"
                style={{ maxHeight: '600px' }}
                loading="lazy"
              />
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}
