import React, { useState } from 'react';
import { Form, Button, ProgressBar } from 'react-bootstrap';
import zxcvbn from 'zxcvbn';
import { useFormData } from '../context/formContext';
import { useNavigate } from 'react-router-dom';
import { useRegister } from '../context/RegisterContext'; // Import useRegister

// 🔍 Sanitasi input password: trim dan hapus karakter kontrol
function sanitizePassword(pwd) {
  return pwd
    .trim()
    .split('')
    .filter(char => {
      const code = char.charCodeAt(0);
      return (code >= 32 && code !== 127); // 32 is space, 127 is DEL
    })
    .join('');
}

export default function PasswordForm() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm]   = useState('');
  const [errors, setErrors]     = useState({});
  const [strength, setStrength] = useState(0);

  const { updateForm } = useFormData();
  const navigate = useNavigate();
  const { completeStep } = useRegister(); // Ambil completeStep dari context

  const rules = [
    { label: 'Minimal 8 karakter', test: pwd => pwd.length >= 8 },
    { label: 'Huruf besar (A–Z)', test: pwd => /[A-Z]/.test(pwd) },
    { label: 'Huruf kecil (a–z)', test: pwd => /[a-z]/.test(pwd) },
    { label: 'Angka (0–9)', test: pwd => /\d/.test(pwd) },
    { label: 'Karakter spesial', test: pwd => /[^A-Za-z0-9]/.test(pwd) },
  ];

  const handlePasswordChange = e => {
    const cleaned = sanitizePassword(e.target.value);
    setPassword(cleaned);
    const score = zxcvbn(cleaned).score;
    setStrength(score);
    if (confirm) validateConfirm(cleaned, confirm);
  };

  const handleConfirmChange = e => {
    const cleaned = sanitizePassword(e.target.value);
    setConfirm(cleaned);
    validateConfirm(password, cleaned);
  };

  const validateConfirm = (pwd, conf) => {
    setErrors(prev => ({
      ...prev,
      confirm: pwd !== conf ? 'Password tidak cocok.' : ''
    }));
  };

  // Validasi lengkap sebelum submit
  const validateForm = () => {
    const errs = {};

    // Validasi aturan dasar
    if (!rules.every(r => r.test(password))) {
      errs.password = 'Password belum memenuhi semua kriteria.';
    }
    // Cek kekuatan minimal "Sedang"
    else if (strength < 2) { // Minimal score 2 untuk "Sedang"
      errs.password = 'Password terlalu lemah. Gunakan kombinasi huruf besar, kecil, angka, dan simbol.';
    }

    // Validasi konfirmasi
    if (password !== confirm) {
      errs.confirm = 'Password tidak cocok.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!validateForm()) return;
    updateForm({ password });
    completeStep('passwordCreated'); // Tandai passwordCreated selesai
    navigate('/ktp');
  };

  const variants = ['danger', 'danger', 'warning', 'info', 'success'];
  const labels   = ['Lemah', 'Lemah', 'Sedang', 'Kuat', 'Sangat Kuat'];
  const variant  = variants[strength];
  const label    = labels[strength];
  const percent  = (strength / 4) * 100;

  return (
    <Form noValidate onSubmit={handleSubmit} autoComplete="new-password">
      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Ketik password"
          value={password}
          onChange={handlePasswordChange}
          isInvalid={!!errors.password}
          className="border-brand"
        />
        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>

        <ProgressBar now={percent} variant={variant} label={label} className="mt-2 border-brand" />

        <div className="mt-3">
          {rules.map((rule, i) => {
            const passed = rule.test(password);
            return (
              <div key={i} className="d-flex align-items-center mb-2">
                <div
                  className={`me-2 rounded-circle ${passed ? 'bg-success' : 'bg-secondary'}`}
                  style={{ width: 12, height: 12 }}
                />
                <small className={passed ? 'text-success' : 'text-muted'}>{rule.label}</small>
              </div>
            );
          })}
        </div>
      </Form.Group>

      <Form.Group controlId="confirm" className="mt-3">
        <Form.Label>Konfirmasi Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Ketik ulang password"
          value={confirm}
          onChange={handleConfirmChange}
          isInvalid={!!errors.confirm}
          className="border-brand"
        />
        <Form.Control.Feedback type="invalid">{errors.confirm}</Form.Control.Feedback>
      </Form.Group>

      <div className="d-flex justify-content-center">
        <Button type="submit" className="btn-wondr mt-4 px-4">
          Lanjutkan
        </Button>
      </div>
    </Form>
  );
}