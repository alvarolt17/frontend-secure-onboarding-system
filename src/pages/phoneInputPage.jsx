import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './PhoneInput.css';
import logo from '../assets/wondr-logo.png';
import phoneIcon from '../assets/handphone.png';
import indonesiaFlag from '../assets/flag.png';
import { Navigate, useNavigate } from 'react-router-dom';

export default function PhoneInputPage() {
  const [phone, setPhone] = useState('');
  const [touched, setTouched] = useState(false);
  const navigate = useNavigate() ;

  const validatePhone = (value) => {
    const num = value.replace(/[\s\-.()]/g, '');
    return /^([1-9][0-9]{7,11})$/.test(num); // tidak boleh diawali 0 :contentReference[oaicite:1]{index=1}
  };

  const isValid = validatePhone(phone);

  const handleChange = e => {
    setPhone(e.target.value);
    if (!touched) setTouched(true);
  };

  

  const handleSubmit = e => {
    e.preventDefault();
    setTouched(true);
    if (!isValid) return;
    console.log('Nomor HP disimpan:', phone);
    console.log('nama :', name)
    navigate('/email') ;

    // proses selanjutnya
  };

  return (
    <div className="vh-100 d-flex flex-column bg-light font-poppins">
      <div className="p-3">
        <img src={logo} alt="logo wondr" style={{ width: '130px' }} />
      </div>
      <div className="flex-grow-1 d-flex align-items-center justify-content-center">
        <Container className="p-4 rounded-5 shadow bg-white">
          <Row className="align-items-center">
            <Col md={6} className="d-none d-md-flex justify-content-center align-items-center">
              <img src={phoneIcon} alt="Phone Icon" className="img-fluid" style={{ maxWidth: '80%', height: '500px' }} />
            </Col>
            <Col md={6} className="d-flex flex-column justify-content-between">
              <div>
                <h2 className="mb-3 fw-bold text-dark">Isi Nomor Hp Kamu</h2>
                <p className="text-muted mb-4">Pastikan nomornya aktif ya!</p>

                <Form noValidate onSubmit={handleSubmit} className="has-validation">
                  <Form.Group controlId="phone">
                    <Form.Label className="fw-semibold">Nomor HP</Form.Label>
                    <div className="input-group">
                      <div className="d-flex align-items-center ps-3 border-end">
                        <img src={indonesiaFlag} alt="ID Flag" style={{ width: '24px', marginRight: '6px' }} />
                        <span className="pe-3">+62</span>
                      </div>
                      <Form.Control
                        type="tel"
                        placeholder="81234567890"
                        value={phone}
                        onChange={handleChange}
                        isInvalid={touched && !isValid}
                        isValid={touched && isValid}
                        className="px-3 py-2"
                        required
                        aria-describedby="phoneFeedback"
                      />
                    </div>

                    {/* invalid-feedback diletakkan di luar input-group sesuai panduan validasi :contentReference[oaicite:2]{index=2} */}
                    {touched && !isValid && (
                      <div id="phoneFeedback" className="invalid-feedback d-block mt-1">
                        Format no handphone tidak valid
                      </div>
                    )}
                  </Form.Group>

                  <div className="text-center mt-4">
                    <Button type="submit" variant="info" className="text-white px-5 py-2 rounded-pill fw-bold">
                      Lanjutkan
                    </Button>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
