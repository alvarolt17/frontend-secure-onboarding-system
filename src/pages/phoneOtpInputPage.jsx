import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'; // Merged: Alert added here
import './phoneOtpInputPage.css';
import logo from '../assets/wondr-logo.png';
import phoneIcon from '../assets/otp.png';
import { useNavigate } from 'react-router-dom';
import { useFormData } from '../context/formContext';
import OtpInput from 'react-otp-input';
import { verifyOtp, sendOtp } from '../firebase'; // Merged: Import Firebase functions

export default function PhoneOtpInputPage() {
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(120);
  const [loading, setLoading] = useState(false); // Merged: State for loading
  const [error, setError] = useState(null); // Merged: State for error
  const [resendStatus, setResendStatus] = useState(null); // Merged: 'success' or 'error' for resend status
  const navigate = useNavigate();
  const { data, updateForm } = useFormData();

  const isOtpValid = otp.length === 6;

  // useEffect to manage the countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  const handleResendOtp = async () => {
    setLoading(true);
    setError(null);
    setResendStatus(null); // Clear previous resend status
    console.log("Mengirim ulang OTP...");
    try {
      // Ensure phone number is retrieved from context
      const phoneNumberFromContext = data.nomorTelepon;
      if (!phoneNumberFromContext) {
        throw new Error("Nomor telepon tidak ditemukan. Harap kembali ke halaman sebelumnya.");
      }
      const fullPhoneNumber = `+62${phoneNumberFromContext}`;
      await sendOtp(fullPhoneNumber); // Call sendOtp function again
      setCountdown(60); // Reset timer to 60 seconds after resending
      setResendStatus('success');
      console.log("OTP berhasil dikirim ulang!");
    } catch (err) {
      console.error("Gagal mengirim ulang OTP:", err);
      if (err.code === 'auth/too-many-requests') {
        setError('Terlalu banyak permintaan pengiriman ulang. Harap tunggu sebentar.');
      } else {
        setError('Gagal mengirim ulang OTP. Silakan coba lagi.');
      }
      setResendStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isOtpValid) return;

    setLoading(true);
    setError(null); // Clear previous errors

    try {
      await verifyOtp(otp); // Call verifyOtp function
      updateForm({ otp: otp });
      navigate('/email'); // Navigate to the next page after successful verification
      console.log('OTP submitted and verified:', otp);
    } catch (err) {
      console.error("Failed to verify OTP:", err);
      if (err.code === 'auth/invalid-verification-code') {
        setError('Kode OTP salah atau telah kedaluwarsa. Silakan coba lagi.');
      } else if (err.code === 'auth/code-expired') {
        setError('Kode OTP telah kedaluwarsa. Silakan kirim ulang.');
      }
      else {
        setError('Gagal memverifikasi OTP. Silakan coba lagi.');
      }
    } finally {
      setLoading(false);
    }
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

                {/* Merged: Display error messages */}
                {error && (
                  <Alert variant="danger" className="mt-3">
                    {error}
                  </Alert>
                )}
                {/* Merged: Display resend status messages */}
                {resendStatus === 'success' && (
                  <Alert variant="success" className="mt-3">
                    OTP berhasil dikirim ulang!
                  </Alert>
                )}
                {resendStatus === 'error' && (
                  <Alert variant="danger" className="mt-3">
                    Gagal mengirim ulang OTP.
                  </Alert>
                )}

                <div className="text-center mt-3">
                  {countdown > 0 ? (
                    <p className="text-muted small">
                      Kirim ulang kode dalam {countdown} detik
                    </p>
                  ) : (
                    <Button
                      variant="link"
                      size="sm"
                      onClick={handleResendOtp}
                      disabled={loading} // Merged: Disable resend button when loading
                    >
                      {loading ? 'Mengirim...' : 'Kirim ulang OTP'} {/* Merged: Loading text for resend button */}
                    </Button>
                  )}
                </div>

                <div className="text-center mt-4">
                  <Button
                    type="submit"
                    className="btn-wondr px-5 py-2 rounded-pill fw-bold"
                    disabled={!isOtpValid || loading} // Merged: Disable submit button when loading
                  >
                    {loading ? 'Memverifikasi...' : 'Lanjutkan'} {/* Merged: Loading text for submit button */}
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