import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useFormData } from '../context/formContext';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/wondr-logo.png';
import characterImg from '../assets/businessman.png';

export default function PersonalDataForm() {
  const [formData, setFormData] = useState({
    birthPlace: '', gender: '', religion: '', maritalStatus: '',
  });

  const { updateForm } = useFormData();   // ✔️
  const navigate = useNavigate();         // ✔️

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateForm({
      tempatLahir: formData.birthPlace,
      jenisKelamin: formData.gender,
      agama: formData.religion,
      statusPernikahan: formData.maritalStatus,
    });

    console.log('Data disimpan:', formData);
    navigate('/namaIbu');  // ➡️ navigasi ke halaman selanjutnya
  };

  return (
    <div className="vh-100 d-flex flex-column bg-white">
      <div className="p-3 ps-4">
        <img src={logo} alt="logo wondr" style={{ width: '130px' }} />
      </div>
      <div className="flex-grow-1 d-flex align-items-center justify-content-center">
        <Container className="p-4 bg-white rounded-4 shadow" style={{ maxWidth: '1200px', width: '95vw' }}>
          <Row className="align-items-center mt-4">
            <Col md={6}>
              <h2 className="fw-bold">Isi data personal kamu</h2>
              <p className="text-muted mb-4">
                Pastikan detail yang kamu masukkan sesuai dengan e-KTP yaa!!
              </p>

              <Form onSubmit={handleSubmit}>
                {/* Tempat lahir */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold small">Tempat Lahir</Form.Label>
                  <Form.Control
                    type="text"
                    name="birthPlace"
                    value={formData.birthPlace}
                    onChange={handleChange}
                    placeholder="Tempat Lahir"
                    className="border-info border-2 rounded-3"
                  />
                </Form.Group>

                {/* Jenis Kelamin */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold small">Jenis Kelamin</Form.Label>
                  <Form.Select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="border-info border-2 rounded-3"
                  >
                    <option value="">Pilih jenis kelamin</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </Form.Select>
                </Form.Group>

                {/* Agama */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold small">Agama</Form.Label>
                  <Form.Select
                    name="religion"
                    value={formData.religion}
                    onChange={handleChange}
                    className="border-info border-2 rounded-3"
                  >
                    <option value="">Pilih agama</option>
                    <option value="Islam">Islam</option>
                    <option value="Kristen">Kristen</option>
                    <option value="Katolik">Katolik</option>
                    <option value="Hindu">Hindu</option>
                    <option value="Buddha">Buddha</option>
                    <option value="Konghucu">Konghucu</option>
                  </Form.Select>
                </Form.Group>

                {/* Status Perkawinan */}
                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold small">Status Perkawinan</Form.Label>
                  <Form.Select
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={handleChange}
                    className="border-info border-2 rounded-3"
                  >
                    <option value="">Pilih status</option>
                    <option value="Lajang">Lajang</option>
                    <option value="Menikah">Menikah</option>
                    <option value="Cerai">Cerai</option>
                  </Form.Select>
                </Form.Group>

                <Button
                  type="submit"
                  style={{
                    backgroundColor: '#2ce3dc',
                    color: 'black',
                    borderRadius: '30px',
                    fontWeight: 'bold',
                    width: '100%',
                  }}
                >
                  Lanjutkan
                </Button>
              </Form>
            </Col>

            <Col md={6} className="text-center mt-4 mt-md-0">
              <img
                src={characterImg}
                alt="Character"
                className="img-fluid d-none d-md-inline-block"
                style={{ maxHeight: '500px', objectFit: 'contain' }}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
