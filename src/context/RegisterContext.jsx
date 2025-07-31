// src/context/RegisterContext.jsx
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useFormData } from './formContext';

const RegisterContext = createContext();

const initialSteps = {
  termsAccepted: false,
  undangAccepted: false,
  nameInputDone: false,
  phoneInputDone: false,
  otpVerified: false,
  emailInputDone: false,
  passwordCreated: false,
  ktpVerified: false,
  tabunganSelected: false,
  jenisKartuSelected: false,
  personalDataDone: false,
  motherNameDone: false,
  addressInputDone: false,
  occupationDone: false,
  waliInfoDone: false,
  waliIdentityDone: false,
  penghasilanDone: false,
  jumlahGajiDone: false,
  tujuanRekeningDone: false,
  summaryDone: false,
};

export const RegisterProvider = ({ children }) => {
  const [stepsCompleted, setStepsCompleted] = useState(() => {
    try {
      const storedSteps = sessionStorage.getItem('wondrRegisterSteps');
      return storedSteps ? JSON.parse(storedSteps) : initialSteps;
    } catch (error) {
      console.error("Failed to load register steps from sessionStorage:", error);
      return initialSteps;
    }
  });

  const navigate = useNavigate();
  const { data: formData } = useFormData();

  useEffect(() => {
    try {
      sessionStorage.setItem('wondrRegisterSteps', JSON.stringify(stepsCompleted));
    } catch (error) {
      console.error("Failed to save register steps to sessionStorage:", error);
    }
  }, [stepsCompleted]);

  const completeStep = useCallback((stepName) => {
    setStepsCompleted(prev => ({ ...prev, [stepName]: true }));
  }, []);

  const resetRegisterFlow = useCallback(() => {
    setStepsCompleted(initialSteps);
    sessionStorage.removeItem('wondrRegisterSteps');
  }, []);

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
      'waliInfoDone',
      'waliIdentityDone',
      'penghasilanDone',
      'jumlahGajiDone',
      'tujuanRekeningDone',
      'summaryDone',
    ];

    const currentStepName = pathMap[currentPath];
    const currentStepIndex = stepsOrder.indexOf(currentStepName);

    if (currentPath === '/terms' || currentPath === '/') return true;
    if (currentStepIndex === -1) return true;

    const occupationsRequiringWali = ['Ibu Rumah Tangga', 'Pelajar/Mahasiswa', 'Tidak Bekerja'];
    const userOccupation = formData.pekerjaan;

    for (let i = 0; i < currentStepIndex; i++) {
      const requiredStep = stepsOrder[i];

      if (
        (requiredStep === 'waliInfoDone' || requiredStep === 'waliIdentityDone') &&
        !occupationsRequiringWali.includes(userOccupation) &&
        (
          currentPath === '/penghasilan' ||
          currentPath === '/jumlahGaji' ||
          currentPath === '/tujuanPembukaanRekening' ||
          currentPath === '/summary'
        )
      ) {
        continue;
      }

      if (!stepsCompleted[requiredStep]) {
        const targetPath = Object.keys(pathMap).find(key => pathMap[key] === requiredStep);
        navigate(targetPath || '/terms');
        return false;
      }
    }

    if (currentPath === '/summary' && !stepsCompleted['tujuanRekeningDone']) {
      navigate('/tujuanPembukaanRekening');
      return false;
    }

    return true;
  }, [stepsCompleted, navigate, formData]);

  return (
    <RegisterContext.Provider value={{ stepsCompleted, completeStep, checkAndRedirect, resetRegisterFlow }}>
      {children}
    </RegisterContext.Provider>
  );
};

// ✅ Tambahkan PropTypes di sini
RegisterProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useRegister = () => {
  return useContext(RegisterContext);
};
