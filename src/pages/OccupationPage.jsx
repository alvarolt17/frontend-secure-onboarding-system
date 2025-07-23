import React, { useState, useEffect } from 'react'; // Import useEffect
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useFormData } from '../context/formContext';
import { useRegister } from '../context/RegisterContext'; // Import useRegister
import logo from '../assets/wondr-logo.png';
import gearsImg from '../assets/Pekerjaan.png';

export default function OccupationSelectPage() {
  const [occupation, setOccupation] = useState('');
  const navigate = useNavigate();
  const { updateForm } = useFormData();
  const { completeStep, checkAndRedirect } = useRegister();

  // Effect to check access
  useEffect(() => {
    // Call checkAndRedirect when the component mounts
    // This will redirect back if prerequisites are not met
    if (!checkAndRedirect('/pekerjaan')) { // Ensure the path matches the pathMap in RegisterContext
      return;
    }
    // If no redirect, you can load data from formContext if available
    // For example, if the user returns to this page from the browser's back button
    // const storedData = // Get data from formContext.data if available
    // if (storedData.pekerjaan) {
    //   setOccupation(storedData.pekerjaan);
    // }
  }, [checkAndRedirect]);

  const occupations = [
    'Pegawai Negeri', 'Pegawai Swasta', 'Pegawai BUMN/BUMD', 'TNI/POLRI',
    'Pengusaha', 'Pedagang', 'Petani/Nelayan', 'Pelajar/Mahasiswa',
    'Ibu Rumah Tangga', 'Tidak Bekerja', 'Karyawan/Karyawati',
    'Wiraswasta', 'Pejabat Negara', 'Akuntan', 'Pengacara/Notaris',
    'Profesi', 'Pensiunan', 'Dosen/Guru Swasta', 'Dosen/Guru Negeri',
    'Dokter', 'Pegawai BNI', 'Unit Afiliasi BNI', 'Tenaga Kerja Indonesia',
    'Lain-lain'
  ];

  // --- DEBUGGING LOGS ---
  useEffect(() => {
    console.log('OccupationPage State Update:');
    console.log('  occupation (selected):', occupation);
    console.log('  Is button disabled:', !occupation);
  }, [occupation]);
  // --- END DEBUGGING LOGS ---

  const handleSubmit = async e => { // Make async if delay or async operations are needed
    e.preventDefault();
    console.log('handleSubmit called in OccupationPage. Selected occupation:', occupation);
    if (!occupation) {
      console.log('No occupation selected, stopping submission.');
      // Optional: display an error message to the user in the UI
      return;
    }

    updateForm({ pekerjaan: occupation });
    console.log('Pekerjaan updated in formContext.');

    completeStep('occupationDone');
    console.log('occupationDone marked as complete in RegisterContext.');

    // Give a small delay for context state to update in sessionStorage
    // await new Promise(resolve => setTimeout(resolve, 50)); // Try adding a small delay if timing issues persist

    const specialRoutes = ['Ibu Rumah Tangga', 'Pelajar/Mahasiswa', 'Tidak Bekerja'];
    if (specialRoutes.includes(occupation)) {
      console.log('Navigating to /wali...');
      navigate('/wali'); // Navigate to /wali for these specific occupations
    } else {
      console.log('Navigating to /penghasilan...');
      navigate('/penghasilan'); // Navigate to /penghasilan for all other occupations
    }
  };

  return (
    <div className="d-flex flex-column bg-white" style={{ minHeight: '100vh' }}>
      <div className="p-3 ps-4">
        <img
          src={logo}
          alt="Wondr Logo"
          style={{ width: '130px', cursor: 'pointer' }}
          onClick={() => navigate('/')}
        />
      </div>

      <div className="flex-grow-1 d-flex align-items-center justify-content-center p-3">
        <Container className="p-4 bg-white rounded-4 shadow">
          <Row className="align-items-center">
            <Col md={6}>
              <h2 className="fw-bold text-dark mb-3">Apa Pekerjaan Kamu Saat Ini?</h2>
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
