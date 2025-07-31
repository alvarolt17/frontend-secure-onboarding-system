import React, { useEffect } from 'react'; // Import useEffect
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useFormData } from '../context/formContext';
import { useRegister } from '../context/RegisterContext'; // Import useRegister
import './JenisTabunganPage.css';
import logo from '../assets/wondr-logo.png';
import saldoIcon from '../assets/saldo-awal.png';
import adminIcon from '../assets/biaya-admin.png';
import kartuIcon from '../assets/KD.png';
import dendaIcon from '../assets/denda.png';
import bukuTabunganIcon from '../assets/BuTab.png';
import umurIcon from '../assets/umur.png';
import background from '../assets/background.png';

export default function JenisTabunganPage() {
  const navigate = useNavigate();
  const { updateForm } = useFormData();
  const { completeStep, checkAndRedirect } = useRegister(); // Ambil dari context

  // Efek untuk memeriksa akses
  useEffect(() => {
    if (!checkAndRedirect('/tabungan')) {
      return;
    }
  }, [checkAndRedirect]);

  const tabunganList = [
    {
      key: 'taplus_muda',
      title: 'BNI Taplus Muda',
      description: 'Inspirasi bagi generasi muda.',
      details: [
        { label: 'Saldo minimum', value: 'Rp 100.000', icon: saldoIcon },
        { label: 'Biaya admin', value: 'Rp 5.000 / bulan', icon: adminIcon },
        { label: 'Kartu Debit', value: '1 pilihan', icon: kartuIcon },
        { label: 'Buku Tabungan', value: 'Tidak tersedia', icon: bukuTabunganIcon },
        { label: 'Umur Nasabah', value: '17–35 tahun', icon: umurIcon },
        { label: 'Denda', value: 'Rp 5.000', icon: dendaIcon },
      ]
    },
    {
      key: 'taplus',
      title: 'BNI Taplus',
      description: 'Aman untuk transaksi harian.',
      details: [
        { label: 'Saldo minimum', value: 'Rp 150.000', icon: saldoIcon },
        { label: 'Biaya admin', value: 'Rp 11.000 / bulan', icon: adminIcon },
        { label: 'Kartu Debit', value: '5 pilihan', icon: kartuIcon },
        { label: 'Buku Tabungan', value: 'Tersedia', icon: bukuTabunganIcon },
        { label: 'Umur Nasabah', value: '≥ 17 tahun', icon: umurIcon },
        { label: 'Denda', value: 'Rp 5.000', icon: dendaIcon },
      ]
    }
  ];

 const handleChoose = (title, key) => {
  if (!title || !key) return;
  updateForm({ tipeAkun: title });
  completeStep('tabunganSelected'); // Tandai tabunganSelected selesai

  if (title === 'BNI Taplus Muda') {
    navigate('/personalData');
  } else {
    navigate('/JenisKartuPage');
  }
};


  return (
    <div className="jenis-tabungan-page d-flex flex-column min-vh-100 bg-light">
      <div className="background-wrapper d-flex flex-column flex-grow-1" style={{
        background: `url(${background}) center/cover no-repeat`
      }}>
        <header className="px-4 pt-3">
          <img
            src={logo}
            alt="Wondr Logo"
            className="logo-img"
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
          />
        </header>

        <main className="flex-grow-1 d-flex flex-column justify-content-center align-items-center px-3">
          <h2 className="fw-bold text-center mb-5">Pilih Jenis Tabungan</h2>
          <Container>
            <Row className="justify-content-center g-4">
              {tabunganList.map(({ key, title, description, details }) => (
                <Col key={key} md={6} lg={5}>
                  <div className="card-tabungan p-4 rounded-4 shadow bg-white h-100 d-flex flex-column">
                    <h3 className="fw-bold text-center">{title}</h3>
                    <p className="text-muted text-center mb-4 small">{description}</p>
                    <div className="flex-grow-1">
                      {details.map(({ label, value, icon }, i) => (
                        <Row key={i} className="align-items-center mb-3">
                          <Col xs={2} className="text-center">
                            <img src={icon} alt={label} className="icon-img" />
                          </Col>
                          <Col>
                            <strong>{label}</strong><br />
                            {value}
                          </Col>
                        </Row>
                      ))}
                    </div>
                    <Button
                      variant="warning"
                      className="w-100 rounded-pill fw-bold py-2 mt-auto"
                      onClick={() => handleChoose(title, key)}
                    >
                      Pilih
                    </Button>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </main>
      </div>
    </div>
  );
}