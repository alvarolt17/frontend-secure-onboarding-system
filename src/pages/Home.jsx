// src/pages/Home.jsx
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Navbar, Nav } from 'react-bootstrap';
import { FaGooglePlay, FaApple } from 'react-icons/fa';
import logo from '../assets/wondr.png';
import background from '../assets/LandingPageNew.png';
import './Home.css';


export default function Home() {
  const [expanded, setExpanded] = useState(false);
  const openExternal = url => window.open(url, '_blank', 'noopener,noreferrer');

  return (
    <div
      className="landing-page d-flex flex-column"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Navbar fixed di atas */}
      <Navbar
        expand="md"
        fixed="top"
        expanded={expanded}
        onToggle={setExpanded}
        className="px-3 px-md-5 bg-transparent"
        role="navigation"
      >
        <Navbar.Brand as="div">
          <img src={logo} alt="Wondr Logo" style={{ width: 150 }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto fw-semibold text-white">
            <Nav.Link className="text-white"  onClick={() => openExternal('https://wondr.bni.co.id')}>Home</Nav.Link>
            <Nav.Link className="text-white" onClick={() => openExternal('https://bni.co.id/en-us/personal/savings')}>Product &amp; Services</Nav.Link>
            <Nav.Link className="text-white" onClick={() => openExternal('https://www.bni.co.id/id-id/perseroan/tentang-bni')}>Information</Nav.Link>
            <Nav.Link className="text-white" onClick={() => openExternal('https://wondr.bni.co.id/faq')}>FAQ</Nav.Link>
            <Nav.Link className="text-white" href="/login" onClick={() => setExpanded(false)}>Login</Nav.Link>
            <Nav.Link className="text-white" href="/terms" onClick={() => setExpanded(false)}>SignUp</Nav.Link>
            
            {/* {['Home', 'Product & Services', 'Information', 'FAQ', 'Login'].map(label => (
              <Nav.Link
                key={label}
                href={`#${label.toLowerCase().replace(/ & /g, '_').replace(/\s+/g, '-')}`}
                onClick={() => setExpanded(false)}
                className="text-white"
              >
                {label}
              </Nav.Link>
            ))}
            <Nav.Link
              role="button"
              className="text-white"
              onClick={() => { setExpanded(false); handleRegister(); }}
            >
              Sign Up
            </Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Spacer untuk meng-offset navbar */}
      <div className="nav-spacer" />

      {/* Konten utama */}
      <Container
        fluid
        className="text-center text-white flex-grow-1 d-flex flex-column justify-content-center px-3 pb-5"
      >
        <h1 className="title text-white">Wondr Desktop</h1>
        <p className="mb-4">
          Buat transaksi, dapatkan insight keuangan, dan kembangkan investasi dalam satu aplikasi. Download sekarang.
        </p>
        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <Button variant="outline-light" className="btn-download"
            onClick={() => openExternal('https://play.google.com')}
          >
            <FaGooglePlay className="me-2" /> Google Play
          </Button>
          <Button variant="outline-light" className="btn-download"
            onClick={() => openExternal('https://apple.com/app-store')}
          >
            <FaApple className="me-2" /> App Store
          </Button>
        </div>
      </Container>
    </div>
  );
}
