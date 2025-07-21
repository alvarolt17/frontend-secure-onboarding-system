
export const sanitize = str =>
  str.replace(/['";\-]{1,}/g, '').trim();

// src/utils/validation.js
import * as Yup from 'yup';
export const personalDataSchema = Yup.object().shape({
  birthPlace: Yup.string()
    .required('Tempat lahir wajib diisi')
    .matches(/^[a-zA-Z\s]+$/, 'Hanya huruf/spasi')
    .max(50),
  gender: Yup.string().oneOf(['Laki-laki','Perempuan']).required(),
  religion: Yup.string().oneOf(['Islam','Kristen','Katolik','Hindu','Buddha','Konghucu']).required(),
  maritalStatus: Yup.string().oneOf(['Lajang','Menikah','Cerai']).required()
});
