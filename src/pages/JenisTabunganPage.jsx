// src/pages/JenisTabunganPage.jsx

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useFormData } from '../context/formContext'; // import context
import './JenisTabunganPage.css';

import logo from '../assets/wondr-logo.png';
import saldoIcon from '../assets/saldo-awal.png';
import adminIcon from '../assets/biaya-admin.png';
import kartuIcon from '../assets/KD.png';
import dendaIcon from '../assets/denda.png';
import bukuTabunganIcon from '../assets/BuTab.png';
import umurIcon from '../assets/umur.png';
import background from '../assets/background.png';

export default function JenisTabunganPage() {
  const navigate = useNavigate();
  const { updateForm } = useFormData(); // ambil fungsi simpan context

  const tabunganList = [
    {
      title: 'BNI Taplus Muda',
      description: 'Bukan sekedar sensasi tapi menjadi inspirasi bagi generasi muda saat ini.',
      details: [
        { label: 'Saldo minimum', value: 'Rp 100.000', icon: saldoIcon },
        { label: 'Biaya admin', value: 'Rp 5.000/bulan', icon: adminIcon },
        { label: 'Kartu Debit', value: 'Tersedia dalam 1 pilihan', icon: kartuIcon },
        { label: 'Buku Tabungan', value: 'Tidak Tersedia', icon: bukuTabunganIcon },
        { label: 'Umur Nasabah', value: '17–35 Tahun', icon: umurIcon },
        { label: 'Denda dibawah saldo minimum', value: 'Rp 5.000', icon: dendaIcon },
      ]
    },
    {
      title: 'BNI Taplus',
      description: 'Bikin urusan transaksi dimana saja dan kapan saja jadi lebih mudah.',
      details: [
        { label: 'Saldo minimum', value: 'Rp 150.000', icon: saldoIcon },
        { label: 'Biaya admin', value: 'Rp 11.000/bulan', icon: adminIcon },
        { label: 'Kartu Debit', value: 'Tersedia dalam 5 pilihan', icon: kartuIcon },
        { label: 'Buku Tabungan', value: 'Tersedia', icon: bukuTabunganIcon },
        { label: 'Umur Nasabah', value: 'Mulai dari 17 Tahun', icon: umurIcon },
        { label: 'Denda dibawah saldo minimum', value: 'Rp 5.000', icon: dendaIcon },
      ]
    }
  ];

  const handleChoose = (title) => {
    updateForm({ tipeAkun: title });
    console.log('✅ Pilihan tipeTabungan disimpan:', title);
    navigate('/JenisKartuPage');
  };

  return (
    <div className="jenis-tabungan-page d-flex flex-column min-vh-100">
      <div className="background-wrapper" style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        flex: 1
      }}>
        <header className="px-4 pt-3">
          <img src={logo} alt="Wondr Logo" className="logo-img" />
        </header>

        <main className="flex-grow-1 d-flex flex-column justify-content-center align-items-center px-3">
          <h2 className="fw-bold text-center mb-5 title-text">Pilih Jenis Tabungan</h2>
          <Container>
            <Row className="justify-content-center g-4">
              {tabunganList.map((tabungan, index) => (
                <Col key={index} md={6} lg={5}>
                  <div className="card-tabungan p-4 rounded-4 shadow bg-white h-100">
                    <h3 className="fw-bold text-center mb-2">{tabungan.title}</h3>
                    <p className="text-muted text-center mb-4 small">
                      {tabungan.description}
                    </p>

                    {tabungan.details.map((item, idx) => (
                      <Row key={idx} className="align-items-center mb-3">
                        <Col xs={2} className="text-center">
                          <img src={item.icon} alt="" className="icon-img" />
                        </Col>
                        <Col>
                          <strong>{item.label}</strong><br />
                          {item.value}
                        </Col>
                      </Row>
                    ))}

                    <Button
                      variant="warning"
                      className="w-100 rounded-pill fw-bold py-2 mt-2"
                      onClick={() => handleChoose(tabungan.title)}
                    >
                      Pilih
                    </Button>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </main>
      </div>
    </div>
  );
}
