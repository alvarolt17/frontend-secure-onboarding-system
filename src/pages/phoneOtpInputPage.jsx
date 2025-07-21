import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './phoneOtpInputPage.css';
import logo from '../assets/wondr-logo.png';
import phoneIcon from '../assets/otp.png';
import { useNavigate } from 'react-router-dom';
import { useFormData } from '../context/formContext';
import OtpInput from 'react-otp-input';

export default function PhoneOtpInputPage() {
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(120); // 1. State untuk countdown
  const navigate = useNavigate();
  const { data, updateForm } = useFormData();

  const isOtpValid = otp.length === 6;

  // 2. useEffect untuk menjalankan timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);
  
  // 3. Fungsi untuk handle kirim ulang
  const handleResendOtp = () => {
    console.log("Mengirim ulang OTP...");
    // Di sini tempat untuk memanggil API pengiriman OTP
    setCountdown(60); // Reset timer
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isOtpValid) return;
    updateForm({ otp: otp });
    navigate('/email');
  };

  return (
    <div className="vh-100 d-flex flex-column bg-light font-poppins">
      <header className="p-3 ps-4">
        <img src={logo} alt="Wondr Logo" width={130} loading="eager" />
      </header>

      <main className="flex-grow-1 d-flex align-items-center justify-content-center">
        <Container className="p-4 rounded-5 shadow bg-white">
          <Row className="align-items-center">
            <Col md={6} className="d-none d-md-flex justify-content-center">
              <img src={phoneIcon} alt="OTP Icon" className="img-fluid" style={{ maxWidth: '80%', maxHeight: '500px' }} loading="lazy" />
            </Col>
            <Col md={6}>
              <h2 className="mb-3 fw-bold">Cek Notifikasi Kamu!</h2>
              <p className="text-muted mb-4">Masukkan 6 digit angka yang dikirim ke nomor kamu.</p>

              <Form noValidate onSubmit={handleSubmit}>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderSeparator={<span className="px-1">-</span>}
                  renderInput={(props) => <input {...props} />}
                  containerStyle={{ justifyContent: 'center', gap: '8px', paddingBlock: '30px' }}
                  inputStyle={{
                    width: '40px',
                    height: '40px',
                    fontSize: '1.2rem',
                    textAlign: 'center',
                    borderRadius: '5px',
                    border: '1px solid #ccc'
                  }}
                />
                
                {/* 4. Tampilkan countdown atau tombol kirim ulang */}
                <div className="text-center mt-3">
                  {countdown > 0 ? (
                    <p className="text-muted small">
                      Kirim ulang kode dalam {countdown} detik
                    </p>
                  ) : (
                    <Button variant="link" size="sm" onClick={handleResendOtp}>
                      Kirim ulang OTP
                    </Button>
                  )}
                </div>

                <div className="text-center mt-4">
                  <Button
                    type="submit"
                    className="btn-wondr px-5 py-2 rounded-pill fw-bold"
                    disabled={!isOtpValid}
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