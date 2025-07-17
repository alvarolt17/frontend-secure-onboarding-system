// App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { FormProvider } from './context/formContext';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Home from "./pages/Home";
import NameInputPage from "./pages/NameInputPage";
import PhoneInputPage from "./pages/PhoneInputPage";
import EmailInputPage from "./pages/EmailInputPage";
import CreatePasswordPage from "./pages/CreatePasswordPage";
import EKTPVerificationPage from "./pages/EKTPVerificationPage";
import JenisTabunganPage from "./pages/JenisTabunganPage";
import TermsCondition from "./pages/TermsCondition";
import Undang from "./pages/Undang";
import WondrLanding from "./pages/WondrLanding";
import PersonalDataForm from "./pages/PersonalDataForm";
import MotherNamePage from "./pages/MotherNamePage";
import AddressInputPage from "./pages/AddressInputPage";
import OccupationPage from "./pages/OccupationPage";
import WaliPage from "./pages/WaliPage";
import PenghasilanPage from "./pages/PenghasilanPage";
import JumlahGaji from "./pages/JumlahGaji";
import TujuanPembukaanRekening from "./pages/TujuanPembukaanRekening";
import JenisKartuPage from "./pages/JenisKartuPage";
import WaliIdentityPage from './pages/waliIdentityPage';

function App() {
  return (
    <FormProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/name" element={<NameInputPage />} />
        <Route path="/phone" element={<PhoneInputPage />} />
        <Route path="/email" element={<EmailInputPage />} />
        <Route path="/password" element={<CreatePasswordPage />} />
        <Route path="/ktp" element={<EKTPVerificationPage />} />
        <Route path="/tabungan" element={<JenisTabunganPage />} />
        <Route path="/terms" element={<TermsCondition />} />
        <Route path="/undang" element={<Undang />} />
        <Route path="/wondrLanding" element={<WondrLanding />} />
        <Route path="/personalData" element={<PersonalDataForm />} />
        <Route path="/namaIbu" element={<MotherNamePage />} />
        <Route path="/alamat" element={<AddressInputPage />} />
        <Route path="/pekerjaan" element={<OccupationPage />} />
        <Route path="/wali" element={<WaliPage />} />
        <Route path="/penghasilan" element={<PenghasilanPage />} />
        <Route path="/jumlahGaji" element={<JumlahGaji />} />
        <Route path="/tujuanPembukaanRekening" element={<TujuanPembukaanRekening />} />
        <Route path="/jenisKartuPage" element={<JenisKartuPage />} />
        <Route path="/IdentitasWali" element={<WaliIdentityPage/>} />
      </Routes>
    </FormProvider>
  );
}

export default App;
