import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button, InputGroup, Alert } from 'react-bootstrap';
import './PhoneInputPage.css';
import logo from '../assets/wondr-logo.png';
import phoneIcon from '../assets/handphone.png';
import indonesiaFlag from '../assets/flag.png';
import { useNavigate } from 'react-router-dom';
import { useFormData } from '../context/formContext';
// import { setupRecaptcha, sendOtp } from '../firebase';
import { sendOtp } from '../firebase';
import { useRegister } from '../context/RegisterContext'; // Import useRegister

// --- Input Sanitization and Validation Functions ---
// 🔍 Sanitasi: hapus semua karakter non-digit, dan optional leading zeroes
function sanitizePhone(raw) {
  // Ambil hanya digit
  let digits = raw.replace(/\D/g, '');
  // Hilangkan leading zeros (jika ada)
  digits = digits.replace(/^0+/, '');
  return digits;
}

// ✅ Validasi: sesuai format Indonesia (8–12 digit setelah +62)
function validatePhone(digits) {
  // Adjusted regex to match the previous OTP implementation's validation range
  // It now allows 8 to 12 digits after +62, starting with 1-9 (no leading zero)
  return /^[1-9][0-9]{7,11}$/.test(digits);
}
// --- End Input Sanitization and Validation Functions ---

export default function PhoneInputPage() {
  const [phone, setPhone] = useState('');
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { updateForm } = useFormData(); // Tidak perlu 'data' di sini, hanya 'updateForm'
  const { completeStep, checkAndRedirect } = useRegister(); // Ambil dari context

  // Reference for reCAPTCHA container
  const recaptchaContainerRef = React.useRef(null);

  // Efek untuk memeriksa akses
  useEffect(() => {
    if (!checkAndRedirect('/phone')) {
      return;
    }
  }, [checkAndRedirect]);

  // Apply sanitization to the phone input before validation
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
    setError(null); // Clear previous errors

    try {
      // Format nomor telepon ke format internasional E.164 (+62xxxxxxxxxx)
      // Use the cleanedPhone for sending OTP as it's already sanitized and validated
      const fullPhoneNumber = `+62${cleanedPhone}`;
      await sendOtp(fullPhoneNumber);
      updateForm({ nomorTelepon: cleanedPhone }); // Simpan nomor telepon yang sudah bersih ke context
      completeStep('phoneInputDone'); // Tandai phoneInputDone selesai
      navigate('/otp'); // Navigasi ke halaman OTP setelah OTP terkirim
      console.log('Phone number submitted:', cleanedPhone);
      // console.log('Context data:', data); // data tidak dibutuhkan di sini
    } catch (err) {
      console.error("Failed to send OTP:", err);
      // Handle spesifik error Firebase
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

  useEffect(() => {
    // Inisialisasi reCAPTCHA saat komponen dimuat
    // Gunakan elemen div yang akan kita buat di render()
    if (recaptchaContainerRef.current) {
      setupRecaptcha(recaptchaContainerRef.current.id);
    }
  }, []); // Hanya jalankan sekali saat mount

  // useEffect(() => { // Tidak perlu log data context di sini jika tidak digunakan
  //   console.log('Context data:', data);
  // }, [data]);

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
                  {error && ( // Tampilkan error jika ada
                    <Alert variant="danger" className="mt-3">
                      {error}
                    </Alert>
                  )}
                </Form.Group>

                <div className="text-center mt-4">
                  <Button
                    type="submit"
                    className="btn-wondr px-5 py-2 rounded-pill fw-bold"
                    disabled={!isValid || loading} // Disable tombol saat loading
                  >
                    {loading ? 'Mengirim...' : 'Lanjutkan'}
                  </Button>
                </div>
              </Form>
              {/* Ini adalah elemen div tempat reCAPTCHA invisible akan dirender */}
              <div id="recaptcha-container" ref={recaptchaContainerRef}></div>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}