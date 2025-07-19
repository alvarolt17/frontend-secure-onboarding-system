import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import './PhoneInputPage.css';
import logo from '../assets/wondr-logo.png';
import phoneIcon from '../assets/handphone.png';
import indonesiaFlag from '../assets/flag.png';
import { useNavigate } from 'react-router-dom';
import { useFormData } from '../context/formContext';

export default function PhoneInputPage() {
  const [phone, setPhone] = useState('');
  const [touched, setTouched] = useState(false);
  const navigate = useNavigate();
  const { data, updateForm } = useFormData();

  const validatePhone = (value) => {
    const num = value.replace(/\D/g, '');
    return /^[1-9][0-9]{7,50}$/.test(num);
  };

  const isValid = validatePhone(phone);

  const handleChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '');
    setPhone(raw);
    if (!touched) setTouched(true);a
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);
    if (!isValid) return;

    updateForm({ nomorTelepon:phone });
    navigate('/email');
  };

  useEffect(() => {
    console.log('Context data:', data);
  }, [data]);

  return (
    <div className="vh-100 d-flex flex-column bg-light font-poppins">
      <header className="p-3 ps-4">
        <img src={logo} alt="Wondr Logo" width={130} loading="eager" />
      </header>

      <main className="flex-grow-1 d-flex align-items-center justify-content-center">
        <Container className="p-4 rounded-5 shadow bg-white">
          <Row className="align-items-center">
            <Col md={6} className="d-none d-md-flex justify-content-center">
              <img src={phoneIcon} alt="Phone Icon" className="img-fluid" style={{ maxWidth: '80%', maxHeight: '500px' }} loading="lazy" />
            </Col>
            <Col md={6}>
              <h2 className="mb-3 fw-bold">Isi Nomor HP Kamu</h2>
              <p className="text-muted mb-4">Jangan lupa gunakan nomor aktif ya!</p>
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group controlId="phone">
                  <Form.Label className="fw-semibold">Nomor HP</Form.Label>
                  <InputGroup className={touched && (isValid ? 'is-valid' : 'is-invalid')}>
                    <InputGroup.Text className="px-3">
                      <img src={indonesiaFlag} alt="" width={24} height={16} />
                      <span className="ps-2">+62</span>
                    </InputGroup.Text>
                    <Form.Control
                      type="tel"
                      placeholder="81234567890"
                      value={phone}
                      onChange={handleChange}
                      aria-invalid={touched && !isValid}
                      required
                      maxLength={13}
                    />
                  </InputGroup>
                  {touched && !isValid && (
                    <Form.Control.Feedback type="invalid" className="d-block mt-1">
                      Format nomor HP tidak valid
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <div className="text-center mt-4">
                  <Button
                    type="submit"
                    className="btn-wondr px-5 py-2 rounded-pill fw-bold"
                    disabled={!isValid}
                  >
                    Lanjutkan
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}
