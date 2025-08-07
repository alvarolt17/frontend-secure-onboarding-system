// src/pages/PhoneInputPage.jsx

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button, InputGroup, Alert } from 'react-bootstrap';
import './PhoneInputPage.css';
import logo from '../assets/wondr-logo.png';
import phoneIcon from '../assets/handphone.png';
import indonesiaFlag from '../assets/flag.png';
import { useNavigate } from 'react-router-dom';
import { useFormData } from '../context/formContext';
import { sendOtp } from '../firebase'; // Import sendOtp saja, setupRecaptcha sudah dihapus
import { useRegister } from '../context/RegisterContext';

// --- Input Sanitization and Validation Functions ---
function sanitizePhone(raw) {
  let digits = raw.replace(/\D/g, '');
  digits = digits.replace(/^0+/, '');
  return digits;
}

function validatePhone(digits) {
  return /^[1-9][0-9]{7,11}$/.test(digits);
}
// --- End Input Sanitization and Validation Functions ---

export default function PhoneInputPage() {
  const [phone, setPhone] = useState('');
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { updateForm } = useFormData();
  const { completeStep, checkAndRedirect } = useRegister();

  // Kita tidak lagi memerlukan ref ini karena recaptcha sekarang diinisialisasi
  // langsung di dalam fungsi sendOtp
  // const recaptchaContainerRef = React.useRef(null);

  useEffect(() => {
    if (!checkAndRedirect('/phone')) {
      return;
    }
  }, [checkAndRedirect]);

  const cleanedPhone = sanitizePhone(phone);
  const isValid = validatePhone(cleanedPhone);

  const handleChange = (e) => {
    setPhone(e.target.value);
    if (!touched) setTouched(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);
    if (!isValid) return;

    setLoading(true);
    setError(null);

    try {
      const fullPhoneNumber = `+62${cleanedPhone}`;

      // Panggil sendOtp dengan nomor telepon dan ID dari elemen reCAPTCHA
      // ID elemen ini harus ada di JSX di bawah
      await sendOtp(fullPhoneNumber, 'recaptcha-container');

      updateForm({ nomorTelepon: cleanedPhone });
      completeStep('phoneInputDone');
      navigate('/otp');
      console.log('Phone number submitted:', cleanedPhone);
    } catch (err) {
      console.error("Failed to send OTP:", err);
      if (err.code === 'auth/too-many-requests') {
        setError('Terlalu banyak percobaan. Harap coba lagi nanti.');
      } else if (err.code === 'auth/invalid-phone-number') {
        setError('Nomor telepon tidak valid.');
      } else {
        setError('Gagal mengirim OTP. Pastikan nomor benar dan coba lagi.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Hapus seluruh useEffect yang memanggil setupRecaptcha,
  // karena sekarang logika reCAPTCHA ada di firebase.js
  // useEffect(() => {
  //   if (recaptchaContainerRef.current) {
  //     setupRecaptcha(recaptchaContainerRef.current.id);
  //   }
  // }, []);

  return (
    <div className="vh-100 d-flex flex-column bg-light font-poppins">
      <header className="p-3 ps-4">
        <img src={logo} alt="Wondr Logo" width={130} loading="eager" />
      </header>

      <main className="flex-grow-1 d-flex align-items-center justify-content-center">
        <Container className="p-4 rounded-5 shadow bg-white">
          <Row className="align-items-center">
            <Col md={6} className="d-none d-md-flex justify-content-center">
              <img src={phoneIcon} alt="Phone Icon" className="img-fluid" style={{ maxWidth: '80%', maxHeight: '500px' }} loading="lazy" />
            </Col>
            <Col md={6}>
              <h2 className="mb-3 fw-bold">Isi Nomor HP Kamu</h2>
              <p className="text-muted mb-4">Jangan lupa gunakan nomor aktif ya!</p>

              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group controlId="phone">
                  <Form.Label className="fw-semibold">Nomor HP</Form.Label>
                  <InputGroup className={touched ? (isValid ? 'is-valid' : 'is-invalid') : ''}>
                    <InputGroup.Text className="px-3">
                      <img src={indonesiaFlag} alt="" width={24} height={16} />
                      <span className="ps-2">+62</span>
                    </InputGroup.Text>
                    <Form.Control
                      type="tel"
                      placeholder="81234567890"
                      value={phone}
                      onChange={handleChange}
                      aria-invalid={touched && !isValid}
                      required
                      maxLength={15}
                    />
                  </InputGroup>
                  {touched && !isValid && (
                    <Form.Control.Feedback type="invalid" className="d-block mt-1">
                      Masukkan 8–12 digit nomor aktif (tanpa 0 pertama).
                    </Form.Control.Feedback>
                  )}
                  {error && (
                    <Alert variant="danger" className="mt-3">
                      {error}
                    </Alert>
                  )}
                </Form.Group>

                <div className="text-center mt-4">
                  <Button
                    type="submit"
                    className="btn-wondr px-5 py-2 rounded-pill fw-bold"
                    disabled={!isValid || loading}
                  >
                    {loading ? 'Mengirim...' : 'Lanjutkan'}
                  </Button>
                </div>
              </Form>
              {/* Elemen div untuk reCAPTCHA */}
              {/* Ref dihapus karena sudah tidak digunakan */}
              <div id="recaptcha-container"></div>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}