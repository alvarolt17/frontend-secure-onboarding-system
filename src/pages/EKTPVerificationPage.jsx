import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './EKTPVerification.css';
import logo from '../assets/wondr-logo.png';
import ktpIcon from '../assets/ktp-icon.png'; // image e-KTP
import closeIcon from '../assets/close.png';

export default function EKTPVerificationPage() {
  const [nik, setNik] = useState('');
  const [name, setName] = useState('');
  const maxNik = 16;

  const handleClear = (setter) => () => setter('');

  const isNikValid = nik.length === maxNik && /^\d+$/.test(nik);
  const isNameValid = name.trim().length > 0;

  const handleSubmit = e => {
    e.preventDefault();
    if (isNikValid && isNameValid) {
      console.log('E-KTP data:', { nik, name });
      // lanjut ke proses upload foto
    }
  };

  return (
    <div className="vh-100 d-flex flex-column bg-light font-poppins">
      <div className="p-3 ps-4"><img src={logo} alt="logo" style={{ width: '130px' }} /></div>
      <div className="flex-grow-1 d-flex align-items-center justify-content-center">
        <Container className="p-4 bg-white rounded-4 shadow">
          <Row className="align-items-start">
            <Col md={6} className="d-none d-md-flex justify-content-center align-items-start">
              <img src={ktpIcon} alt="e-KTP" className="img-fluid" style={{ maxWidth: '80%', height: '500px' }} />
            </Col>
            <Col md={6} className="d-flex flex-column justify-content-between">
              <div>
                <h2 className="mb-3 fw-bold text-dark">Verifikasi e‑KTP</h2>
                <p className="text-muted mb-4">Biar kita lebih kenal, fotoin e‑KTP kamu ya!</p>
                <Form onSubmit={handleSubmit}>
                  {/* NIK */}
                  <Form.Group controlId="nik" className="mb-3">
                    <Form.Label className="fw-semibold">NIK</Form.Label>
                    <div className="position-relative">
                      <Form.Control
                        type="text"
                        placeholder="4501021109000005"
                        value={nik}
                        onChange={(e) => e.target.value.length <= maxNik && setNik(e.target.value)}
                        maxLength={maxNik}
                        className="border-dashed rounded-pill ps-4 pe-5 py-2"
                        isInvalid={nik.length > 0 && !isNikValid}
                      />
                      <div className="text-end small text-muted mt-1">{nik.length}/{maxNik}</div>
                    </div>
                  </Form.Group>
                  {/* Name */}
                  <Form.Group controlId="name" className="mb-3">
                    <Form.Label className="fw-semibold">NAMA LENGKAP</Form.Label>
                    <div className="position-relative">
                      <Form.Control
                        type="text"
                        placeholder="Darren Wakins Jr"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border-dashed rounded-pill ps-4 pe-5 py-2"
                        isInvalid={name.length > 0 && !isNameValid}
                      />

                    </div>
                  </Form.Group>
                  {/* Tips */}
                  <div className="ps-3 mb-4">
                    <strong>Pastikan:</strong>
                    <ul className="tips-list">
                      <li>Kamu berada di tempat dengan pencahayaan yang terang</li>
                      <li>Pastikan fisik e‑KTP baik dan tidak lecet</li>
                      <li>Upload foto e‑KTP kamu dalam format .jpg / .jpeg / .png / .pdf</li>
                      <li>Pastikan Nama Lengkap kamu sesuai e‑KTP</li>
                    </ul>
                  </div>
                  {/* Buttons */}
                  <div className="d-flex flex-column align-items-center">
                    <Button type="submit" disabled={!(isNikValid && isNameValid)} variant="outline-dark" className="px-5 py-2 rounded-pill fw-bold">
                      Lanjutkan
                    </Button>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
