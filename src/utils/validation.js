// src/utils/validation.js

import * as Yup from 'yup';

export const personalDataSchema = Yup.object({
  birthPlace: Yup.string()
    .required('Tempat lahir wajib diisi')
    .matches(/^[a-zA-Z\s]+$/, 'Hanya huruf dan spasi yang diperbolehkan')
    .max(50, 'Maksimum 50 karakter'),
  
  gender: Yup.string()
    .oneOf(['Laki-laki','Perempuan'], 'Pilihan tidak valid')
    .required('Jenis kelamin wajib dipilih'),
  
  religion: Yup.string()
    .oneOf(['Islam','Kristen','Katolik','Hindu','Buddha','Konghucu'], 'Pilihan tidak valid')
    .required('Agama wajib dipilih'),

  maritalStatus: Yup.string()
    .oneOf(['Lajang','Menikah','Cerai'], 'Pilihan tidak valid')
    .required('Status pernikahan wajib dipilih'),
});
