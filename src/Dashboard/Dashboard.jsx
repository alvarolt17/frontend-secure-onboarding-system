import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';
import wondr from '../assets/wondr.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import cat from '../assets/cat.jpg'; // Gambar profil default
import { Navbar, Nav } from 'react-bootstrap';
import axios from 'axios'; // Pastikan axios sudah terinstal (npm install axios atau yarn add axios)

const Dashboard = () => {
    const [expanded, setExpanded] = useState(false);
    // State untuk menyimpan nama dan jabatan profil yang akan diambil dari backend
    const [profileName, setProfileName] = useState('Loading...');
    const [profileTitle, setProfileTitle] = useState('Nasabah'); // Set ini secara dinamis jika backend menyediakan

    const navigate = useNavigate();

    // Fungsi untuk menangani logout
    const handleLogout = () => {
        localStorage.removeItem('token'); // Hapus token dari localStorage
        console.log('Token JWT berhasil dihapus dari localStorage. Mengarahkan ke halaman login.');
        navigate('/login'); // Arahkan pengguna ke halaman login
    };

    // Efek untuk memeriksa token dan mengambil data profil saat komponen dimuat
    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            console.log('Tidak ada token JWT ditemukan di localStorage. Mengarahkan ke halaman login.');
            navigate('/login'); // Arahkan pengguna ke halaman login jika tidak ada token
        } else {
            // Fungsi asynchronous untuk mengambil data profil dari backend
            const fetchUserProfile = async () => {
                try {
                    // Pastikan VITE_BACKEND_BASE_URL diatur di file .env Anda
                    // Contoh: VITE_BACKEND_BASE_URL=http://localhost:8080
                    const baseURL = import.meta.env.VITE_BACKEND_BASE_URL;

                    // Melakukan permintaan GET ke endpoint profil yang benar di backend
                    // URL sekarang adalah /auth/profile, bukan /api/user-profile
                    console.log('Mengambil data profil dari:', `${baseURL}/api/auth/profile`);      // debugging log
                    const response = await axios.get(`${baseURL}/api/auth/profile`, {
                        headers: {
                            Authorization: `Bearer ${token}`, // Sertakan token di header Authorization
                        },
                        withCredentials: true, // Penting untuk mengirim cookie/sesi jika menggunakan HttpOnly cookie
                    });
                    console.log('token:',token);

                    // Pastikan respons dan struktur datanya sesuai dengan yang dikembalikan backend Anda
                    // Backend Anda mengembalikan objek dengan kunci "profile" yang berisi data customer
                    if (response.data && response.data.profile) {
                        setProfileName(response.data.profile.namaLengkap || 'Nama Pengguna');
                        // Jika backend Anda menyediakan 'jabatan' atau 'title' di objek customer,
                        // Anda bisa mengaturnya di sini:
                        // setProfileTitle(response.data.profile.jabatan || 'Jabatan Default');
                    } else {
                        console.warn('Data profil tidak ditemukan dalam respons:', response.data);
                        setProfileName('Nama Pengguna'); // Fallback jika data tidak sesuai
                    }
                } catch (error) {
                    console.error('Gagal mengambil data profil:', error);
                    // Tangani kasus token tidak valid (401) atau akses ditolak (403)
                    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                        localStorage.removeItem('token'); // Hapus token kadaluarsa/tidak valid
                        console.log('Token tidak valid atau kadaluarsa. Mengarahkan ke halaman login.');
                        navigate('/login'); // Arahkan pengguna kembali ke halaman login
                    }
                    setProfileName('Error'); // Tampilkan pesan error jika terjadi kegagalan lain
                    setProfileTitle('Gagal Memuat');
                }
            };
            fetchUserProfile(); // Panggil fungsi untuk mengambil data profil
        }
    }, [navigate]); // navigate ditambahkan ke dependency array untuk useEffect

    return(
        <div className={styles.container}>

            <header className={styles.header}>
                <div className={styles.headerLeft}>

                    <Navbar
                        expand="md"
                        expanded={expanded}
                        onToggle={() => setExpanded(!expanded)}
                        className="bg-transparent w-100"
                        variant="light"
                    >
                        <Navbar.Brand href="#">
                            <img src={wondr} alt="Wondr Logo" className={styles.headerIcon} />
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbar-nav" />
                        <Navbar.Collapse id="navbar-nav">
                            <Nav className="ms-auto fw-semibold">
                                <Nav.Link href="#home" className="text-white" onClick={() => setExpanded(false)}>Home</Nav.Link>
                                <Nav.Link href="#products" className="text-white" onClick={() => setExpanded(false)}>Product & Services</Nav.Link>
                                <Nav.Link href="#info" className="text-white" onClick={() => setExpanded(false)}>Information</Nav.Link>
                                <Nav.Link href="#faq" className="text-white" onClick={() => setExpanded(false)}>FAQ</Nav.Link>
                                {/* Tambahkan onClick handler ke Nav.Link "Log out" */}
                                <Nav.Link href="#" className="text-white" onClick={handleLogout}>Log out</Nav.Link>
                            </Nav>
                            <Nav>
                                <div className={styles.profileContainer}>
                                    <img src={cat} alt="Profile" className={styles.profileImage} />
                                    <div className={styles.profileText}>
                                        {/* Gunakan state profileName yang diambil dari backend */}
                                        <span className={styles.profileName}>{profileName}</span>
                                        {/* Gunakan state profileTitle */}
                                        <span className={styles.profileTitle}>{profileTitle}</span>
                                    </div>
                                </div>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
            </header>

            <main className={styles.mainContent}>
                 <h1>#JadiinMaumuHariIni</h1>
                 <h5>Ayo Kelola Keuanganmu Sekarang dengan Wondr Versi Dekstop</h5>

                 <div className={styles.bar}>
                    <p>Insight</p>
                    <p>Lifestyle</p>
                    <p>Growth</p>
                 </div>
            </main>
        </div>
    );
};

export default Dashboard;