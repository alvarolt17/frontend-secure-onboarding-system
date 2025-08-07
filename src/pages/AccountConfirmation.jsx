// src/pages/AccountConfirmation.jsx
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// Impor useFormData dan useRegister
import { useFormData } from '../context/formContext';
import { useRegister } from '../context/RegisterContext';

import logo from '../assets/wondr-logo.png';
import icon from '../assets/rekening-berhasil.png';
import kartuSilver from '../assets/kartuSilver.png';
import kartuGold from '../assets/kartuGold.png';
import kartuPlatinum from '../assets/kartuPlatinum.png';
import kartuBatik from '../assets/kartuBatik.png';
import kartuGPN from '../assets/kartuGPN.png';

export default function AccountConfirmation() {
  // Ambil data dari formContext
  const { data: userDataFromContext } = useFormData();
  const navigate = useNavigate();
  const { resetRegisterFlow, checkAndRedirect } = useRegister();

  // State lokal untuk data yang ditampilkan, bisa diinisialisasi dari context
  const [displayUserData, setDisplayUserData] = useState(null);

  useEffect(() => {
    // 1. Periksa akses sekuensial
    if (!checkAndRedirect('/summary')) {
      return; // Redirect sudah ditangani oleh checkAndRedirect
    }

    // 2. Jika akses diizinkan, gunakan data dari context
    if (userDataFromContext && Object.keys(userDataFromContext).length > 0) {
      // Generate dummy virtual card number and account number
      // Ini hanya contoh, Anda mungkin ingin ini dihasilkan di backend atau di langkah sebelumnya
      const virtualCardNumber = '5' + Math.random().toFixed(15).replace('0.', '').slice(0, 15); // Contoh: 16 digit dimulai dengan 5
      const accountNumber = '1' + Math.random().toFixed(9).replace('0.', '').slice(0, 9); // Contoh: 10 digit dimulai dengan 1

      // Gabungkan data dari context dengan data yang dihasilkan
      setDisplayUserData({
        ...userDataFromContext,
        nomorKartuDebitVirtual: virtualCardNumber,
        kodeRekening: accountNumber,
        // Pastikan jenisTabungan dan jenisKartu ada di userDataFromContext
        jenisTabungan: userDataFromContext.tipeAkun || 'BNI Taplus', // Gunakan tipeAkun dari context
        jenisKartu: userDataFromContext.jenisKartu || 'Silver' // Gunakan jenisKartu dari context
      });

    } else {
      // Jika data tidak ada di context (misalnya, diakses langsung tanpa alur lengkap)
      console.warn('User data not found in context for AccountConfirmation. Redirecting to home.');
      navigate('/');
    }
  }, [userDataFromContext, navigate, checkAndRedirect]);

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

  // Tampilkan loading atau null jika data belum siap
  if (!displayUserData) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <p>Memuat data konfirmasi...</p>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column bg-light font-poppins">
      <header className="p-3 ps-4">
        <img
  src={logo}
  alt="Wondr Logo"
  style={{ width: '130px', cursor: 'pointer' }}
  onClick={() => navigate('/')}
/>
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
                  src={getCardImage(displayUserData.jenisKartu)}
                  alt="Kartu Debit"
                  style={{ maxWidth: '350px', borderRadius: '8px' }}
                  fluid
                />
              </div>

              <Card className="p-3 shadow-sm mb-4 border-0">
                <Row className="mb-2">
                  <Col xs={5}><strong>Nama Rekening</strong></Col>
                  <Col xs={7}>{displayUserData.namaLengkap}</Col>
                </Row>
                <Row className="mb-2">
                  <Col xs={5}><strong>Nomor Kartu Debit Virtual</strong></Col>
                  <Col xs={7}>{displayUserData.nomorKartuDebitVirtual}</Col>
                </Row>
                <Row className="mb-2">
                  <Col xs={5}><strong>Jenis Tabungan</strong></Col>
                  <Col xs={7}><strong>{displayUserData.jenisTabungan}</strong></Col>
                </Row>
                <Row className="mb-2">
                  <Col xs={5}><strong>Nomor Rekening</strong></Col>
                  <Col xs={7}>{displayUserData.kodeRekening}</Col>
                </Row>
                <Row>
                  <Col xs={5}><strong>Setoran Awal</strong></Col>
                  <Col xs={7}>{getSetoranAwal(displayUserData.jenisTabungan)}</Col>
                </Row>
              </Card>

              <div className="text-center">
                <Button
                  variant="info"
                  className="w-100 text-white fw-bold py-2 rounded-pill"
                  onClick={() => {
                    resetRegisterFlow(); // Reset status pendaftaran di RegisterContext
                    navigate('/'); // Kembali ke halaman utama
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