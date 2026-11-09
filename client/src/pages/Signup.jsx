import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../api/api.js';

const emptyValues = { name: '', email: '', password: '', confirmPassword: '' };

// Sign Up page: controlled form -> POST /api/users (new accounts always get the "user" role)
export default function Signup() {
  const [values, setValues] = useState(emptyValues);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    if (values.password.length < 6) return setError('Password must be at least 6 characters.');
    if (values.password !== values.confirmPassword) return setError('Passwords do not match.');

    setIsSubmitting(true);
    try {
      await signup({ name: values.name, email: values.email, password: values.password });
      navigate('/signin', { state: { signedUp: true } });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-wrap">
      <form className="card form auth-card" onSubmit={handleSubmit}>
        <span className="eyebrow">Join</span>
        <h1>Sign Up</h1>
        {error && <div className="alert-error" role="alert">{error}</div>}
        <label>
          Name
          <input name="name" value={values.name} onChange={handleChange} required autoComplete="name" />
        </label>
        <label>
          Email
          <input type="email" name="email" value={values.email} onChange={handleChange} required autoComplete="email" />
        </label>
        <label>
          Password
          <input type="password" name="password" value={values.password} onChange={handleChange} required minLength={6} autoComplete="new-password" />
        </label>
        <label>
          Confirm Password
          <input type="password" name="confirmPassword" value={values.confirmPassword} onChange={handleChange} required autoComplete="new-password" />
        </label>
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Creating account…' : 'Sign Up'}
        </button>
        <p className="muted small">Already have an account? <Link to="/signin">Sign in</Link></p>
      </form>
    </div>
  );
}
