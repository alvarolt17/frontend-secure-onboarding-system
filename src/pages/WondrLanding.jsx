import React from 'react';
import { Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './WondrLanding.css';
import logo from '../assets/wondr-logo.png';
import globeImage from '../assets/globe.png'; // Sesuaikan path dengan struktur project-mu

export default function WondrLanding() {
  
  return (
    <div className="wondr-landing d-flex flex-column min-vh-100">
      {/* Header */}
      <header className="wondr-header p-3 px-4 d-flex align-items-center">
        <img src={logo} alt="Wondr Logo" className="wondr-logo" />
      </header>

      {/* Main Content */}
      <Container className="text-center flex-grow-1 d-flex flex-column justify-content-center align-items-center px-3">
        <h1 className="wondr-title fw-bold text-center">Jadiin maumu dengan wondr!</h1>
        <p className="wondr-subtitle mb-4">
          Selamat Berselancar di Wondr by BNI, nikmati segala fitur menarik yang akan membantu kamu meraih segalanya!!!
        </p>
        <Button className="wondr-login-button fw-bold px-4 py-2">Login!</Button>
      </Container>

      {/* Bottom Image */}
      <div className="wondr-globe-wrapper text-center mt-4">
        <img src={globeImage} alt="Globe" className="img-fluid wondr-globe" />
      </div>
    </div>
  );
}
