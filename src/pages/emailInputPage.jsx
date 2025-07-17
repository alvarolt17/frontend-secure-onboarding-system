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
  const { data, updateForm } = useFormData(); // Ambil context

  useEffect(() => {
    console.log('🔍 Context formData sekarang:', data);
  }, [data]);

  const handleSubmit = e => {
    e.preventDefault();
    if (!isValid) return;
    updateForm({ email });  // Simpan ke context
    console.log('✅ Email disimpan di context:', email);
    navigate('/password');
  };

  const handleClear = () => setEmail('');

  const isValid = email.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <div className="vh-100 d-flex flex-column bg-light font-poppins">
      <div className="p-3 ps-4">
        <img src={logo} alt="logo wondr" style={{ width: '130px' }} />
      </div>

      <div className="flex-grow-1 d-flex align-items-center justify-content-center">
        <Container className="p-4 rounded-5 shadow bg-white">
          <Row className="align-items-center">
            <Col md={6} className="d-none d-md-flex justify-content-center align-items-start">
              <img src={emailIcon} alt="Email Icon" className="img-fluid" style={{ maxWidth: '80%', maxHeight: '500px' }} />
            </Col>

            <Col md={6} className="d-flex flex-column justify-content-between">
              <div>
                <h2 className="mb-3 fw-bold text-dark">Isi alamat email kamu</h2>
                <p className="text-muted mb-4" style={{ fontSize: '0.9rem' }}>
                  Email akan dipakai untuk verifikasi akun Wondr Desktop kamu dan notifikasi penting.
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
                        isInvalid={email && !isValid}
                        required
                      />
                      {email && (
                        <img
                          src={closeIcon}
                          alt="Clear"
                          className="btn-clear position-absolute top-50 end-0 translate-middle-y me-3"
                          onClick={handleClear}
                          style={{ cursor: 'pointer', width: '20px', height: '20px' }}
                        />
                      )}
                    </div>
                    <div className="text-end small text-muted mb-3">
                      {email.length}/{maxLen}
                    </div>

                    <div className="ps-3">
                      <strong>Pastikan:</strong>
                      <ul className="tips-list">
                        <li>Email yang kamu masukkan sesuai dan aktif</li>
                        <li>Setelah ini kamu akan mendapatkan link verifikasi</li>
                        <li>Pastikan email kamu dapat menerima pesan</li>
                      </ul>
                    </div>
                  </Form.Group>

                  <div className="d-flex justify-content-center mt-4">
                    <Button
                      type="submit"
                      variant="info"
                      disabled={!isValid}
                      className="text-white px-5 py-2 rounded-pill fw-bold"
                    >
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
