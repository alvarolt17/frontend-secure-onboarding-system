import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/wondr-logo.png';
import momImage from '../assets/Ibu-kandung.png';
import { useFormData } from '../context/formContext';
import { useNavigate } from 'react-router-dom';

export default function MotherNamePage() {
  const [motherName, setMotherName] = useState('');
  const { updateForm } = useFormData();    // ✔️
  const navigate = useNavigate();          // ✔️

  const handleSubmit = e => {
    e.preventDefault();
    updateForm({ namaIbuKandung: motherName });
    console.log('Nama Ibu Kandung disimpan:', motherName);
    navigate('/alamat');                  // ➡️ navigasi ke halaman selanjutnya
  };

  return (
    <div className="vh-100 d-flex flex-column bg-light">
      <div className="p-3 ps-4">
        <img src={logo} alt="Wondr Logo" style={{ width: '130px' }} />
      </div>
      <div className="flex-grow-1 d-flex align-items-center justify-content-center">
        <Container className="p-4 bg-white rounded-4 shadow" style={{ width: '90%', maxWidth: '1200px' }}>
          <Row className="align-items-center">
            <Col lg={6} md={8} className="mx-auto mx-lg-0">
              <h2 className="fw-bold mb-3">Siapa nama gadis ibu kandung kamu?</h2>
              <p className="text-muted mb-4">
                Isi dengan lengkap nama ibu kandung kamu tanpa gelar.
              </p>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="motherName">
                  <Form.Label className="fw-semibold small">Nama Ibu Kandung</Form.Label>
                  <div className="position-relative">
                    <Form.Control
                      type="text"
                      placeholder="Yohana"
                      value={motherName}
                      onChange={e => setMotherName(e.target.value)}
                      className="border-info border-2 rounded-pill px-4 py-2"
                      required
                    />
                    {motherName && (
                      <button
                        type="button"
                        onClick={() => setMotherName('')}
                        className="btn btn-light position-absolute top-50 end-0 translate-middle-y me-3 rounded-circle"
                        style={{ width: '28px', height: '28px', fontSize: '16px', lineHeight: '1' }}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </Form.Group>
                <div className="text-center mt-4">
                  <Button
                    type="submit"
                    className="rounded-pill fw-bold px-5 py-2"
                    style={{ backgroundColor: '#2ce3dc', border: 'none', color: 'black' }}
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
              />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
