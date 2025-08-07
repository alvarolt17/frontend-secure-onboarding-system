// src/pages/TujuanPembukaanRekening.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup, Button, Alert } from 'react-bootstrap';
import logo from '../assets/wondr-logo.png';
import characterImg from '../assets/pembukaan-rekening.png';
import { useFormData } from '../context/formContext';
import { useNavigate } from 'react-router-dom';
import { useRegister } from '../context/RegisterContext';

export default function TujuanPembukaanRekening() {
  const [selected, setSelected] = useState('');
  const [loading, setLoading] = useState(false); // State untuk loading saat menyimpan
  const [error, setError] = useState(null); // State untuk error saat menyimpan
  const options = ['Investasi', 'Tabungan', 'Transaksi'];

  const { updateForm, data } = useFormData();
  const navigate = useNavigate();
  const { completeStep, checkAndRedirect } = useRegister();

  // Efek untuk memeriksa akses
  useEffect(() => {
    if (!checkAndRedirect('/tujuanPembukaanRekening')) {
      return;
    }
  }, [checkAndRedirect]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!selected) {
      setError("Mohon pilih tujuan pembukaan rekening.");
      setLoading(false);
      return;
    }

    // Perbarui formContext dengan tujuan yang dipilih
    updateForm({ tujuanPembuatanRekening: selected });

    // Bangun payload sesuai struktur yang diharapkan backend Anda
    const payload = {
      namaLengkap: data.namaLengkap || '',
      nik: data.nik || '',
      namaIbuKandung: data.namaIbuKandung || '',
      // Pastikan nomor telepon diawali '0' untuk backend jika diperlukan
      nomorTelepon: data.nomorTelepon.startsWith('0') ? data.nomorTelepon : '0' + data.nomorTelepon,
      email: data.email || '',
      password: data.password || '',
      tipeAkun: data.tipeAkun || '', // Ini adalah jenis tabungan dari JenisTabunganPage
      tempatLahir: data.tempatLahir || '',
      tanggalLahir: data.tanggalLahir || '',
      jenisKelamin: data.jenisKelamin || '',
      jenisKartu: data.jenisKartu || '', // Ini adalah jenis kartu dari JenisKartuPage
      agama: data.agama || '',
      statusPernikahan: data.statusPernikahan || '',
      // ✅ Perbaiki struktur objek 'alamat'
      alamat: {
        namaAlamat: data.namaAlamat || '',
        provinsi: data.provinsi || '',
        kota: data.kota || '',
        kecamatan: data.kecamatan || '',
        kelurahan: data.kelurahan || '',
        kodePos: data.kodePos || ''
      },
      pekerjaan: data.pekerjaan || '',
      // ✅ Perbaiki struktur objek 'wali'
      wali: {
        jenisWali: data.jenisWali || '',
        namaLengkapWali: data.namaLengkapWali || '',
        pekerjaanWali: data.pekerjaanWali || '',
        alamatWali: data.alamatWali || '',
        // Pastikan nomor telepon wali juga diawali '0' jika diperlukan
        nomorTeleponWali: data.nomorTeleponWali?.startsWith('0')
          ? data.nomorTeleponWali
          : '0' + (data.nomorTeleponWali || '')
      },
      sumberPenghasilan: data.sumberPenghasilan || '',
      rentangGaji: data.rentangGaji || '',
      tujuanPembuatanRekening: selected,
      timestamp: new Date().toISOString(), // Tambahkan timestamp
    };

    console.log('Final Payload for Submission:', payload);

    try {
      // ✅ Gunakan base URL dari .env
      const baseURL = import.meta.env.VITE_BACKEND_BASE_URL; // Mendapatkan base URL dari .env
      if (!baseURL) {
        throw new Error("VITE_BACKEND_BASE_URL is not defined in .env");
      }

      // ✅ Pastikan URL API yang dipanggil sesuai dengan backend Anda
      const response = await fetch(`${baseURL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok) {
        // Jika respons tidak OK (misalnya status 4xx atau 5xx)
        console.error("Backend registration failed:", result);
        setError(result.message || 'Gagal melakukan registrasi.');
        return; // Hentikan eksekusi lebih lanjut
      }

      console.log('Pendaftaran berhasil:', result);
      // Data tidak perlu disimpan ke localStorage lagi, karena AccountConfirmation akan mengambil dari formContext

      completeStep('tujuanRekeningDone'); // Tandai langkah ini selesai setelah data berhasil disimpan di backend
      navigate('/summary'); // Arahkan ke halaman summary
    } catch (err) {
      console.error('Error saat pendaftaran:', err);
      setError('Terjadi kesalahan jaringan atau sistem. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="vh-100 d-flex flex-column bg-white">
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
              <h2 className="fw-bold">Apa tujuan kamu buka rekening?</h2>
              <p className="text-muted mb-4">Pilih tujuan kamu buka rekening BNI.</p>
              <ListGroup as="ul">
                {options.map((opt, idx) => (
                  <ListGroup.Item
                    as="li"
                    key={idx}
                    action
                    active={selected === opt}
                    onClick={() => setSelected(opt)}
                    className="mb-3 rounded-3"
                    style={{ border: '2px solid #f18b00', padding: '12px 20px', cursor: 'pointer' }}
                  >
                    {opt}
                  </ListGroup.Item>
                ))}
              </ListGroup>
              {error && <Alert variant="danger" className="mt-3">{error}</Alert>} {/* Tampilkan error */}
              <Button
                disabled={!selected || loading} // Nonaktifkan tombol saat loading atau belum memilih
                onClick={handleSubmit}
                className="mt-3"
                style={{
                  backgroundColor: '#2ce3dc',
                  color: 'black',
                  borderRadius: '30px',
                  fontWeight: 'bold',
                  width: '100%'
                }}
              >
                {loading ? 'Menyimpan...' : 'Lanjutkan'} {/* Teks loading */}
              </Button>
            </Col>
            <Col md={6} className="text-center d-none d-md-block">
              <img src={characterImg} alt="Character" className="img-fluid" style={{ maxHeight: '500px' }} />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
