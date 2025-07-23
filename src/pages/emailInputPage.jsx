import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './EmailInput.css';
import logo from '../assets/wondr-logo.png';
import emailIcon from '../assets/email.png';
import { useNavigate } from 'react-router-dom';
import { useFormData } from '../context/formContext';
import { useRegister } from '../context/RegisterContext'; // Import useRegister
import validator from 'validator';

// ✂️ Sanitasi input email
function sanitizeEmail(input) {
  const trimmed = input.trim();
  const normalized = validator.normalizeEmail(trimmed, { gmail_remove_dots: false }) || trimmed;
  return normalized.toLowerCase();
}

// ✅ Validasi email format
function validateEmail(email) {
  return validator.isEmail(email);
}

export default function EmailInputPage() {
  const [email, setEmail] = useState('');
  const maxLen = 50;
  const [touched, setTouched] = useState(false);
  const navigate = useNavigate();
  const { data, updateForm } = useFormData();
  const { completeStep, checkAndRedirect } = useRegister(); // Ambil dari context

  // Efek untuk memeriksa akses
  useEffect(() => {
    if (!checkAndRedirect('/email')) {
      return;
    }
  }, [checkAndRedirect]);

  useEffect(() => {
    console.log('🔍 Context formData now:', data);
  }, [data]);

  const raw = email;
  const sanitized = sanitizeEmail(raw);
  const isValid = sanitized.length > 0 && sanitized.length <= maxLen && validateEmail(sanitized);

  const handleChange = e => {
    setEmail(e.target.value);
    if (!touched) setTouched(true);
  };

  const handleClear = () => {
    setEmail('');
    setTouched(false);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setTouched(true);
    if (!isValid) return;

    updateForm({ email: sanitized });
    console.log('✅ Email tersanitasi dan valid:', sanitized);
    completeStep('emailInputDone'); // Tandai emailInputDone selesai
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
                      onChange={handleChange}
                      maxLength={maxLen}
                      className="border-dashed rounded-pill ps-4 pe-5 py-2"
                      isInvalid={touched && !isValid}
                      required
                    />
                    {email && (
                      <button type="button" onClick={handleClear} className="btn-clear" aria-label="Hapus email">×</button>
                    )}
                  </div>

                  <div className="text-end small text-muted mb-3">
                    {sanitized.length}/{maxLen}
                  </div>

                  {touched && !isValid && (
                    <Form.Text className="text-danger">
                      Format email tidak valid
                    </Form.Text>
                  )}

                  <div className="ps-3 tips-wrapper">
                    <strong>Pastikan:</strong>
                    <ul className="tips-list">
                      <li>Email sudah benar dan aktif</li>
                      <li>Setelah ini kamu akan mendapatkan link verifikasi</li>
                      <li>Email dapat menerima pesan masuk</li>
                    </ul>
                  </div>
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