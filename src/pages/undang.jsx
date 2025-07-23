import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
// import termsText from '../components/termsContent.jsx'; // Tidak digunakan
import logo from '../assets/UU PDP.png';
import wondr from '../assets/wondr-logo.png';
import styles from './undang.module.css';
import { useNavigate } from 'react-router-dom';
import filepdf from '../components/undang.pdf'
import { useRegister } from '../context/RegisterContext'; // Import useRegister

const Undang = () => {
  const navigate = useNavigate();
  const { completeStep, checkAndRedirect } = useRegister(); // Ambil dari context
  const [isChecked, setIsChecked] = useState({
    agreePromoInternal: false,
    agreePromoEksternal: false,
  });

  // Efek untuk memeriksa akses
  useEffect(() => {
    // Panggil checkAndRedirect dengan path saat ini
    if (!checkAndRedirect('/undang')) {
      // Jika checkAndRedirect mengembalikan false, itu berarti sudah di-redirect
      return;
    }
  }, [checkAndRedirect]); // Jalankan setiap kali checkAndRedirect berubah (termasuk saat komponen dimuat)

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setIsChecked(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isChecked.agreePromoInternal && isChecked.agreePromoEksternal) {
      completeStep('undangAccepted'); // Tandai undangAccepted selesai
      console.log('Data Checkbox:', isChecked);
      navigate('/name');
    } else {
      // Opsional: tampilkan pesan error jika checkbox belum dicentang semua
      alert('Anda harus menyetujui kedua persyaratan untuk melanjutkan.');
    }
  };

  const isButtonEnabled = isChecked.agreePromoInternal && isChecked.agreePromoEksternal;

  return (
    <div className={styles.page}>
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <img src={wondr} alt="Wondr Logo" className={styles.headerIcon} />
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className={styles.container}>
        <div className={styles.imageWrapper}>
          <img src={logo} alt="Ilustrasi Buku Hukum" className={styles.bukuLarge} />
        </div>
        <div className={styles.contentWrapper}>
          <h1>Undang‑Undang Perlindungan Data Pribadi</h1>
          <div className={styles.kontenTeks}>
            <iframe
            src={filepdf} // Path ke file di folder public
            width="100%"
            height="100%"
            title="Dokumen UU PDP"
            style={{ border: 'none' }}
          ></iframe>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Check
              type="checkbox"
              id="checkbox-internal"
              label={<span className={styles.checkboxLabel}>Saya bersedia menerima promosi/info/penawaran produk/layanan BNI lainnya melalui sarana komunikasi pribadi Saya (telepon/SMS/email/aplikasi chat).</span>}
              name="agreePromoInternal"
              onChange={handleCheckboxChange}
              checked={isChecked.agreePromoInternal}
              className="mb-3"
            />
            <Form.Check
              type="checkbox"
              id="checkbox-eksternal"
              label={<span className={styles.checkboxLabel}>Saya bersedia menerima promosi/info/penawaran dari Grup BNI dan/atau Mitra melalui sarana komunikasi pribadi dan mengizinkan BNI memberikan Data Pribadi saya untuk itu.</span>}
              name="agreePromoEksternal"
              onChange={handleCheckboxChange}
              checked={isChecked.agreePromoEksternal}
              className="mb-4"
            />
            <button
              type="submit"
              className={isButtonEnabled ? styles.button : styles.buttonDisabled} // Pastikan tombol dinonaktifkan jika belum memenuhi syarat
              disabled={!isButtonEnabled}
            >
              Lanjutkan
            </button>
          </Form>
        </div>
      </main>
    </div>
  );
};

export default Undang;