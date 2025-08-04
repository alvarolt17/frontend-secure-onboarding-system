import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import logo from '../assets/UU PDP.png';
import wondr from '../assets/wondr-logo.png';
import styles from './undang.module.css';
import { useNavigate } from 'react-router-dom';
import filepdf from '../components/undang.pdf';
import { useRegister } from '../context/RegisterContext';

const Undang = () => {
  const navigate = useNavigate();
  const { completeStep, checkAndRedirect } = useRegister();
  const [isChecked, setIsChecked] = useState({
    agreePromoInternal: false,
    agreePromoEksternal: false,
  });

  useEffect(() => {
    if (!checkAndRedirect('/undang')) return;
  }, [checkAndRedirect]);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setIsChecked(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    completeStep('undangAccepted');
    console.log('Data Checkbox (optional):', isChecked);
    navigate('/name');
  };

  return (
    <div className={styles.page}>
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <img
  src={wondr}
  alt="Wondr Logo"
  className={styles.headerIcon}
  onClick={() => navigate('/')}
  style={{ cursor: 'pointer' }} // opsional agar terlihat interaktif
/>

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
              src={filepdf}
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
              label={
                <span className={styles.checkboxLabel}>
                  Saya bersedia menerima promosi/info/penawaran produk/layanan BNI lainnya melalui sarana komunikasi pribadi Saya (telepon/SMS/email/aplikasi chat).
                </span>
              }
              name="agreePromoInternal"
              onChange={handleCheckboxChange}
              checked={isChecked.agreePromoInternal}
              className="mb-3"
            />
            <Form.Check
              type="checkbox"
              id="checkbox-eksternal"
              label={
                <span className={styles.checkboxLabel}>
                  Saya bersedia menerima promosi/info/penawaran dari Grup BNI dan/atau Mitra melalui sarana komunikasi pribadi dan mengizinkan BNI memberikan Data Pribadi saya untuk itu.
                </span>
              }
              name="agreePromoEksternal"
              onChange={handleCheckboxChange}
              checked={isChecked.agreePromoEksternal}
              className="mb-4"
            />

            {/* Tombol submit ditaruh di tengah */}
            <div className={styles.centerButton}>
              <button type="submit" className={styles.button}>
                Lanjutkan
              </button>
            </div>
          </Form>
        </div>
      </main>
    </div>
  );
};

export default Undang;
