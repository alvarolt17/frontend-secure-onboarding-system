import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/wondr-logo.png';
import addressImg from '../assets/addressicon.png';
import { useFormData } from '../context/formContext';
import { useNavigate } from 'react-router-dom';

export default function AddressInputPage() {
  const [formData, setFormData] = useState({
    address: '', province: '', city: '',
    district: '', subDistrict: '', postalCode: '',
  });
  const { updateForm } = useFormData();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleClear = field => setFormData(prev => ({ ...prev, [field]: '' }));

  const handleSubmit = (e) => {
    e.preventDefault();

    updateForm({
      namaAlamat: formData.address,
      provinsi: formData.province,
      kota: formData.city,
      kecamatan: formData.district,
      kelurahan: formData.subDistrict,
      kodePos: formData.postalCode,
    });

    console.log('Alamat Data disimpan di context:', formData);
    navigate('/pekerjaan');
  };

  const renderInput = (label, name, placeholder, isSelect = false, options = []) => (
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label className="fw-semibold small">{label}</Form.Label>
      <div className="position-relative">
        <Form.Control
          type="text"
          name={name}
          value={formData[name]}
          onChange={handleChange}
          placeholder={placeholder}
          className="border-info border-2 rounded-3"
        />
        {formData[name] && (
          <button type="button" onClick={() => handleClear(name)}
            className="btn btn-light position-absolute top-50 end-0 translate-middle-y me-3 rounded-circle"
            style={{ width: '28px', height: '28px', fontSize: '16px', lineHeight: '1' }}>
            ✕
          </button>
        )}
      </div>
    </Form.Group>
  );

  return (
    <div className="d-flex flex-column bg-white" style={{ minHeight: '100vh' }}>
      <div className="p-3 ps-4"><img src={logo} alt="Wondr Logo" style={{ width: '130px' }} /></div>
      <div className="flex-grow-1 d-flex align-items-center justify-content-center">
        <Container className="p-4 bg-white rounded-4 shadow" style={{
          maxWidth: '1200px', width: '95vw', maxHeight: '100vh', overflowY: 'auto'
        }}>
          <Row className="align-items-center">
            <Col md={6}>
              <h2 className="fw-bold mb-3">Apa alamat kamu di e‑KTP/IKD?</h2>
              <p className="text-muted mb-4">Pastikan detail sesuai e‑KTP/IKD ya.</p>
              <Form onSubmit={handleSubmit}>
                {renderInput('Alamat Kamu', 'address', 'Masukkan alamat lengkap')}
                {renderInput('Provinsi', 'province', 'Masukkan provinsi')}
                {renderInput('Kabupaten/Kota', 'city', 'Masukkan kota')}
                {renderInput('Kecamatan', 'district', 'Masukkan kecamatan')}
                {renderInput('Kelurahan', 'subDistrict', 'Masukkan kelurahan')}
                {renderInput('Kode Pos', 'postalCode', 'Masukkan kode pos')}
                <Button type="submit" variant="info" className="fw-bold w-100 rounded-pill py-2"
                  style={{ backgroundColor: '#2ce3dc', border: 'none' }}>
                  Lanjutkan
                </Button>
              </Form>
            </Col>
            <Col md={6} className="d-none d-md-flex justify-content-end">
              <img src={addressImg} alt="Location Icon" className="img-fluid"
                style={{ maxHeight: '500px', objectFit: 'contain' }} />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
