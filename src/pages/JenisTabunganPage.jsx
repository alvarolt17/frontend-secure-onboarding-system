import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './JenisTabunganPage.css';
import logo from '../assets/wondr-logo.png';
import saldoIcon from '../assets/saldo-awal.png';
import adminIcon from '../assets/biaya-admin.png';
import kartuIcon from '../assets/KD.png';
import background from '../assets/background.png'; // your background image
import {Navigate, useNavigate } from 'react-router-dom';

export default function JenisTabunganPage() {
    const navigate = useNavigate('')

     const submitHandler = (e) => {
    e.preventDefault();
    navigate('/wondrLanding');
  };
  return (
    <div className="jenis-tabungan-page d-flex flex-column min-vh-100">
      {/* Background wrapper */}
      <div className="background-wrapper">
        <header className="px-4 pt-3">
          <img src={logo} alt="Wondr Logo" className="logo-img" />
        </header>

        <main className="flex-grow-1 d-flex flex-column justify-content-center align-items-center px-3">
          <h2 className="fw-bold text-center mb-4 title-text">Pilih Jenis Tabungan</h2>
          <div className="card-tabungan p-4 rounded-4 shadow bg-white w-100" style={{ maxWidth: '480px' }}>
            {/* Card content unchanged */}
            <h3 className="fw-bold text-center mb-2">BNI Taplus Muda</h3>
            <p className="text-muted text-center mb-4 small">
              Bukan sekedar sensasi tapi menjadi inspirasi bagi generasi muda saat ini.
            </p>

            {[saldoIcon, adminIcon, kartuIcon].map((icon, idx) => (
              <Row key={idx} className="align-items-center mb-3">
                <Col xs={2} className="text-center">
                  <img src={icon} alt="" className="icon-img" />
                </Col>
                <Col>
                  <strong>
                    {idx === 0 ? 'Saldo minimum' :
                     idx === 1 ? 'Biaya admin' : 'Kartu Debit'}
                  </strong>
                  <br />
                  {idx === 0 ? 'Rp 100.000' :
                   idx === 1 ? 'Rp 5.000/bulan' : 'Tersedia dalam 1 pilihan'}
                </Col>
              </Row>
            ))}

            <div className="text-start mb-3">
              <a href="#" className="text-orange fw-semibold">Selengkapnya</a>
            </div>

            <Button variant="warning" className="w-100 rounded-pill fw-bold py-2" onClick={submitHandler}>
              Pilih
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
