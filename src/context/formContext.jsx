import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // ✅ Tambahkan ini

const FormDataContext = createContext();

const initialState = {
  namaLengkap: '',
  nik: '',
  namaIbuKandung: '',
  nomorTelepon: '',
  email: '',
  password: '',
  tipeAkun: '',
  tempatLahir: '',
  tanggalLahir: '',
  jenisKelamin: '',
  agama: '',
  statusPernikahan: '',
  pekerjaan: '',
  sumberPenghasilan: '',
  rentangGaji: '',
  tujuanPembuatanRekening: '',
  kodeRekening: '',
  namaAlamat: '',
  provinsi: '',
  kota: '',
  kecamatan: '',
  kelurahan: '',
  kodePos: '',
  jenisWali: '',
  namaLengkapWali: '',
  pekerjaanWali: '',
  alamatWali: '',
  nomorTeleponWali: '',
  umur: ''
};

export function FormProvider({ children }) {
  const [data, setData] = useState(initialState);

  const updateForm = (newValues) => {
    setData(prev => ({ ...prev, ...newValues }));
  };

  useEffect(() => {
    console.log('🔁 Context data sekarang:', data);
  }, [data]);

  return (
    <FormDataContext.Provider value={{ data, updateForm }}>
      {children}
    </FormDataContext.Provider>
  );
}

// ✅ Tambahkan validasi props
FormProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useFormData() {
  const ctx = useContext(FormDataContext);
  if (!ctx) throw new Error('useFormData must be used within FormProvider');
  return ctx;
}
