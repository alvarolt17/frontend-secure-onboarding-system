// import styles from './Dashboard.module.css';

// import React, { useState } from 'react';
// import wondr from '../assets/wondr.png';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import cat from '../assets/cat.jpg';
// import { Navbar, Nav } from 'react-bootstrap';

// const Dashboard = () => {
//     const [expanded, setExpanded] = useState(false);
    
//     return(
//         <div className={styles.container}>
            
//             <header className={styles.header}>
//                 <div className={styles.headerLeft}>
                    
//                     <Navbar
//                         expand="md"
//                         expanded={expanded}
//                         onToggle={() => setExpanded(!expanded)}
//                         className="bg-transparent w-100" 
//                         variant="light" 
//                     >
//                         <Navbar.Brand href="#">
                           
//                             <img src={wondr} alt="Wondr Logo" className={styles.headerIcon} />
//                         </Navbar.Brand>
//                         <Navbar.Toggle aria-controls="navbar-nav" />
//                         <Navbar.Collapse id="navbar-nav">
//                             <Nav className="ms-auto fw-semibold">
                               
//                                 <Nav.Link href="#home" className="text-white" onClick={() => setExpanded(false)}>Home</Nav.Link>
//                                 <Nav.Link href="#products" className="text-white" onClick={() => setExpanded(false)}>Product & Services</Nav.Link>
//                                 <Nav.Link href="#info" className="text-white" onClick={() => setExpanded(false)}>Information</Nav.Link>
//                                 <Nav.Link href="#faq" className="text-white" onClick={() => setExpanded(false)}>FAQ</Nav.Link>
//                                 <Nav.Link href="#faq" className="text-white" onClick={() => setExpanded(false)}>Log out</Nav.Link>
//                             </Nav>
//                             <Nav>
//                                 <div className={styles.profileContainer}>
//                                     <img src={cat} alt="Profile" className={styles.profileImage} />
//                                     <div className={styles.profileText}>
//                                     <span className={styles.profileName}>Dwayne Tatum</span>
//                                     <span className={styles.profileTitle}>CEO Assistant</span>
//                                     </div>
//                                 </div>
//                             </Nav>
//                         </Navbar.Collapse>
//                     </Navbar>
//                 </div>
//             </header>

//             <main className={styles.mainContent}>
//                  <h1>#JadiinMaumuHariIni</h1>
//                  <h5>Ayo Kelola Keuanganmu Sekarang dengan Wondr Versi Dekstop</h5>

//                  <div className={styles.bar}>
//                     <p>Insight</p>
//                     <p>Lifestyle</p>
//                     <p>Growth</p>
//                  </div>
//             </main>
//         </div>
//     )
// }

// export default Dashboard;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate
// import styles from './Dashboard.module.css';
// import wondr from '../assets/wondr.png';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import cat from '../assets/cat.jpg';
// import { Navbar, Nav } from 'react-bootstrap';

// const Dashboard = () => {
//     const [expanded, setExpanded] = useState(false);
//     const navigate = useNavigate(); // Inisialisasi useNavigate

//     // Fungsi untuk menangani logout
//     const handleLogout = () => {
//         localStorage.removeItem('token'); // Hapus token dari localStorage
//         console.log('Token JWT berhasil dihapus dari localStorage. Mengarahkan ke halaman login.');
//         navigate('/login'); // Arahkan pengguna ke halaman login
//     };

//     return(
//         <div className={styles.container}>

//             <header className={styles.header}>
//                 <div className={styles.headerLeft}>

//                     <Navbar
//                         expand="md"
//                         expanded={expanded}
//                         onToggle={() => setExpanded(!expanded)}
//                         className="bg-transparent w-100"
//                         variant="light"
//                     >
//                         <Navbar.Brand href="#">
//                             <img src={wondr} alt="Wondr Logo" className={styles.headerIcon} />
//                         </Navbar.Brand>
//                         <Navbar.Toggle aria-controls="navbar-nav" />
//                         <Navbar.Collapse id="navbar-nav">
//                             <Nav className="ms-auto fw-semibold">
//                                 <Nav.Link href="#home" className="text-white" onClick={() => setExpanded(false)}>Home</Nav.Link>
//                                 <Nav.Link href="#products" className="text-white" onClick={() => setExpanded(false)}>Product & Services</Nav.Link>
//                                 <Nav.Link href="#info" className="text-white" onClick={() => setExpanded(false)}>Information</Nav.Link>
//                                 <Nav.Link href="#faq" className="text-white" onClick={() => setExpanded(false)}>FAQ</Nav.Link>
//                                 {/* Tambahkan onClick handler ke Nav.Link "Log out" */}
//                                 <Nav.Link href="#" className="text-white" onClick={handleLogout}>Log out</Nav.Link>
//                             </Nav>
//                             <Nav>
//                                 <div className={styles.profileContainer}>
//                                     <img src={cat} alt="Profile" className={styles.profileImage} />
//                                     <div className={styles.profileText}>
//                                     <span className={styles.profileName}>Dwayne Tatum</span>
//                                     <span className={styles.profileTitle}>CEO Assistant</span>
//                                     </div>
//                                 </div>
//                             </Nav>
//                         </Navbar.Collapse>
//                     </Navbar>
//                 </div>
//             </header>

//             <main className={styles.mainContent}>
//                  <h1>#JadiinMaumuHariIni</h1>
//                  <h5>Ayo Kelola Keuanganmu Sekarang dengan Wondr Versi Dekstop</h5>

//                  <div className={styles.bar}>
//                     <p>Insight</p>
//                     <p>Lifestyle</p>
//                     <p>Growth</p>
//                  </div>
//             </main>
//         </div>
//     )
// }

// export default Dashboard;


import React, { useState, useEffect } from 'react'; // Import useEffect
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';
import wondr from '../assets/wondr.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import cat from '../assets/cat.jpg';
import { Navbar, Nav } from 'react-bootstrap';

const Dashboard = () => {
    const [expanded, setExpanded] = useState(false);
    const navigate = useNavigate();

    // Fungsi untuk menangani logout
    const handleLogout = () => {
        localStorage.removeItem('token'); // Hapus token dari localStorage
        console.log('Token JWT berhasil dihapus dari localStorage. Mengarahkan ke halaman login.');
        navigate('/login'); // Arahkan pengguna ke halaman login
    };

    // Efek untuk memeriksa token saat komponen dimuat
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log('Tidak ada token JWT ditemukan di localStorage. Mengarahkan ke halaman login.');
            navigate('/login'); // Arahkan pengguna ke halaman login jika tidak ada token
        }
        // Anda bisa menambahkan logika untuk memanggil API yang dilindungi di sini
        // dan menangani kasus token tidak valid (misalnya, 401/403 dari backend)
        // dengan menghapus token dan mengarahkan kembali ke login.
    }, [navigate]); // navigate ditambahkan ke dependency array

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
                                    <span className={styles.profileName}>Dwayne Tatum</span>
                                    <span className={styles.profileTitle}>CEO Assistant</span>
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
    )
}

export default Dashboard;
