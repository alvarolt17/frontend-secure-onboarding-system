import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useFormData } from '../context/formContext';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/wondr-logo.png';
import characterImg from '../assets/businessman.png';
import { sanitize } from '../utils/sanitize';
import { personalDataSchema } from '../utils/validation';
import { useFormik } from 'formik';

export default function PersonalDataForm() {
  const { updateForm } = useFormData();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      birthPlace: '',
      gender: '',
      religion: '',
      maritalStatus: '',
    },
    validationSchema: personalDataSchema,
    onSubmit: values => {
      updateForm({
        tempatLahir: sanitize(values.birthPlace),
        jenisKelamin: values.gender,
        agama: values.religion,
        statusPernikahan: values.maritalStatus,
      });
      navigate('/namaIbu');
    }
  });

  const fieldList = [
    { label: 'Tempat Lahir', name: 'birthPlace', type: 'text' },
    { label: 'Jenis Kelamin', name: 'gender', type: 'select', options: ['Laki-laki','Perempuan'] },
    { label: 'Agama', name: 'religion', type: 'select', options: ['Islam','Kristen','Katolik','Hindu','Buddha','Konghucu'] },
    { label: 'Status Perkawinan', name: 'maritalStatus', type: 'select', options: ['Lajang','Menikah','Cerai'] }
  ];

  return (
    <div className="vh-100 d-flex flex-column bg-white">
      <header className="p-3 ps-4">
        <img
          src={logo}
          alt="Wondr Logo"
          width={130}
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }}
        />
      </header>
      <main className="flex-grow-1 d-flex align-items-center justify-content-center">
        <Container className="p-4 rounded-5 shadow bg-light mx-2">
          <Row className="align-items-center">
            <Col md={6}>
              <h2 className="fw-bold text-brand">Data Personal</h2>
              <p className="text-muted mb-4">Pastikan sesuai e‑KTP 😉</p>
              <Form onSubmit={formik.handleSubmit} noValidate>
                {fieldList.map(f => (
                  <Form.Group className="mb-3" key={f.name}>
                    <Form.Label className="fw-semibold small">{f.label}</Form.Label>
                    {f.type === 'text' ? (
                      <Form.Control
                        name={f.name}
                        type="text"
                        value={formik.values[f.name]}
                        onChange={e =>
                          formik.setFieldValue(f.name, sanitize(e.target.value))
                        }
                        isInvalid={
                          formik.touched[f.name] && !!formik.errors[f.name]
                        }
                        placeholder={f.label}
                        maxLength={50}
                        className="border-brand rounded-3"
                      />
                    ) : (
                      <Form.Select
                        name={f.name}
                        value={formik.values[f.name]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={
                          formik.touched[f.name] && !!formik.errors[f.name]
                        }
                        className="border-brand rounded-3"
                      >
                        <option value="">-- Pilih --</option>
                        {f.options.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </Form.Select>
                    )}
                    <Form.Control.Feedback type="invalid">
                      {formik.errors[f.name]}
                    </Form.Control.Feedback>
                  </Form.Group>
                ))}
                <Button
                  type="submit"
                  disabled={!formik.isValid}
                  className="btn-wondr rounded-pill fw-bold w-100 py-2"
                >
                  Lanjutkan
                </Button>
              </Form>
            </Col>
            <Col md={6} className="d-none d-md-flex justify-content-center">
              <img
                src={characterImg}
                alt="Character"
                className="img-fluid"
                style={{ maxHeight: '500px' }}
              />
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}
