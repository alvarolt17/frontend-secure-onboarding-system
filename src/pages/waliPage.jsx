import React, { useState, useEffect } from 'react'; // Import useEffect
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useFormData } from '../context/formContext';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/wondr-logo.png';
import guardianImg from '../assets/wali.png';
import { useRegister } from '../context/RegisterContext'; // Import useRegister

// List of allowed guardian options
const guardianOptions = ['Ayah', 'Ibu', 'Suami', 'Istri', 'Anak', 'Bibi', 'Paman', 'Kakek', 'Nenek'];

// Simple sanitization: trim, remove non-alphanumeric and accent chars just in case
function sanitizeGuardian(input) {
  return input.trim().replace(/[^\wÀ-ÿ ]/g, '');
}

export default function WaliPage() {
  const [selectedGuardian, setSelectedGuardian] = useState('');
  const { updateForm } = useFormData();       // ✅
  const navigate = useNavigate();            // ✅
  const { completeStep, checkAndRedirect } = useRegister(); // Ambil completeStep dan checkAndRedirect dari context

  // Efek untuk memeriksa akses
  useEffect(() => {
    if (!checkAndRedirect('/wali')) { // Pastikan path sesuai dengan yang ada di pathMap di RegisterContext
      return; // Sudah di-redirect, tidak perlu melanjutkan render atau logika lain
    }
  }, [checkAndRedirect]);

  const handleSelect = option => {
    // Sanitize before setting
    const clean = sanitizeGuardian(option);
    if (guardianOptions.includes(clean)) {
      setSelectedGuardian(clean);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!selectedGuardian) return;

    updateForm({ jenisWali: selectedGuardian });
    console.log('Wali yang dipilih:', selectedGuardian);
    completeStep('waliInfoDone'); // Tandai langkah ini selesai
    navigate('/identitasWali');                    // ➡️ Navigasi
  };

  return (
    <div className="d-flex flex-column bg-white" style={{ minHeight: '100vh' }}>
      <header className="p-3 ps-4">
        <img src={logo} alt="Wondr Logo" style={{ width: '130px' }} />
      </header>
      <main className="flex-grow-1 d-flex align-items-center justify-content-center">
        <Container className="p-4 bg-white rounded-4 shadow" style={{ maxWidth: '1200px', width: '95vw' }}>
          <Row className="align-items-center">
            <Col md={6}>
              <h2 className="fw-bold mb-2">Siapa wali kamu?</h2>
              <p className="text-muted mb-4">Wali adalah orang yang bertanggung jawab atas diri kamu.</p>

              {guardianOptions.map((option, idx) => {
                const clean = sanitizeGuardian(option);
                const isSelected = selectedGuardian === clean;
                return (
                  <Button
                    key={idx}
                    onClick={() => handleSelect(option)}
                    className="mb-3 w-100 text-start rounded-3"
                    style={{
                      border: '2px solid #FFA500',
                      backgroundColor: isSelected ? '#FFA500' : 'transparent',
                      color: isSelected ? 'white' : '#333',
                      fontWeight: isSelected ? '700' : '600',
                    }}
                    variant="link"
                    size="lg"
                  >
                    {clean}
                  </Button>
                );
              })}

              <div className="text-center mt-3">
                <Button
                  onClick={handleSubmit}
                  className="fw-bold rounded-pill px-5 py-2"
                  style={{ backgroundColor: '#2ce3dc', border: 'none', color: '#000' }}
                  disabled={!selectedGuardian}
                >
                  Lanjutkan
                </Button>
              </div>
            </Col>

            <Col md={6} className="d-none d-md-flex justify-content-end">
              <img
                src={guardianImg}
                alt="Guardian Illustration"
                className="img-fluid"
                style={{ maxHeight: '500px', objectFit: 'contain' }}
              />
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}