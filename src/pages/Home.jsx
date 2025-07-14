import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Navbar, Nav } from 'react-bootstrap';
import { FaGooglePlay, FaApple } from 'react-icons/fa';
import logo from '../assets/wondr.png';
import './Home.css';
import { Navigate, useNavigate } from 'react-router-dom';


export default function Home() {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate('') ;
  
    const handleRegister = () => {
    navigate('/name');  // ← navigate to /name
  };

  return (
    <div className="landing-page d-flex flex-column">
      {/* Navbar */}
      <Navbar
        expand="md"
        expanded={expanded}
        onToggle={() => setExpanded(!expanded)}
        className="px-3 px-md-5"
      >
        <Navbar.Brand href="#">
          <img src={logo} alt="Wondr Logo" style={{ width: '150px' }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto fw-semibold text-white">
            <Nav.Link className='text-white' href="#home" onClick={() => setExpanded(false)}>Home</Nav.Link>
            <Nav.Link className='text-white' href="#products" onClick={() => setExpanded(false)}>Product & Services</Nav.Link>
            <Nav.Link className='text-white' href="#info" onClick={() => setExpanded(false)}>Information</Nav.Link>
            <Nav.Link className='text-white' href="#faq" onClick={() => setExpanded(false)}>FAQ</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Konten utama dengan Flexbox */}
      <Container
        fluid
        className="text-center text-white flex-grow-1 d-flex flex-column justify-content-center content-area"
      >
        <h1 className="hero-tittle">Wondr</h1>
        <h1 className="hero-tittle2">Desktop</h1>
      </Container>

      {/* Footer dengan tombol */}
      <footer className="footer-btns py-4 text-center">
        <div className="d-flex justify-content-around flex-wrap gap-2 mx-auto buttons-container">
          <Button variant="outline-light" className="btn-download">
            <FaGooglePlay className="me-2" />
            Download di Google Store
          </Button>
          <Button variant="light" className="btn-register fw-bold" onClick={handleRegister}>
            REGISTRATION NOW
          </Button>
          <Button variant="outline-light" className="btn-download">
            <FaApple className="me-2" />
            Download di App Store
          </Button>
        </div>
      </footer>
    </div>
  );
}
