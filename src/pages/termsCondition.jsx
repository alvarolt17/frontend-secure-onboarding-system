import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import termsText from '../components/termsContent.jsx';
import logo from '../assets/police.png';
import wondr from '../assets/wondr-logo.png';
import styles from './termsConditions.module.css';

const TermsCondition = () => {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const lanjut = (e) => {
    e.preventDefault();
    navigate('/undang');
  };

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
          <img src={logo} alt="Ilustrasi" className={styles.imgLarge} />
        </div>
        <div className={styles.contentWrapper}>
          <h1>Terms and Conditions</h1>
          <div className={styles.kontenTeks}>
            {termsText.content}
          </div>
          <div className={styles.checkboxLabel}>
            <label>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
              Saya sudah memahami dan menyetujui syarat dan ketentuan di atas
            </label>
          </div>
          <div>
            <button
              onClick={lanjut}
              disabled={!isChecked}
              className={isChecked ? styles.button : styles.buttonDisabled}
            >
              Lanjutkan
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TermsCondition;
