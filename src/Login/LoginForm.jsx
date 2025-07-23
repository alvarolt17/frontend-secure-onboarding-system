import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './LoginForm.module.css';
import wondr from '../assets/wondr-logo.png';
import logo from '../assets/login-image.png';
import { sanitize } from '../utils/sanitize'; // ✅ Import sanitasi

export default function LoginForm() {

    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    const [submitting, setSubmitting] = useState(false);
    const [serverError, setServerError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Terapkan sanitasi hanya saat mengetik
        const sanitizedValue = sanitize(value);
        setLoginData({
            ...loginData,
            [name]: sanitizedValue,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError('');
        setSubmitting(true);

        try {
            const response = await axios.post(
                'https://ventures-designed-seas-hang.trycloudflare.com/api/auth/login',
                {
                    email: loginData.email,
                    password: loginData.password,
                },
                {
                    withCredentials: true,
                }
            );

            console.log('Login response:', response.data);

            const token = response.data.token || response.data.jwt || response.data.accessToken;
            if (token) {
                localStorage.setItem('token', token);
                console.log('Token JWT berhasil disimpan di localStorage.');
                console.log("token:", token);
            } else {
                console.warn('Login berhasil, tetapi token JWT tidak ditemukan dalam respons.');
            }

            navigate('/dashboard');

        } catch (error) {
            if (error.response && error.response.data) {
                setServerError(error.response.data.error || 'Login gagal');
            } else {
                setServerError('Terjadi kesalahan. Silakan coba lagi.');
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className={styles['container']}>
            <header className={styles.header}>
                <div className={styles.headerLeft}>
                    <img src={wondr} alt="Wondr Logo" className={styles.headerIcon} />
                </div>
            </header>

            <div className={styles['panel-container']}>
                <div className={styles['left-panel']}>
                    <div className={styles['left-panel-content']}>
                        <img src={logo} alt="Wondr Login" className={styles['left-panel-image']} />
                    </div>
                </div>

                <div className={styles['right-panel']}>
                    <div className={styles['login-form-header']}>
                        <h2 className={styles['login-form-title']}>Login</h2>
                        <p>Pastikan email dan password kamu benar ya!</p>
                    </div>

                    {serverError && <p className={styles['error-message']}>{serverError}</p>}

                    <form className={styles['login-form']} onSubmit={handleSubmit}>
                        <div className={styles['input-group']}>
                            <label htmlFor="email" className={styles['input-label']}>Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={loginData.email}
                                onChange={handleChange}
                                className={styles['input-field']}
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className={styles['input-group']}>
                            <label htmlFor="password" className={styles['input-label']}>Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={loginData.password}
                                onChange={handleChange}
                                className={styles['input-field']}
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <button type="submit" className={styles['submit-button']} disabled={submitting}>
                            {submitting ? 'Loading...' : 'Login'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
