// src/pages/EKTPVerificationPage.jsx

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './EKTPVerification.css';
import logo from '../assets/wondr-logo.png';
import ktpIcon from '../assets/KTP.png';
import { useNavigate } from 'react-router-dom';
import { useFormData } from '../context/formContext'; // import context

// Fungsi sanitasi NIK: hanya digit, ambil max 16
function sanitizeNik(input) {
  return input.replace(/\D/g, '').slice(0, 16);
}

// Fungsi sanitasi nama lengkap: trim, buang karakter kontrol, hanya huruf, spasi, dash, apostrof
function sanitizeNama(input) {
  return input
    .trim()
    .replace(/[\x00-\x1F\x7F]/g, '') // Hapus karakter kontrol
    .replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s'-]/g, ''); // Hanya izinkan huruf, spasi, dash, apostrof
}

// Fungsi sanitasi tanggal lahir: pastikan format YYYY-MM-DD
function sanitizeTanggal(input) {
  // Memastikan input sesuai format tanggal ISO (YYYY-MM-DD)
  // dan tidak mengizinkan tanggal di masa depan
  const today = new Date().toISOString().split('T')[0];
  if (input.match(/^\d{4}-\d{2}-\d{2}$/) && input <= today) {
    return input;
  }
  return '';
}

export default function EKTPVerificationPage() {
  const [nik, setNik] = useState('');
  const [namaLengkap, setNamaLengkap] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState('');
  const [loading, setLoading] = useState(false);
  const maxNik = 16;
  const navigate = useNavigate();
  const { updateForm } = useFormData(); // ambil updateForm

  // Validasi tetap dipertahankan terpisah dari sanitasi
  const isNikValid = nik.length === maxNik && /^\d+$/.test(nik);
  const isNamaValid = namaLengkap.trim().length > 0;
  const isTanggalValid = tanggalLahir !== '';

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
    if (!(isNikValid && isNamaValid && isTanggalValid)) {
      alert('Semua field harus valid.');
      return;
    }

    // simpan ke context
    updateForm({ nik, namaLengkap, tanggalLahir });
    
    setLoading(true);
    try {
      const resp = await fetch(
        // 'https://christina-carlos-logical-cart.trycloudflare.com/api/dukcapil/verify-nik',
        'https://hepatitis-label-ccd-similarly.trycloudflare.com/api/dukcapil/verify-nik',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          // Pastikan data yang dikirim adalah hasil dari state yang sudah disanitasi
          body: JSON.stringify({ nik, namaLengkap, tanggalLahir }),
        }
      );
      const data = await resp.json();
      console.log('Dukcapil response:', data);
      if (resp.ok && data.valid) {
        alert('Verifikasi berhasil!');
        navigate('/tabungan');
      } else {
        alert('❌ ' + (data.message || 'Verifikasi gagal.'));
      }
    } catch (err) {
      console.error(err);
      alert('Error koneksi atau sistem. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="vh-100 d-flex flex-column bg-light">
      <div className="p-3 ps-4">
        <img src={logo} alt="logo" style={{ width: '130px' }} />
      </div>
      <div className="flex-grow-1 d-flex align-items-center justify-content-center">
        <Container className="p-4 bg-white rounded-4 shadow">
          <Row className="align-items-start">
            <Col md={6} className="d-none d-md-flex justify-content-center">
              <img src={ktpIcon} alt="e-KTP" className="img-fluid" style={{ maxWidth: '80%', height: '500px' }} />
            </Col>
            <Col md={6} className="d-flex flex-column justify-content-between">
              <div>
                <h2 className="fw-bold">Verifikasi e‑KTP</h2>
                <p className="text-muted">Masukkan sesuai e‑KTP untuk verifikasi database Dukcapil</p>

                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="nik" className="mb-3">
                    <Form.Label>NIK</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="3175031234567890"
                      value={nik}
                      onChange={handleNikChange} // Gunakan handleNikChange yang sudah disanitasi
                      maxLength={maxNik}
                      className="border-dashed rounded-pill ps-4"
                      isInvalid={nik && !isNikValid}
                    />
                    <div className="d-flex justify-content-between mt-1">
                      <Form.Text className="text-muted">
                        {isNikValid ? '✅ Format NIK valid' : 'Masukkan 16 digit angka'}
                      </Form.Text>
                      <div className="text-muted small">{nik.length}/{maxNik}</div>
                    </div>
                  </Form.Group>

                  <Form.Group controlId="namaLengkap" className="mb-3">
                    <Form.Label>Nama Lengkap</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="John Doe"
                      value={namaLengkap}
                      onChange={handleNamaChange} // Gunakan handleNamaChange yang sudah disanitasi
                      className="border-dashed rounded-pill ps-4"
                      isInvalid={namaLengkap && !isNamaValid}
                    />
                    <Form.Text className="text-muted">Harus sesuai e‑KTP</Form.Text>
                  </Form.Group>

                  <Form.Group controlId="tanggalLahir" className="mb-4">
                    <Form.Label>Tanggal Lahir</Form.Label>
                    <Form.Control
                      type="date"
                      value={tanggalLahir}
                      onChange={handleTanggalChange} // Gunakan handleTanggalChange yang sudah disanitasi
                      max={new Date().toISOString().split('T')[0]}
                      className="border-dashed rounded-pill ps-4"
                      isInvalid={!isTanggalValid}
                    />
                    <Form.Text className="text-muted">Pilih sesuai e‑KTP</Form.Text>
                  </Form.Group>

                  <div className="text-center">
                    <Button
                      type="submit"
                      disabled={loading || !(isNikValid && isNamaValid && isTanggalValid)} // Tombol dinonaktifkan jika ada input tidak valid
                      variant="outline-dark"
                      className="px-5 py-2 rounded-pill fw-bold"
                    >
                      {loading ? 'Memverifikasi...' : 'Verifikasi e-KTP'}
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