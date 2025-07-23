// src/pages/NameInputPage.jsx
import React, { useState, useEffect } from 'react'; // Import useEffect
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './nameInput.css';
import logo from '../assets/wondr-logo.png';
import badgeIcon from '../assets/Nama-badge.png';
import { useNavigate } from 'react-router-dom';
import { useFormData } from '../context/formContext'; // Import useFormData
import { useRegister } from '../context/RegisterContext'; // Import useRegister

// ✂️ Fungsi sanitasi: hapus karakter berisiko SQL
function sanitizeInput(str) {
  // menghilangkan ' " ; --
  return str.replace(/['";]|--/g, '').trim();
}

// ✅ Fungsi validasi: whitelist + panjang maksimal
function isValidName(str) {
  // hanya huruf, angka, spasi, 1–50 karakter
  return /^[a-zA-Z0-9\s]{1,50}$/.test(str);
}

export default function NameInputPage() {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { updateForm } = useFormData(); // Dapatkan updateForm dari formContext
  const { completeStep, checkAndRedirect } = useRegister(); // Dapatkan completeStep dan checkAndRedirect dari RegisterContext

  // Efek untuk memeriksa akses
  useEffect(() => {
    if (!checkAndRedirect('/name')) { // Pastikan path sesuai dengan yang ada di pathMap di RegisterContext
      return; // Sudah di-redirect, tidak perlu melanjutkan render atau logika lain
    }
  }, [checkAndRedirect]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const clean = sanitizeInput(name);
    if (!clean) {
      setError('Nama tidak boleh kosong setelah disanitasi.');
      return;
    }
    if (!isValidName(clean)) {
      setError('Hanya huruf, angka, dan spasi. Maksimal 50 karakter.');
      return;
    }
    setError('');
    console.log('Nama bersih dan valid:', clean);
    updateForm({ namaLengkap: clean }); // Simpan data ke formContext
    completeStep('nameInputDone'); // Tandai langkah ini selesai
    navigate('/phone'); // Lanjutkan navigasi
  };

  return (
    <div className="vh-100 d-flex flex-column bg-light">
      <header className="p-3 ps-4">
        <img src={logo} alt="Wondr Logo" width={130} loading="eager" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}/>
      </header>
      <main className="flex-grow-1 d-flex align-items-center justify-content-center">
        <Container className="p-4 rounded-5 shadow bg-white my-3">
          <Row className="align-items-center">
            <Col md={6} className="d-none d-md-flex justify-content-center">
              <img src={badgeIcon} alt="Badge Illustration" className="img-fluid" style={{ maxWidth: '80%', maxHeight: '500px' }} loading="lazy" />
            </Col>
            <Col md={6}>
              <h2 className="fw-bold text-dark">Siapa Nama Panggilanmu?</h2>
              <p className="text-muted">Biarkan kami bisa mengenalmu lebih dekat</p>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="nickname">
                  <Form.Label className="fw-semibold">Nama Kamu</Form.Label>
                  <div className="position-relative">
                    <Form.Control
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="rounded-pill px-4 py-2 border-bni-teal"
                      aria-label="Nama panggilan"
                      maxLength={50}
                    />
                    {name && (
                      <button type="button" onClick={() => setName('')} className="btn-clear" aria-label="Hapus nama">×</button>
                    )}
                  </div>
                </Form.Group>
                {error && <p className="text-danger mt-2">{error}</p>}
                <div className="text-center mt-4">
                  <Button type="submit" className="btn-wondr" disabled={!name || error}>Lanjutkan</Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}