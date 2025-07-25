// src/pages/TujuanPembukaanRekening.jsx
import React, { useState } from 'react';
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap';
import logo from '../assets/wondr-logo.png';
import characterImg from '../assets/pembukaan-rekening.png';
import { useFormData } from '../context/formContext';
import { useNavigate } from 'react-router-dom';

export default function TujuanPembukaanRekening() {
  const [selected, setSelected] = useState('');
  const options = ['Investasi', 'Tabungan', 'Transaksi'];

  const { updateForm, data } = useFormData();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateForm({ tujuanPembuatanRekening: selected });

    const payload = {
      namaLengkap: data.namaLengkap || '',
      nik: data.nik || '',
      namaIbuKandung: data.namaIbuKandung || '',
      nomorTelepon: data.nomorTelepon.startsWith('0') ? data.nomorTelepon : '0' + data.nomorTelepon,
      email: data.email || '',
      password: data.password || '',
      tipeAkun: data.tipeAkun || '',
      tempatLahir: data.tempatLahir || '',
      tanggalLahir: data.tanggalLahir || '',
      jenisKelamin: data.jenisKelamin || '',
      jenisKartu: data.jenisKartu || '',
      agama: data.agama || '',
      statusPernikahan: data.statusPernikahan || '',
      pekerjaan: data.pekerjaan || '',
      sumberPenghasilan: data.sumberPenghasilan || '',
      rentangGaji: data.rentangGaji || '',
      tujuanPembuatanRekening: selected,
      kodeRekening: data.kodeRekening || null,
      alamat: {
        namaAlamat: data.namaAlamat || '',
        provinsi: data.provinsi || '',
        kota: data.kota || '',
        kecamatan: data.kecamatan || '',
        kelurahan: data.kelurahan || '',
        kodePos: data.kodePos || ''
      },
      wali: {
        jenisWali: data.jenisWali || '',
        namaLengkapWali: data.namaLengkapWali || '',
        pekerjaanWali: data.pekerjaanWali || '',
        alamatWali: data.alamatWali || '',
        nomorTeleponWali: data.nomorTeleponWali?.startsWith('0')
          ? data.nomorTeleponWali
          : '0' + (data.nomorTeleponWali || '')
      }
    };
    console.log('Request Payload:', payload);

    try {
      // ✅ Ganti URL sesuai dengan backend yang digunakan
      // ✅ Gunakan base URL dari .env
        const baseURL = import.meta.env.VITE_BACKEND_BASE_URL; // Mendapatkan base URL dari .env
        const response = await fetch(`${baseURL}/api/auth/register`, {      
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || 'Gagal melakukan registrasi');
        return;
      }

      // ✅ Simpan response ke localStorage
      localStorage.setItem('registerSummary', JSON.stringify(result.data));

      // ✅ Arahkan ke halaman summary
      navigate('/summary');
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan jaringan.');
    }
  };

  return (
    <div className="vh-100 d-flex flex-column bg-white">
      <div className="p-3 ps-4">
        <img src={logo} alt="logo wondr" style={{ width: '130px' }} />
      </div>
      <div className="flex-grow-1 d-flex align-items-center justify-content-center">
        <Container className="p-4 bg-white rounded-4 shadow" style={{ maxWidth: '1200px', width: '95vw' }}>
          <Row className="align-items-center">
            <Col md={6}>
              <h2 className="fw-bold">Apa tujuan kamu buka rekening?</h2>
              <p className="text-muted mb-4">Pilih tujuan kamu buka rekening BNI.</p>
              <ListGroup as="ul">
                {options.map((opt, idx) => (
                  <ListGroup.Item
                    as="li"
                    key={idx}
                    action
                    active={selected === opt}
                    onClick={() => setSelected(opt)}
                    className="mb-3 rounded-3"
                    style={{ border: '2px solid #f18b00', padding: '12px 20px', cursor: 'pointer' }}
                  >
                    {opt}
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Button
                disabled={!selected}
                onClick={handleSubmit}
                className="mt-3"
                style={{
                  backgroundColor: '#2ce3dc',
                  color: 'black',
                  borderRadius: '30px',
                  fontWeight: 'bold',
                  width: '100%'
                }}
              >
                Lanjutkan
              </Button>
            </Col>
            <Col md={6} className="text-center d-none d-md-block">
              <img src={characterImg} alt="Character" className="img-fluid" style={{ maxHeight: '500px' }} />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
