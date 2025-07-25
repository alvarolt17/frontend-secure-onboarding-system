// src/pages/WaliIdentityPage.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './WaliIdentity.css'; // styling clear button
import logo from '../assets/wondr-logo.png';
import guardianImg from '../assets/Guardian.png';
import { useFormData } from '../context/formContext';
import { useNavigate } from 'react-router-dom';

// Sanitasi input: trim & bersihkan simbol rawan
function sanitizeText(str) {
  return str.trim().replace(/[\x00-\x1F\x7F]|['";\\/]/g, '');
}

// Hanya digit untuk telepon
function sanitizePhone(str) {
  return str.replace(/\D/g, '').slice(0, 13);
}

export default function WaliIdentityPage() {
  const [data, setData] = useState({ fullName: '', job: '', address: '', phone: '' });
  const [errors, setErrors] = useState({});
  const { updateForm } = useFormData();
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: name === 'phone' ? sanitizePhone(value) : value
    }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleClear = name => {
    setData(prev => ({ ...prev, [name]: '' }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = clean => {
    const errs = {};
    if (!clean.fullName) errs.fullName = 'Nama wajib';
    if (!clean.job) errs.job = 'Pekerjaan wajib';
    if (!clean.address) errs.address = 'Alamat wajib';
    if (!/^[0-9]{8,13}$/.test(clean.phone)) errs.phone = 'Nomor HP 8–13 digit';
    return errs;
  };

  const handleSubmit = e => {
    e.preventDefault();

    const clean = {
      fullName: sanitizeText(data.fullName),
      job: sanitizeText(data.job),
      address: sanitizeText(data.address),
      phone: sanitizePhone(data.phone)
    };

    const newErrors = validate(clean);
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    updateForm({
      namaLengkapWali: clean.fullName,
      pekerjaanWali: clean.job,
      alamatWali: clean.address,
      nomorTeleponWali: clean.phone
    });

    navigate('/penghasilan');
  };

  const renderInput = (label, name, placeholder, type = 'text') => (
    <Form.Group controlId={name} className="mb-3" key={name}>
      <Form.Label className="fw-semibold small">{label}</Form.Label>
      <div className="position-relative">
        <Form.Control
          type={type}
          name={name}
          value={data[name]}
          onChange={handleChange}
          placeholder={placeholder}
          isInvalid={!!errors[name]}
          className="border-info border-2 rounded-3"
        />
        {data[name] && (
          <button
            type="button"
            onClick={() => handleClear(name)}
            className="btn-clear"
            aria-label={`Hapus ${label}`}
          >
            ×
          </button>
        )}
        <Form.Control.Feedback type="invalid">{errors[name]}</Form.Control.Feedback>
      </div>
    </Form.Group>
  );

  return (
    <div className="d-flex flex-column bg-white min-vh-100">
      <header className="p-3 ps-4">
        <img src={logo} alt="Wondr Logo" width={130} />
      </header>
      <div className="flex-grow-1 d-flex align-items-center justify-content-center">
        <Container className="p-4 bg-white rounded-4 shadow" style={{ maxWidth: 1200, width: '95vw' }}>
          <Row className="align-items-center">
            <Col md={6}>
              <h2 className="fw-bold mb-3">Isi identitas wali</h2>
              <p className="text-muted mb-4">Isi detail wali kamu.</p>
              <Form onSubmit={handleSubmit}>
                {renderInput('Nama Lengkap Wali', 'fullName', 'Masukkan nama lengkap')}
                {renderInput('Pekerjaan', 'job', 'Masukkan pekerjaan')}
                {renderInput('Alamat Wali', 'address', 'Masukkan alamat')}
                {renderInput('Nomor HP', 'phone', '08xxxxxxxxxx', 'tel')}
                <Button type="submit" className="fw-bold w-100 rounded-pill py-2" style={{ backgroundColor: '#2ce3dc', border: 'none' }}>
                  Lanjutkan
                </Button>
              </Form>
            </Col>
            <Col md={6} className="d-none d-md-flex justify-content-end">
              <img src={guardianImg} alt="Guardian Illustration" className="img-fluid" style={{ maxHeight: 500, objectFit: 'contain' }} />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
  