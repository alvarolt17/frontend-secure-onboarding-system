import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './EmailInput.css';
import logo from '../assets/wondr-logo.png';
import emailIcon from '../assets/email.png';
import closeIcon from '../assets/close.png';
import { useNavigate } from 'react-router-dom';
import { useFormData } from '../context/formContext';

export default function EmailInputPage() {
  const [email, setEmail] = useState('');
  const maxLen = 50;
  const navigate = useNavigate();
  const { data, updateForm } = useFormData();

  useEffect(() => {
    console.log('🔍 Context formData now:', data);
  }, [data]);

  const handleClear = () => setEmail('');

  const trimmed = email.trim();
  const isValid = trimmed.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);

  const handleSubmit = e => {
    e.preventDefault();
    if (!isValid) return;
    updateForm({ email: trimmed });
    console.log('✅ Email saved to context:', trimmed);
    navigate('/password');
  };

  return (
    <div className="vh-100 d-flex flex-column bg-light font-poppins">
      <header className="p-3 ps-4">
        <img src={logo} alt="Wondr logo" width={130} loading="eager" style={{ cursor: 'pointer' }} onClick={() => navigate('/')} />
      </header>

      <main className="flex-grow-1 d-flex align-items-center justify-content-center">
        <Container className="p-4 rounded-5 shadow bg-white">
          <Row className="align-items-center">
            <Col md={6} className="d-none d-md-flex justify-content-center">
              <img
                src={emailIcon}
                alt="Email icon"
                className="img-fluid"
                style={{ maxWidth: '80%', maxHeight: '500px' }}
                loading="lazy"
              />
            </Col>

            <Col md={6}>
              <h2 className="mb-3 fw-bold text-dark">Isi alamat email kamu</h2>
              <p className="text-muted mb-4" style={{ fontSize: '0.9rem' }}>
                Email akan dipakai untuk verifikasi dan notifikasi penting.
              </p>

              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group controlId="email">
                  <Form.Label className="fw-semibold">Alamat email</Form.Label>
                  <div className="position-relative mb-1">
                    <Form.Control
                      type="email"
                      placeholder="contoh: you@mail.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      maxLength={maxLen}
                      className="border-dashed rounded-pill ps-4 pe-5 py-2"
                      isInvalid={trimmed.length > 0 && !isValid}
                      required
                    />
        
                  </div>

                  <div className="text-end small text-muted mb-3">
                    {trimmed.length}/{maxLen}
                  </div>

                  {/* Tips */}
                  <div className="ps-3 tips-wrapper">
                    <strong>Pastikan:</strong>
                    <ul className="tips-list">
                      <li>Email sudah benar dan aktif</li>
                      <li>Setelah ini kamu akan mendapatkan link verifikasi</li>
                      <li>Email dapat menerima pesan masuk</li>
                    </ul>
                  </div>

                  {/* Validation message below input */}
                  {trimmed && !isValid && (
                    <Form.Text className="text-danger">
                      Format email tidak valid
                    </Form.Text>
                  )}
                </Form.Group>

                <div className="d-flex justify-content-center mt-4">
                  <Button
                    type="submit"
                    variant="info"
                    disabled={!isValid}
                    className="text-white px-5 py-2 rounded-pill fw-bold btn-wondr"
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
