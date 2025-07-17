import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/wondr-logo.png';
import guardianImg from '../assets/Guardian.png';
import { useFormData } from '../context/formContext';
import { useNavigate } from 'react-router-dom';

export default function WaliIdentityPage() {
  const [data, setData] = useState({
    fullName: '', job: '', address: '', phone: ''
  });
  const { updateForm } = useFormData();
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleClear = name =>
    setData(prev => ({ ...prev, [name]: '' }));

  const handleSubmit = e => {
    e.preventDefault();

    // Simpan dengan key sesuai permintaan
    updateForm({
      namaLengkapWali: data.fullName,
      pekerjaanWali: data.job,
      alamatWali: data.address,
      nomorTeleponWali: data.phone
    });

    console.log('Data wali saved:', {
      namaLengkapWali: data.fullName,
      pekerjaanWali: data.job,
      alamatWali: data.address,
      nomorTeleponWali: data.phone
    });

    navigate('/penghasilan');
  };

  const renderInput = (label, name, placeholder) => (
    <Form.Group className="mb-3" controlId={name} key={name}>
      <Form.Label className="fw-semibold small">{label}</Form.Label>
      <div className="position-relative">
        <Form.Control
          type="text"
          name={name}
          value={data[name]}
          onChange={handleChange}
          placeholder={placeholder}
          className="border-info border-2 rounded-3"
        />
        {data[name] && (
          <button
            type="button"
            onClick={() => handleClear(name)}
            className="btn btn-light position-absolute top-50 end-0 translate-middle-y me-3 rounded-circle"
            style={{ width: 28, height: 28, fontSize: 16, lineHeight: 1 }}
          >
            ✕
          </button>
        )}
      </div>
    </Form.Group>
  );

  return (
    <div className="d-flex flex-column bg-white min-vh-100">
      <div className="p-3 ps-4">
        <img src={logo} alt="Wondr Logo" style={{ width: 130 }} />
      </div>
      <div className="flex-grow-1 d-flex align-items-center justify-content-center">
        <Container
          className="p-4 bg-white rounded-4 shadow"
          style={{
            maxWidth: 1200,
            width: '95vw',
            maxHeight: '100vh',
            overflowY: 'auto'
          }}
        >
          <Row className="align-items-center">
            <Col md={6}>
              <h2 className="fw-bold mb-3">Isi identitas wali</h2>
              <p className="text-muted mb-4">
                Isi NIK wali kamu, serta nama lengkap, nomor telepon, dan status pernikahannya
              </p>
              <Form onSubmit={handleSubmit}>
                {renderInput('Nama Lengkap Wali', 'fullName', 'Masukkan nama lengkap')}
                {renderInput('Pekerjaan', 'job', 'Masukkan pekerjaan')}
                {renderInput('Alamat Wali', 'address', 'Masukkan alamat (kota atau lengkap)')}
                {renderInput('Nomor HP', 'phone', '08xxxxxxxxxx')}
                <Button
                  type="submit"
                  className="fw-bold w-100 rounded-pill py-2"
                  style={{ backgroundColor: '#2ce3dc', border: 'none' }}
                >
                  Lanjutkan
                </Button>
              </Form>
            </Col>
            <Col md={6} className="d-none d-md-flex justify-content-end">
              <img
                src={guardianImg}
                alt="Guardian Illustration"
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
