import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './EKTPVerification.css';
import logo from '../assets/wondr-logo.png';
import ktpIcon from '../assets/KTP.png';
import closeIcon from '../assets/close.png';
import { Navigate, useNavigate } from 'react-router-dom';

export default function EKTPVerificationPage() {
  const [nik, setNik] = useState('');
  const [namaLengkap, setNamaLengkap] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [ktpData, setKtpData] = useState(null);
  const maxNik = 16;
  const navigate = useNavigate('')

  const handleClear = setter => () => setter('');

  const isNikValid = nik.length === maxNik && /^\d+$/.test(nik);
  const isNamaValid = namaLengkap.trim().length > 0;

  const handleSubmit = async e => {
    e.preventDefault();
    if (isNikValid && isNamaValid) {
      setLoading(true);
      setError('');
      setSuccess('');
      setKtpData(null);
      navigate('/tabungan')
      
      try {
        console.log('🚀 Sending request to API...');
        console.log('📝 Data:', { nik, namaLengkap });
        
        const response = await fetch(
          'https://rank-aspect-strange-navigator.trycloudflare.com/api/verification/nik',
          {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            credentials: 'include', // PENTING: untuk cookies dan CORS
            body: JSON.stringify({ 
              nik, 
              namaLengkap
            }),
          }
        );
        
        console.log('📡 Response status:', response.status);
        console.log('🔍 Response ok:', response.ok);
        
        // Parse response regardless of status
        const result = await response.json();
        console.log('📦 Response data:', result);
        
        if (response.ok) {
          // Handle successful response
          if (result.valid) {
            setSuccess('✅ NIK valid! Data KTP ditemukan dan cocok.');
            setKtpData(result.data);
            console.log('✅ KTP Data:', result.data);
            
            
            // TODO: navigate ke halaman berikutnya
            // setTimeout(() => {
            //   router.push('/next-page');
            // }, 2000);
          } else {
            setError(`❌ ${result.message || 'NIK tidak valid atau nama tidak sesuai KTP'}`);
          }
        } else {
          // Handle error response
          setError(`❌ ${result.message || result.error || 'Terjadi kesalahan pada server'}`);
        }
        
      } catch (err) {
        console.error('💥 Error verifikasi NIK:', err);
        
        // Handle different types of errors
        if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
          setError('❌ Koneksi ke server gagal. Pastikan CORS sudah dikonfigurasi dengan benar.');
        } else if (err.name === 'SyntaxError') {
          setError('❌ Response dari server tidak valid (bukan JSON).');
        } else {
          setError(`❌ ${err.message || 'Gagal verifikasi NIK, silakan coba lagi.'}`);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  // Quick fill untuk testing
  // const fillTestData = (nikValue, namaValue) => {
  //   setNik(nikValue);
  //   setNamaLengkap(namaValue);
  //   setError('');
  //   setSuccess('');
  //   setKtpData(null);
  // };

  // // Test API connection
  // const testConnection = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await fetch(
  //       'https://rank-aspect-strange-navigator.trycloudflare.com/api/verification/health',
  //       {
  //         method: 'GET',
  //         credentials: 'include'
  //       }
  //     );
      
  //     if (response.ok) {
  //       const result = await response.json();
  //       setSuccess('✅ Koneksi ke API berhasil!');
  //       console.log('API Health:', result);
  //     } else {
  //       setError('❌ API tidak merespons dengan baik');
  //     }
  //   } catch (err) {
  //     setError('❌ Gagal terhubung ke API');
  //     console.error('Connection test failed:', err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="vh-100 d-flex flex-column bg-light font-poppins">
      <div className="p-3 ps-4">
        <img src={logo} alt="logo" style={{ width: '130px' }} />
      </div>
      <div className="flex-grow-1 d-flex align-items-center justify-content-center">
        <Container className="p-4 bg-white rounded-4 shadow">
          <Row className="align-items-start">
            <Col md={6} className="d-none d-md-flex justify-content-center align-items-start">
              <img
                src={ktpIcon}
                alt="e-KTP"
                className="img-fluid"
                style={{ maxWidth: '80%', height: '500px' }}
              />
            </Col>
            <Col md={6} className="d-flex flex-column justify-content-between">
              <div>
                <h2 className="mb-3 fw-bold text-dark">Verifikasi e‑KTP</h2>
                <p className="text-muted mb-4">Biar kita lebih kenal, fotoin e‑KTP kamu ya!</p>
                
                {/* KTP Data Display */}
                {ktpData && (
                  <div className="alert alert-info mb-3">
                    <h6>📋 Data KTP yang Ditemukan:</h6>
                    <ul className="mb-0">
                      <li><strong>NIK:</strong> {ktpData.nik}</li>
                      <li><strong>Nama:</strong> {ktpData.namaLengkap}</li>
                      <li><strong>Tempat Lahir:</strong> {ktpData.tempatLahir}</li>
                      <li><strong>Jenis Kelamin:</strong> {ktpData.jenisKelamin}</li>
                      <li><strong>Agama:</strong> {ktpData.agama}</li>
                    </ul>
                  </div>
                )}
                
                <Form onSubmit={handleSubmit}>
                  {/* NIK */}
                  <Form.Group controlId="nik" className="mb-3">
  <Form.Label className="fw-semibold">NIK</Form.Label>
  <div className="position-relative">
    <Form.Control
      type="text"
      placeholder="4501021109000005"
      value={nik}
      onChange={e => e.target.value.length <= maxNik && setNik(e.target.value)}
      maxLength={maxNik}
      className="border-dashed rounded-pill ps-4 pe-5 py-2"
      isInvalid={nik.length > 0 && !isNikValid}
    />
  </div>

  {/* Wrapper untuk counter & hint text */}
  <div className="d-flex justify-content-between align-items-center mt-1">
    
    <Form.Text className="text-muted small mb-0">
      Gunakan NIK yang terdaftar di database KTP Dukcapil
    </Form.Text>
    <div className="small text-muted">
      {nik.length}/{maxNik}
    </div>
  </div>
</Form.Group>


                  {/* Nama Lengkap */}
                  <Form.Group controlId="namaLengkap" className="mb-3">
                    <Form.Label className="fw-semibold">NAMA LENGKAP</Form.Label>
                    <div className="position-relative">
                      <Form.Control
                        type="text"
                        placeholder="John Doe"
                        value={namaLengkap}
                        onChange={e => setNamaLengkap(e.target.value)}
                        className="border-dashed rounded-pill ps-4 pe-5 py-2"
                        isInvalid={namaLengkap.length > 0 && !isNamaValid}
                        disabled={loading}
                      />
                      {namaLengkap && !loading && (
                        <button
                          type="button"
                          className="btn btn-sm btn-light border position-absolute top-50 end-0 translate-middle-y me-3 rounded-circle"
                          style={{ width: '30px', height: '30px' }}
                          onClick={handleClear(setNamaLengkap)}
                        >
                          ✕
                        </button>
                      )}
                    </div>
                    <Form.Text className="text-muted">
                      Nama harus sesuai persis dengan data KTP
                    </Form.Text>
                  </Form.Group>

                  

                  {/* Tips */}
                  <div className="ps-3 mb-4">
                    <strong>Pastikan:</strong>
                    <ul className="tips-list">
                      <li>NIK yang dimasukkan terdaftar di database KTP Dukcapil</li>
                      <li>Nama lengkap sesuai persis dengan data KTP</li>
                      <li>Kamu berada di tempat dengan pencahayaan yang terang</li>
                      <li>Pastikan fisik e‑KTP baik dan tidak lecet</li>
                      <li>Upload foto e‑KTP kamu dalam format .jpg / .jpeg / .png / .pdf</li>
                    </ul>
                  </div>

                  {/* Submit Button */}
                  <div className="d-flex flex-column align-items-center">
                    <Button
                      type="submit"
                      disabled={!(isNikValid && isNamaValid) || loading}
                      variant="outline-dark"
                      className="px-5 py-2 rounded-pill fw-bold"
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Memverifikasi...
                        </>
                      ) : (
                        'Lanjutkan'
                      )}
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