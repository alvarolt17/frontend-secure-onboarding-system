import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useFormData } from '../context/formContext';  // ✔️
import logo from '../assets/wondr-logo.png';
import gearsImg from '../assets/Pekerjaan.png';

export default function OccupationSelectPage() {
  const [occupation, setOccupation] = useState('');
  const navigate = useNavigate();
  const { updateForm } = useFormData();  // ✔️

  const occupations = [
    'Pegawai Negeri', 'Pegawai Swasta', 'Pegawai BUMN/BUMD', 'TNI/POLRI',
    'Pengusaha', 'Pedagang', 'Petani/Nelayan', 'Pelajar/Mahasiswa',
    'Ibu Rumah Tangga', 'Tidak Bekerja', 'Karyawan/Karyawati',
    'Wiraswasta', 'Pejabat Negara', 'Akuntan', 'Pengacara/Notaris',
    'Profesi', 'Pensiunan', 'Dosen/Guru Swasta', 'Dosen/Guru Negeri',
    'Dokter', 'Pegawai BNI', 'Unit Afiliasi BNI', 'Tenaga Kerja Indonesia',
    'Lain-lain'
  ];

  const handleSubmit = e => {
    e.preventDefault();
    if (!occupation) return;

    updateForm({ pekerjaan: occupation });  // Simpan ke context

    const nextRoutes = ['Ibu Rumah Tangga', 'Pelajar/Mahasiswa', 'Tidak Bekerja'];
    if (nextRoutes.includes(occupation)) {
      navigate('/wali');
    } else {
      navigate('/penghasilan');
    }
  };

  return (
    <div className="d-flex flex-column bg-white vh-100">
      <header className="p-3 ps-4">
        <img src={logo} alt="Wondr Logo" style={{ width: 130 }} />
      </header>
      <div className="flex-grow-1 d-flex align-items-center justify-content-center">
        <Container className="p-4 bg-white rounded-4 shadow" style={{ maxWidth: '1200px', width: '95vw' }}>
          <Row className="align-items-center">
            <Col md={6}>
              <h2 className="fw-bold mb-2">Apa pekerjaan kamu?</h2>
              <p className="text-muted mb-4">Pilih jenis pekerjaan kamu.</p>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="occupationSelect" className="mb-5">
                  <Form.Select
                    value={occupation}
                    onChange={e => setOccupation(e.target.value)}
                    className="py-2 ps-4 pe-5 border border-warning rounded"
                    style={{ fontSize: 16 }}
                  >
                    <option value="">pilih jenis pekerjaan</option>
                    {occupations.map((job, i) => (
                      <option key={i} value={job}>{job}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Button
                  type="submit"
                  disabled={!occupation}
                  variant="info"
                  className="fw-bold w-100 rounded-pill py-2"
                  style={{ backgroundColor: '#2ce3dc', border: 'none' }}
                >
                  Lanjutkan
                </Button>
              </Form>
            </Col>
            <Col md={6} className="d-none d-md-flex justify-content-end">
              <img
                src={gearsImg}
                alt="Gears Illustration"
                className="img-fluid"
                style={{ maxHeight: 500, width: '100%', objectFit: 'contain' }}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
