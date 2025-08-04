// src/pages/PenghasilanPage.jsx

import React, { useState, useEffect } from 'react'; // Import useEffect
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/wondr-logo.png';
import incomeImg from '../assets/sumber-penghasilan.png';
import { useFormData } from '../context/formContext'; // pastikan hook tersedia
import { useNavigate } from 'react-router-dom';
import { useRegister } from '../context/RegisterContext'; // Import useRegister

const incomeOptions = [
  'Gaji',
  'Hasil Investasi',
  'Hasil Usaha',
  'Hibah/Warisan'
];

export default function PenghasilanPage() {
  const [selectedIncome, setSelectedIncome] = useState('');
  const { updateForm } = useFormData();  // gunakan context updateForm
  const navigate = useNavigate();
  const { completeStep, checkAndRedirect } = useRegister(); // Ambil completeStep dan checkAndRedirect dari context

  // Efek untuk memeriksa akses
  useEffect(() => {
    if (!checkAndRedirect('/penghasilan')) { // Pastikan path sesuai dengan yang ada di pathMap di RegisterContext
      return; // Sudah di-redirect, tidak perlu melanjutkan render atau logika lain
    }
  }, [checkAndRedirect]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simpan ke context dengan key sesuai permintaan
    updateForm({
      sumberPenghasilan: selectedIncome
    });

    console.log('Sumber Penghasilan saved:', selectedIncome);
    completeStep('penghasilanDone'); // Tandai langkah ini selesai

    // Lanjut ke halaman berikutnya
    navigate('/jumlahGaji');
  };

  return (
    <div className="d-flex flex-column bg-white" style={{ minHeight: '100vh' }}>
      <div className="p-3 ps-4">
        <img src={logo} alt="Wondr Logo" style={{ width: '130px', cursor: 'pointer' }} onClick={() => navigate('/')} 
         />
      </div>

      <div className="flex-grow-1 d-flex align-items-center justify-content-center">
        <Container className="p-4 bg-white rounded-4 shadow"
          style={{ maxWidth: 1200, width: '95vw', maxHeight: '100vh', overflowY: 'auto' }}>
          <Row className="align-items-center">
            <Col md={6}>
              <h2 className="fw-bold mb-2">Darimana sumber penghasilan kamu?</h2>
              <p className="text-muted mb-4">
                Pilih sumber penghasilan yang kamu pakai untuk menabung dan biayain kebutuhan sehari-hari.
              </p>

              {incomeOptions.map((option, idx) => (
                <Button
                  key={idx}
                  variant="light"
                  onClick={() => setSelectedIncome(option)}
                  className={`mb-3 w-100 text-start border-2 rounded-3 fw-bold ${
                    selectedIncome === option
                      ? 'border-success bg-light text-dark'
                      : ''
                  }`}
                  style={{
                    borderColor: selectedIncome === option ? '#d4d700' : '#cbd100'
                  }}
                >
                  {option}
                </Button>
              ))}

              <div className="text-center mt-3">
                <Button
                  onClick={handleSubmit}
                  className="fw-bold rounded-pill px-5 py-2"
                  style={{ backgroundColor: '#2ce3dc', border: 'none' }}
                  disabled={!selectedIncome}
                >
                  Lanjutkan
                </Button>
              </div>
            </Col>

            <Col md={6} className="d-none d-md-flex justify-content-end">
              <img
                src={incomeImg}
                alt="Income Illustration"
                className="img-fluid"
                style={{ maxHeight: 500, objectFit: 'contain' }}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}