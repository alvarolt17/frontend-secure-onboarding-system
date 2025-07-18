import styles from './Dashboard.module.css';

import React, { useState } from 'react';
import wondr from '../assets/wondr.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import cat from '../assets/cat.jpg';
import { Navbar, Nav } from 'react-bootstrap';

const Dashboard = () => {
    const [expanded, setExpanded] = useState(false);
    
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
                                <Nav.Link href="#faq" className="text-white" onClick={() => setExpanded(false)}>Log out</Nav.Link>
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