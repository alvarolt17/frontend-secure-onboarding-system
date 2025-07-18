// src/pages/AccountConfirmation.jsx
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import logo from '../assets/wondr-logo.png';
import icon from '../assets/rekening-berhasil.png';
import kartuSilver from '../assets/kartuSilver.png';
import kartuGold from '../assets/kartuGold.png';
import kartuPlatinum from '../assets/kartuPlatinum.png';
import kartuBatik from '../assets/kartuBatik.png';
import kartuGPN from '../assets/kartuGPN.png';

export default function AccountConfirmation() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedData = localStorage.getItem('registerSummary');
    if (!savedData) {
      alert('Data tidak ditemukan. Silakan daftar ulang.');
      navigate('/');
      return;
    }
    setUserData(JSON.parse(savedData));
  }, [navigate]);

  const getCardImage = (jenisKartu = '') => {
    switch (jenisKartu.toLowerCase()) {
      case 'gold': return kartuGold;
      case 'platinum': return kartuPlatinum;
      case 'batik air': return kartuBatik;
      case 'gpn': return kartuGPN;
      case 'silver':
      default: return kartuSilver;
    }
  };

  const getSetoranAwal = (jenisTabungan = '') => {
  const normalized = jenisTabungan;
  if (normalized === 'BNI Taplus Muda') return 'Rp 100.000';
  return 'Rp 150.000';
};


  if (!userData) return null;

  return (
    <div className="d-flex flex-column bg-light font-poppins">
      <header className="p-3 ps-4">
        <img src={logo} alt="Wondr Logo" width={130} />
      </header>

      <main className="flex-grow-1 d-flex align-items-center justify-content-center">
        <Container className="p-4 rounded-5 shadow bg-white">
          <Row className="align-items-center">
            <Col md={6} className="d-none d-md-flex justify-content-center">
              <img src={icon} alt="Rekening Sukses" className="img-fluid" style={{ maxWidth: '80%', maxHeight: '500px' }} />
            </Col>

            <Col md={6}>
              <h3 className="mb-3 fw-bold">Rekening tabungan kamu berhasil dibuka</h3>
              <p className="text-muted mb-4">
                Kamu perlu lakukan setoran awal untuk bisa mulai transaksi dengan rekening kamu.
              </p>

              <div className="text-center mb-3">
                <Image
                  src={getCardImage(userData.jenisKartu)}
                  alt="Kartu Debit"
                  style={{ maxWidth: '350px', borderRadius: '8px' }}
                  fluid
                />
              </div>

              <Card className="p-3 shadow-sm mb-4 border-0">
                <Row className="mb-2">
                  <Col xs={5}><strong>Nama Rekening</strong></Col>
                  <Col xs={7}>{userData.namaLengkap}</Col>
                </Row>
                <Row className="mb-2">
                  <Col xs={5}><strong>Nomor Kartu Debit Virtual</strong></Col>
                  <Col xs={7}>{userData.nomorKartuDebitVirtual}</Col>
                </Row>
                <Row className="mb-2">
                  <Col xs={5}><strong>Jenis Tabungan</strong></Col>
                  <Col xs={7}><strong>{userData.jenisTabungan}</strong></Col>
                </Row>
                <Row className="mb-2">
                  <Col xs={5}><strong>Nomor Rekening</strong></Col>
                  <Col xs={7}>{userData.kodeRekening}</Col>
                </Row>
                <Row>
                  <Col xs={5}><strong>Setoran Awal</strong></Col>
                  <Col xs={7}>{getSetoranAwal(userData.jenisTabungan)}</Col>
                </Row>
              </Card>

              <div className="text-center">
                <Button
                  variant="info"
                  className="w-100 text-white fw-bold py-2 rounded-pill"
                  onClick={() => {
                    localStorage.removeItem('registerSummary');
                    navigate('/');
                  }}
                >
                  Selesai
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}
