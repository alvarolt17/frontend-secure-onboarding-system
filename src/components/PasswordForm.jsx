import React, { useState } from 'react';
import {
  Form,
  Button,
  Alert,
  Spinner,
  ProgressBar,
} from 'react-bootstrap';
import zxcvbn from 'zxcvbn';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Rules.css';
import { Navigate, useNavigate } from 'react-router-dom';

export default function PasswordForm({ onSubmitEndpoint }) {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState({});
  const [strength, setStrength] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate('') ;

  const rules = [
    { label: 'Minimal 8 karakter', test: pwd => pwd.length >= 8 },
    { label: 'Mengandung huruf besar', test: pwd => /[A-Z]/.test(pwd) },
    { label: 'Mengandung huruf kecil', test: pwd => /[a-z]/.test(pwd) },
    { label: 'Mengandung angka', test: pwd => /\d/.test(pwd) },
    { label: 'Mengandung karakter spesial', test: pwd => /[^A-Za-z0-9]/.test(pwd) },
  ];

  const handlePasswordChange = e => {
    const pwd = e.target.value;
    setPassword(pwd);
    const score = zxcvbn(pwd).score;
    setStrength(score);
    if (confirm) validateConfirm(pwd, confirm);
  };

  const handleConfirmChange = e => {
    const conf = e.target.value;
    setConfirm(conf);
    validateConfirm(password, conf);
  };

  const validateConfirm = (pwd, conf) => {
    setErrors(prev => ({
      ...prev,
      confirm: pwd !== conf ? 'Password tidak cocok.' : ''
    }));
  };

  const validateForm = () => {
    const errs = {};
    if (!rules.every(rule => rule.test(password)))
      errs.password = 'Password belum memenuhi semua kriteria.';
    if (password !== confirm)
      errs.confirm = 'Password tidak cocok.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage(null);
    navigate('/KTP');
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const resp = await fetch(onSubmitEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
        credentials: 'include'
      });
      const data = await resp.json();
      if (resp.ok) {
        setMessage({ variant: 'success', text: 'Password berhasil disimpan!' });
      } else {
        setMessage({ variant: 'danger', text: data.error || 'Gagal menyimpan password.' });
      }
    } catch (err) {
      setMessage({ variant: 'danger', text: 'Terjadi kesalahan jaringan.' });
    } finally {
      setSubmitting(false);
    }
  };

  const strengthVariant = ['danger', 'danger', 'warning', 'info', 'success'][strength] || 'danger';
  const strengthLabel = ['Lemah', 'Lemah', 'Sedang', 'Kuat', 'Sangat Kuat'][strength];
  const strengthPercent = (strength / 4) * 100;

  return (
    <Form noValidate onSubmit={handleSubmit} autoComplete="off">
      {message && <Alert variant={message.variant}>{message.text}</Alert>}

      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Ketik password"
          value={password}
          onChange={handlePasswordChange}
          isInvalid={!!errors.password}
          autoComplete="new-password"
        />
        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>

        <ProgressBar
          className="mt-2"
          now={strengthPercent}
          variant={strengthVariant}
          label={strengthLabel}
        />

        <div className="mt-3">
          {rules.map((rule, idx) => {
            const passed = rule.test(password);
            return (
              <div key={idx} className="d-flex align-items-center mb-2">
                <div
                  className={`me-2 rounded-circle ${
                    passed ? 'bg-success' : 'bg-secondary'
                  }`}
                  style={{ width: 12, height: 12 }}
                ></div>
                <small className={passed ? 'text-success' : 'text-muted'}>
                  {rule.label}
                </small>
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
          autoComplete="new-password"
        />
        <Form.Control.Feedback type="invalid">{errors.confirm}</Form.Control.Feedback>
      </Form.Group>

      <div className="d-flex justify-content-center">
        <Button
          type="submit"
          variant="primary"
          className="mt-4 px-4"
          disabled={submitting}
        >
          {submitting ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Menyimpan...
            </>
          ) : (
            'Lanjutkan'
          )}
        </Button>
      </div>
    </Form>
  );
}
