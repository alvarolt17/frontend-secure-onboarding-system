// src/context/RegisterContext.jsx
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormData } from './formContext'; // Import useFormData to access form data

const RegisterContext = createContext();

const initialSteps = {
  termsAccepted: false,
  undangAccepted: false,
  nameInputDone: false,
  phoneInputDone: false,
  otpVerified: false,
  emailInputDone: false,
  passwordCreated: false,
  ktpVerified: false, // Asumsi untuk EKTPVerificationPage
  tabunganSelected: false, // Asumsi untuk JenisTabunganPage
  jenisKartuSelected: false, // Asumsi untuk JenisKartuPage
  personalDataDone: false, // Asumsi untuk PersonalDataForm
  motherNameDone: false, // Asumsi untuk MotherNamePage
  addressInputDone: false, // Asumsi untuk AddressInputPage
  occupationDone: false, // Asumsi untuk OccupationPage
  waliInfoDone: false, // Asumsi untuk waliPage
  waliIdentityDone: false, // Asumsi untuk waliIdentityPage
  penghasilanDone: false, // Asumsi untuk PenghasilanPage
  jumlahGajiDone: false, // Asumsi untuk JumlahGaji
  tujuanRekeningDone: false, // Asumsi untuk tujuanPembukaanRekening
  summaryDone: false, // Pastikan ini ada dan diinisialisasi
};

export const RegisterProvider = ({ children }) => {
  // Coba memuat dari sessionStorage saat inisialisasi
  const [stepsCompleted, setStepsCompleted] = useState(() => {
    try {
      // Menggunakan key yang lebih spesifik
      const storedSteps = sessionStorage.getItem('wondrRegisterSteps');
      return storedSteps ? JSON.parse(storedSteps) : initialSteps;
    } catch (error) {
      console.error("Failed to load register steps from sessionStorage:", error);
      return initialSteps;
    }
  });
  const navigate = useNavigate();
  const { data: formData } = useFormData(); // Get form data from context

  // Simpan state ke sessionStorage setiap kali stepsCompleted berubah
  useEffect(() => {
    try {
      sessionStorage.setItem('wondrRegisterSteps', JSON.stringify(stepsCompleted));
    } catch (error) {
      console.error("Failed to save register steps to sessionStorage:", error);
    }
  }, [stepsCompleted]);

  // Fungsi untuk menandai langkah selesai
  const completeStep = useCallback((stepName) => {
    setStepsCompleted(prev => ({ ...prev, [stepName]: true }));
  }, []);

  // Fungsi untuk mereset semua langkah (opsional, bisa dipanggil setelah registrasi selesai atau logout)
  const resetRegisterFlow = useCallback(() => {
    setStepsCompleted(initialSteps);
    sessionStorage.removeItem('wondrRegisterSteps'); // Hapus dari session storage juga
  }, []);

  // Fungsi untuk memeriksa dan mengarahkan
  const checkAndRedirect = useCallback((currentPath) => {
    const pathMap = {
      '/terms': 'termsAccepted',
      '/undang': 'undangAccepted',
      '/name': 'nameInputDone',
      '/phone': 'phoneInputDone',
      '/otp': 'otpVerified',
      '/email': 'emailInputDone',
      '/password': 'passwordCreated',
      '/ktp': 'ktpVerified',
      '/tabungan': 'tabunganSelected',
      '/JenisKartuPage': 'jenisKartuSelected',
      '/personalData': 'personalDataDone',
      '/namaIbu': 'motherNameDone',
      '/alamat': 'addressInputDone',
      '/pekerjaan': 'occupationDone',
      '/wali': 'waliInfoDone',
      '/identitasWali': 'waliIdentityDone',
      '/penghasilan': 'penghasilanDone',
      '/jumlahGaji': 'jumlahGajiDone',
      '/tujuanPembukaanRekening': 'tujuanRekeningDone',
      '/summary': 'summaryDone',
    };

    const stepsOrder = [
      'termsAccepted',
      'undangAccepted',
      'nameInputDone',
      'phoneInputDone',
      'otpVerified',
      'emailInputDone',
      'passwordCreated',
      'ktpVerified',
      'tabunganSelected',
      'jenisKartuSelected',
      'personalDataDone',
      'motherNameDone',
      'addressInputDone',
      'occupationDone',
      'waliInfoDone', // Tetap di sini, tapi akan dilewati validasinya secara kondisional
      'waliIdentityDone', // Tetap di sini, tapi akan dilewati validasinya secara kondisional
      'penghasilanDone',
      'jumlahGajiDone',
      'tujuanRekeningDone',
      'summaryDone',
    ];

    const currentStepName = pathMap[currentPath];
    const currentStepIndex = stepsOrder.indexOf(currentStepName);

    // For initial pages, no redirect
    if (currentPath === '/terms' || currentPath === '/') {
      return true;
    }

    // If path is not in pathMap, allow access (e.g., dashboard, login pages)
    if (currentStepIndex === -1) {
      return true;
    }

    // Define occupations that REQUIRE wali steps (based on OccupationPage.jsx logic)
    const occupationsRequiringWali = ['Ibu Rumah Tangga', 'Pelajar/Mahasiswa', 'Tidak Bekerja'];
    const userOccupation = formData.pekerjaan; // Get the user's selected occupation

    // Check if all preceding steps are completed
    for (let i = 0; i < currentStepIndex; i++) {
      const requiredStep = stepsOrder[i];

      // Conditional check for wali steps:
      // If the required step is a wali step, AND the user's occupation DOES NOT require wali steps,
      // AND the current path is one of the paths that would be accessed AFTER skipping wali (e.g., /penghasilan, /jumlahGaji, etc.),
      // then we can skip validating the wali step.
      if (
        (requiredStep === 'waliInfoDone' || requiredStep === 'waliIdentityDone') &&
        !occupationsRequiringWali.includes(userOccupation) && // User's occupation DOES NOT require wali
        (
          currentPath === '/penghasilan' ||
          currentPath === '/jumlahGaji' ||
          currentPath === '/tujuanPembukaanRekening' ||
          currentPath === '/summary'
        )
      ) {
        console.log(`Skipping check for ${requiredStep} because occupation '${userOccupation}' does not require wali.`);
        continue; // Skip this step's validation
      }

      if (!stepsCompleted[requiredStep]) {
        const targetPath = Object.keys(pathMap).find(key => pathMap[key] === requiredStep);
        console.warn(`Redirecting from ${currentPath} to ${targetPath || '/terms'} because ${requiredStep} is not completed.`);
        navigate(targetPath || '/terms');
        return false;
      }
    }

    // Special check for /summary page: ensure the last step before it is done
    if (currentPath === '/summary' && !stepsCompleted['tujuanRekeningDone']) {
        console.warn(`Redirecting from ${currentPath} to /tujuanPembukaanRekening because tujuanRekeningDone is not completed.`);
        navigate('/tujuanPembukaanRekening');
        return false;
    }

    return true; // All conditions met, allow access
  }, [stepsCompleted, navigate, formData]); // Add formData to dependencies

  return (
    <RegisterContext.Provider value={{ stepsCompleted, completeStep, checkAndRedirect, resetRegisterFlow }}>
      {children}
    </RegisterContext.Provider>
  );
};

export const useRegister = () => {
  return useContext(RegisterContext);
};
