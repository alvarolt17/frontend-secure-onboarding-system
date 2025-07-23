import React, { useState, useEffect, useMemo } from 'react'; // <-- Tambahkan useMemo di sini
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/wondr-logo.png';
import guardianImg from '../assets/Guardian.png';
import { useFormData } from '../context/formContext';
import { useNavigate } from 'react-router-dom';
import { useRegister } from '../context/RegisterContext';

export default function WaliIdentityPage() {
  const [data, setData] = useState({
    fullName: '', job: '', address: '', phone: ''
  });
  const [errors, setErrors] = useState({});
  const { updateForm } = useFormData();
  const navigate = useNavigate();
  const { completeStep, checkAndRedirect } = useRegister();

  useEffect(() => {
    if (!checkAndRedirect('/identitasWali')) {
      return;
    }
  }, [checkAndRedirect]);

  const handleChange = e => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleClear = name => {
    setData(prev => ({ ...prev, [name]: '' }));
    // Tidak langsung set error di sini, biarkan validasi form yang menanganinya saat submit
    // atau tambahkan validasi real-time yang tidak memicu re-render loop
  };

  // Validasi sederhana untuk semua field
  const validateForm = () => {
    let newErrors = {};
    let isValid = true;
    for (const key in data) {
      if (data[key].trim() === '') {
        newErrors[key] = 'Field ini tidak boleh kosong.';
        isValid = false;
      }
    }
    // Validasi nomor telepon lebih spesifik
    if (data.phone.trim() !== '' && !/^\d{8,15}$/.test(data.phone.trim())) {
      newErrors.phone = 'Nomor HP tidak valid (hanya angka, 8-15 digit).';
      isValid = false;
    }

    // Hanya update errors state jika ada perubahan signifikan
    if (JSON.stringify(newErrors) !== JSON.stringify(errors)) {
      setErrors(newErrors);
    }
    return isValid;
  };

  // Pindahkan validasi yang tidak memicu state update untuk status tombol
  const isFormTrulyValid = useMemo(() => {
    // Ini adalah validasi yang sama dengan validateForm, tetapi tanpa setErrors
    // Ini hanya untuk menentukan status tombol 'disabled'
    for (const key in data) {
      if (data[key].trim() === '') return false;
    }
    if (data.phone.trim() !== '' && !/^\d{8,15}$/.test(data.phone.trim())) return false;
    return true;
  }, [data]); // Dependensi hanya pada 'data'

  // --- DEBUGGING LOGS ---
  useEffect(() => {
    console.log('WaliIdentityPage State Update:');
    console.log('  Current data:', data);
    console.log('  Current errors:', errors);
    console.log('  Is form valid for button (derived):', isFormTrulyValid);
  }, [data, errors, isFormTrulyValid]);
  // --- END DEBUGGING LOGS ---

  const handleSubmit = async e => {
    e.preventDefault();
    console.log('handleSubmit called in WaliIdentityPage.');

    // Panggil validateForm untuk memperbarui state errors dan mendapatkan status validitas
    if (!validateForm()) {
      console.log('Form is not valid, stopping submission.');
      return;
    }

    updateForm({
      namaLengkapWali: data.fullName,
      pekerjaanWali: data.job,
      alamatWali: data.address,
      nomorTeleponWali: data.phone
    });
    console.log('Data wali saved to formContext.');

    completeStep('waliIdentityDone');
    console.log('waliIdentityDone marked as complete in RegisterContext.');

    console.log('Navigating to /penghasilan...');
    navigate('/penghasilan');
  };

  const renderInput = (label, name, placeholder) => (
    <Form.Group controlId={name} className="mb-3">
      <Form.Label>{label}</Form.Label>
      <div className="position-relative">
        <Form.Control
          type="text"
          name={name}
          value={data[name]}
          onChange={handleChange}
          placeholder={placeholder}
          className="rounded-pill py-2 ps-4"
          isInvalid={!!errors[name]}
          required
        />
        {data[name] && (
          <button
            type="button"
            onClick={() => handleClear(name)}
            className="btn-clear position-absolute top-50 end-0 translate-middle-y me-3"
            aria-label={`Hapus ${label}`}
          >
            ✕
          </button>
        )}
        <Form.Control.Feedback type="invalid">
          {errors[name]}
        </Form.Control.Feedback>
      </div>
    </Form.Group>
  );

  return (
    <div className="d-flex flex-column bg-white" style={{ minHeight: '100vh' }}>
      <div className="p-3 ps-4">
        <img src={logo} alt="Wondr Logo" style={{ width: '130px' }} />
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
                  disabled={!isFormTrulyValid}
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