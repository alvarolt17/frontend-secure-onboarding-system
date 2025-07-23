// src/pages/AddressInputPage.jsx
import React, { useState, useMemo, useEffect } from 'react'; // Import useEffect
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './address.css';
import logo from '../assets/wondr-logo.png';
import addressImg from '../assets/addressicon.png';
import { useFormData } from '../context/formContext';
import { useNavigate } from 'react-router-dom';
import { useRegister } from '../context/RegisterContext'; // Import useRegister

// 🔐 Sanitasi: trim, remove kontrol & tanda berbahaya
function sanitizeField(str) {
  return str
    .trim()
    .replace(/[\x00-\x1F\x7F]/g, '')           // hapus karakter kontrol
    .replace(/['";\\/]/g, '');                // buang karakter potensial injeksi
}

// ✅ Validasi: whitelist huruf, angka, spasi & teks unicode umum
function validateField(str) {
  return /^[A-Za-z0-9À-ÖØ-öø-ÿ\s\-,.]{1,100}$/.test(str);
}

export default function AddressInputPage() {
  const [data, setData] = useState({
    address: '', province: '', city: '',
    district: '', subDistrict: '', postalCode: '',
  });
  const [errors, setErrors] = useState({});
  const { updateForm } = useFormData();
  const navigate = useNavigate();
  const { completeStep, checkAndRedirect } = useRegister(); // Ambil completeStep dan checkAndRedirect dari context

  // Efek untuk memeriksa akses
  useEffect(() => {
    if (!checkAndRedirect('/alamat')) { // Pastikan path sesuai dengan yang ada di pathMap di RegisterContext
      return; // Sudah di-redirect, tidak perlu melanjutkan render atau logika lain
    }
  }, [checkAndRedirect]);

  const inputs = useMemo(() => [
    { label: 'Alamat Kamu', name: 'address', placeholder: 'Masukkan alamat lengkap' },
    { label: 'Provinsi', name: 'province', placeholder: 'Masukkan provinsi' },
    { label: 'Kabupaten/Kota', name: 'city', placeholder: 'Masukkan kota' },
    { label: 'Kecamatan', name: 'district', placeholder: 'Masukkan kecamatan' },
    { label: 'Kelurahan', name: 'subDistrict', placeholder: 'Masukkan kelurahan' },
  ], []);

  const maxPostal = 10;
  const handleChange = e => {
    const { name, value } = e.target;
    // khusus postalCode, hanya digit
    const val = name === 'postalCode'
      ? value.replace(/\D/g, '').slice(0, maxPostal)
      : value;
    setData(prev => ({ ...prev, [name]: val }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const allFilled = Object.values(data).every(v => v.trim() !== '');

  const handleSubmit = e => {
    e.preventDefault();

    // sanitasi + validasi
    const sanitized = {};
    const newErrs = {};

    Object.entries(data).forEach(([k, v]) => {
      const s = sanitizeField(v);
      sanitized[k] = s;
      if (k !== 'postalCode' && !validateField(s)) {
        newErrs[k] = 'Karakter tidak valid';
      }
      if (k === 'postalCode' && !/^\d{5,10}$/.test(s)) {
        newErrs[k] = 'Kode pos harus 5–10 digit';
      }
    });

    setErrors(newErrs);
    if (Object.keys(newErrs).length) return;

    updateForm({
      namaAlamat: sanitized.address,
      provinsi: sanitized.province,
      kota: sanitized.city,
      kecamatan: sanitized.district,
      kelurahan: sanitized.subDistrict,
      kodePos: sanitized.postalCode,
    });
    completeStep('addressInputDone'); // Tandai langkah ini selesai
    navigate('/pekerjaan');
  };

  return (
    <div className="page-wrapper font-poppins">
      <header className="p-3 ps-4">
        <img
          src={logo}
          alt="Wondr Logo"
          className="header-logo"
          onClick={() => navigate('/')}
        />
      </header>

      <main className="flex-grow-1 d-flex align-items-center justify-content-center">
        <Container className="form-container">
          <Row className="align-items-center">
            <Col md={6}>
              <h2 className="fw-bold mb-3">Apa alamat kamu di e‑KTP/IKD?</h2>
              <p className="text-muted mb-4">Pastikan detail sesuai e‑KTP/IKD ya.</p>
              <Form onSubmit={handleSubmit}>
                {inputs.map(({ label, name, placeholder }) => (
                  <Form.Group className="mb-3" controlId={name} key={name}>
                    <Form.Label className="fw-semibold small">{label}</Form.Label>
                    <div className="position-relative">
                      <Form.Control
                        type="text"
                        name={name}
                        value={data[name]}
                        onChange={handleChange}
                        placeholder={placeholder}
                        className="form-control-custom"
                        isInvalid={!!errors[name]}
                      />
                      {data[name] && (
                        <button
                          type="button"
                          onClick={() => setData(prev => ({ ...prev, [name]: '' }))}
                          className="btn-clear"
                          aria-label={`Hapus ${label}`}
                        >
                          ×
                        </button>
                      )}
                      <Form.Control.Feedback type="invalid">
                        {errors[name]}
                      </Form.Control.Feedback>
                    </div>
                  </Form.Group>
                ))}

                <Form.Group className="mb-3" controlId="postalCode">
                  <Form.Label className="fw-semibold small">Kode Pos</Form.Label>
                  <div className="position-relative">
                    <Form.Control
                      type="text"
                      name="postalCode"
                      value={data.postalCode}
                      onChange={handleChange}
                      placeholder="Masukkan kode pos"
                      className="form-control-custom"
                      isInvalid={!!errors.postalCode}
                    />
                    {data.postalCode && (
                      <button
                        type="button"
                        onClick={() => setData(prev => ({ ...prev, postalCode: '' }))}
                        className="btn-clear"
                        aria-label="Hapus kode pos"
                      >
                        ×
                      </button>
                    )}
                    <Form.Control.Feedback type="invalid">
                      {errors.postalCode}
                    </Form.Control.Feedback>
                  </div>
                </Form.Group>

                <Button
                  type="submit"
                  disabled={!allFilled}
                  className="btn-wondr fw-bold w-100 rounded-pill py-2"
                >
                  Lanjutkan
                </Button>
              </Form>
            </Col>

            <Col md={6} className="d-none d-md-flex justify-content-end">
              <img
                src={addressImg}
                alt="Location illustration"
                className="img-fluid"
                style={{ maxHeight: '500px', objectFit: 'contain' }}
              />
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}