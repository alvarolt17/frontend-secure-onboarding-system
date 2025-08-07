import React, { useState, useEffect } from 'react'; // Import useEffect
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap';
import logo from '../assets/wondr-logo.png';
import characterImg from '../assets/jumlah-gaji.png';
import { useFormData } from '../context/formContext';
import { useNavigate } from 'react-router-dom';
import { useRegister } from '../context/RegisterContext'; // Import useRegister

export default function IncomeSelectionForm() {
  const [selected, setSelected] = useState('');
  const { updateForm } = useFormData();
  const navigate = useNavigate();
  const { completeStep, checkAndRedirect } = useRegister(); // Ambil completeStep dan checkAndRedirect dari context

  // Efek untuk memeriksa akses
  useEffect(() => {
    if (!checkAndRedirect('/jumlahGaji')) { // Pastikan path sesuai dengan yang ada di pathMap di RegisterContext
      return; // Sudah di-redirect, tidak perlu melanjutkan render atau logika lain
    }
  }, [checkAndRedirect]);

  const options = [
    'Kurang dari Rp3 juta',
    '> Rp3 juta - Rp5 juta',
    '> Rp5 juta - Rp10 juta',
    '> Rp10 juta - Rp20 juta',
    '> Rp20 juta - Rp50 juta',
    '> Rp50 juta - Rp100 juta',
    '> Rp100 juta'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    updateForm({ rentangGaji: selected });
    console.log('rentangGaji saved:', selected);
    completeStep('jumlahGajiDone'); // Tandai langkah ini selesai

    navigate('/tujuanPembukaanRekening');  // sesuaikan rute tujuanmu
  };

  return (
    <div className="vh-100 d-flex flex-column bg-white">
      <div className="p-3 ps-4">
        <img
  src={logo}
  alt="Wondr Logo"
  style={{ width: '130px', cursor: 'pointer' }}
  onClick={() => navigate('/')}
/>
      </div>
      <div className="flex-grow-1 d-flex align-items-center justify-content-center">
        <Container className="p-4 bg-white rounded-4 shadow" style={{ maxWidth: '1200px', width: '95vw' }}>
          <Row className="align-items-center">
            <Col md={6}>
              <h2 className="fw-bold">Berapa penghasilan bulanan kamu?</h2>
              <p className="text-muted mb-4">Pilih jumlah uang yang kamu terima tiap bulan.</p>

              <ListGroup as="ul">
                {options.map((opt, idx) => (
                  <ListGroup.Item
                    as="li"
                    action
                    key={idx}
                    active={selected === opt}
                    onClick={() => setSelected(opt)}
                    className="mb-2 rounded-3"
                    style={{
                      border: '2px solid #f18b00',
                      padding: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    {opt}
                  </ListGroup.Item>
                ))}
              </ListGroup>

              <Button
                type="button"
                disabled={!selected}
                onClick={handleSubmit}
                className="mt-3"
                style={{
                  backgroundColor: '#2ce3dc',
                  color: 'black',
                  borderRadius: '30px',
                  fontWeight: 'bold',
                  width: '100%',
                }}
              >
                Lanjutkan
              </Button>
            </Col>

            <Col md={6} className="text-center d-none d-md-block">
              <img
                src={characterImg}
                alt="Character"
                className="img-fluid"
                style={{ maxHeight: '500px', objectFit: 'contain' }}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}