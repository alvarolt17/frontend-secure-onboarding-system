import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Navbar, Nav } from 'react-bootstrap';
import { FaGooglePlay, FaApple } from 'react-icons/fa';
import logo from '../assets/wondr.png';
import background from '../assets/LandingPageNew.png'; // gambar background
import './Home.css';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/terms');
  };

  return (
    <div
      className="landing-page d-flex flex-column"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      {/* Navbar */}
      <Navbar
        expand="md"
        expanded={expanded}
        onToggle={() => setExpanded(!expanded)}
        className="px-3 px-md-5 bg-transparent"
      >
        <Navbar.Brand href="#">
          <img src={logo} alt="Wondr Logo" style={{ width: '150px' }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto fw-semibold text-white">
            <Nav.Link className="text-white" href="#home" onClick={() => setExpanded(false)}>Home</Nav.Link>
            <Nav.Link className="text-white" href="#products" onClick={() => setExpanded(false)}>Product &amp; Services</Nav.Link>
            <Nav.Link className="text-white" href="#info" onClick={() => setExpanded(false)}>Information</Nav.Link>
            <Nav.Link className="text-white" href="#faq" onClick={() => setExpanded(false)}>FAQ</Nav.Link>
            <Nav.Link className="text-white" href="#" onClick={() => setExpanded(false)}>Login</Nav.Link>
            <Nav.Link className="text-white" href="/terms" onClick={() => setExpanded(false)}>SignUp</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Konten utama */}
      <Container
        fluid
        className="text-center text-white flex-grow-1 mt-4"

      >
        <h1 className='title text-white'>Wondr Dekstop</h1>
        <p className='mb-4'>Buat transaksi, dapatkan insight keuangan, dan kembangkan investasi dalam satu aplikasi. Download sekarang.</p>
          <div className="d-flex justify-content-center gap-5">
          <Button variant="outline-light" className="btn-download">
            <FaGooglePlay className="me-2" />
            Download di Google Store
          </Button>
          <Button variant="outline-light" className="btn-download">
            <FaApple className="me-2" />
            Download di App Store
          </Button>
        </div>
        
        
      </Container>

    
    </div>
  );
}
