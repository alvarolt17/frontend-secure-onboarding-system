import React, { useEffect } from 'react'; // Import useEffect
import Slider from 'react-slick';
import 'bootstrap/dist/css/bootstrap.min.css';
import './JenisKartuPage.css';
import { useFormData } from '../context/formContext';
import { useRegister } from '../context/RegisterContext'; // Import useRegister
import logo from '../assets/wondr-logo.png';
import silverCard from '../assets/kartuSilver.png';
import goldCard from '../assets/kartuGold.png';
import platinumCard from '../assets/kartuPlatinum.png';
import batikAirCard from '../assets/kartuBatik.png';
import gpnCard from '../assets/kartuGPN.png';
import { useNavigate } from 'react-router-dom';


export default function JenisKartuPage() {
  const { updateForm } = useFormData();
  const navigate = useNavigate();
  const { completeStep, checkAndRedirect } = useRegister(); // Ambil dari context

  // Efek untuk memeriksa akses
  useEffect(() => {
    if (!checkAndRedirect('/JenisKartuPage')) {
      return;
    }
  }, [checkAndRedirect]);

  const cardList = [
    {
      name: 'Silver',
      image: silverCard,
      info: [
        ['Tarik Tunai', 'Rp 5.000.000/hari'],
        ['Pembelanjaan', 'Rp 10.000.000/hari'],
        ['Transfer antar BNI', 'Rp 50.000.000/hari'],
        ['Transfer antar Bank', 'Rp 10.000.000/hari'],
        ['Biaya admin', 'Rp 5.000/bulan'],
      ],
    },
    {
      name: 'Gold',
      image: goldCard,
      info: [
        ['Tarik Tunai', 'Rp 10.000.000/hari'],
        ['Pembelanjaan', 'Rp 50.000.000/hari'],
        ['Transfer antar BNI', 'Rp 50.000.000/hari'],
        ['Transfer antar Bank', 'Rp 25.000.000/hari'],
        ['Biaya admin', 'Rp 7.500/bulan'],
      ],
    },
    {
      name: 'Platinum',
      image: platinumCard,
      info: [
        ['Tarik Tunai', 'Rp 10.000.000/hari'],
        ['Pembelanjaan', 'Rp 100.000.000/hari'],
        ['Transfer antar BNI', 'Rp 100.000.000/hari'],
        ['Transfer antar Bank', 'Rp 50.000.000/hari'],
        ['Biaya admin', 'Rp 10.000/bulan'],
      ],
    },
    {
      name: 'Batik Air',
      image: batikAirCard,
      info: [
        ['Tarik Tunai', 'Rp 10.000.000/hari'],
        ['Pembelanjaan', 'Rp 100.000.000/hari'],
        ['Transfer antar BNI', 'Rp 100.000.000/hari'],
        ['Transfer antar Bank', 'Rp 50.000.000/hari'],
        ['Biaya admin', 'Rp 10.000/bulan'],
      ],
    },
    {
      name: 'GPN',
      image: gpnCard,
      info: [
        ['Tarik Tunai', 'Rp 10.000.000/hari'],
        ['Pembelanjaan', 'Rp 100.000.000/hari'],
        ['Transfer antar BNI', 'Rp 100.000.000/hari'],
        ['Transfer antar Bank', 'Rp 50.000.000/hari'],
        ['Biaya admin', 'Rp 5.000/bulan'],
      ],
    },
  ];

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [{ breakpoint: 768, settings: { slidesToShow: 1 } }],
  };

  return (
    <div className="jenis-kartu-page">
      <header className="p-3 ps-4">
        <img
  src={logo}
  alt="Wondr Logo"
  style={{ width: '130px', cursor: 'pointer' }}
  onClick={() => navigate('/')}
/>
      </header>

      <div className="content-wrapper d-flex flex-column align-items-center px-4">
        <h2 className="fw-bold text-center mb-3 text-dark">Pilih Jenis Kartu Debit</h2>

        <div className="card-slider-wrapper">
          <div className="card-slider">
            <Slider {...settings}>
              {cardList.map((card, index) => (
                <div key={index} className="px-2">
                  <div className="card-item text-center">
                    <h4 className="card-title fw-bold mb-3">{card.name}</h4>
                    <img src={card.image} alt={card.name} className="card-img mb-3" />
                    <ul className="card-info-list mb-4">
                      {card.info.map(([label, value], i) => (
                        <li key={i} className="info-item d-flex justify-content-between">
                          <span className="info-label">{label}</span>
                          <span className="info-value">{value}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="text-center mt-3">
                      <button className="btn btn-warning rounded-pill fw-semibold px-4 w-75 " onClick={() => {
                        updateForm({ jenisKartu: card.name });
                        completeStep('jenisKartuSelected'); // Tandai jenisKartuSelected selesai
                        navigate('/personalData');
                      }}>
                        Pilih
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}