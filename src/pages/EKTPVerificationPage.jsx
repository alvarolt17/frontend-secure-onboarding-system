import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './EKTPVerification.css';
import logo from '../assets/wondr-logo.png';
import ktpIcon from '../assets/KTP.png';
import { useNavigate } from 'react-router-dom';
import { useFormData } from '../context/formContext';

// Sanitasi NIK: hanya digit, ambil max 16
function sanitizeNik(input) {
  return input.replace(/\D/g, '').slice(0, 16);
}

// Sanitasi nama lengkap: trim & buang karakter kontrol, hanya huruf, spasi, dash
function sanitizeNama(input) {
  return input
    .trim()
    .replace(/[\x00-\x1F\x7F]/g, '')
    .replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s'-]/g, '');
}

// Sanitasi tanggal lahir: pastikan format YYYY-MM-DD
function sanitizeTanggal(input) {
  return input.match(/^\d{4}-\d{2}-\d{2}$/) ? input : '';
}

export default function EKTPVerificationPage() {
  const [nik, setNik] = useState('');
  const [namaLengkap, setNamaLengkap] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { updateForm } = useFormData();

  const isNikValid = nik.length === 16;
  const isNamaValid = namaLengkap.trim().length > 0;
  const isTanggalValid = !!tanggalLahir;

  const handleNikChange = e => {
    setNik(sanitizeNik(e.target.value));
  };

  const handleNamaChange = e => {
    setNamaLengkap(sanitizeNama(e.target.value));
  };

  const handleTanggalChange = e => {
    setTanggalLahir(sanitizeTanggal(e.target.value));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!(isNikValid && isNamaValid && isTanggalValid)) return;

    updateForm({
      nik,
      namaLengkap,
      tanggalLahir,
    });
    setLoading(true);

    try {
      const resp = await fetch('https://.../verify-nik', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nik, namaLengkap, tanggalLahir }),
      });
      const data = await resp.json();
      if (resp.ok && data.valid) {
        navigate('/tabungan');
      } else {
        alert(data.message || 'Verifikasi Gagal.');
      }
    } catch {
      alert('Kesalahan jaringan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="vh-100 d-flex flex-column bg-light font-poppins">
      <header className="p-3 ps-4">
        <img src={logo} alt="Wondr Logo" width={130} onClick={() => navigate('/')} loading="eager" style={{cursor: 'pointer'}} />
      </header>
      <main className="flex-grow-1 d-flex align-items-center justify-content-center">
        <Container className="p-4 true-bg rounded-4 shadow">
          <Row className="align-items-start">
            <Col md={6} className="d-none d-md-flex justify-content-center">
              <img src={ktpIcon} alt="e-KTP" className="img-fluid" style={{maxWidth: '80%', maxHeight: '500px'}} loading="lazy" />
            </Col>
            <Col md={6}>
              <h2 className="fw-bold text-brand-teal mb-2">Verifikasi e‑KTP</h2>
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group controlId="nik" className="mb-3">
                  <Form.Label>NIK</Form.Label>
                  <Form.Control type="text" value={nik} onChange={handleNikChange}
                    placeholder="3175031234567890"
                    isInvalid={nik.length > 0 && !isNikValid}
                    className="border-brand rounded-pill ps-4" />
                  <div className="d-flex justify-content-between mt-1">
                    <Form.Text className="text-muted">
                      {isNikValid ? '✅ Format NIK valid' : `Masukkan ${16} digit angka`}
                    </Form.Text>
                    <small className="text-muted">{nik.length}/16</small>
                  </div>
                </Form.Group>
                <Form.Group controlId="namaLengkap" className="mb-3">
                  <Form.Label>Nama Lengkap</Form.Label>
                  <Form.Control type="text" value={namaLengkap} onChange={handleNamaChange}
                    placeholder="John Doe"
                    isInvalid={namaLengkap.length > 0 && !isNamaValid}
                    className="border-brand rounded-pill ps-4" />
                </Form.Group>
                <Form.Group controlId="tanggalLahir" className="mb-4">
                  <Form.Label>Tanggal Lahir</Form.Label>
                  <Form.Control type="date" value={tanggalLahir} onChange={handleTanggalChange}
                    max={new Date().toISOString().split('T')[0]}
                    isInvalid={tanggalLahir && !isTanggalValid}
                    className="border-brand rounded-pill ps-4" />
                </Form.Group>
                <div className="text-center">
                  <Button type="submit" disabled={loading || !(isNikValid && isNamaValid && isTanggalValid)}
                    className="btn-wondr px-5 py-2 rounded-pill fw-bold">
                    {loading ? 'Memverifikasi...' : 'Verifikasi e‑KTP'}
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
