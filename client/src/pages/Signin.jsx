import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext.jsx';

// Sign In page: controlled form -> POST /auth/signin -> JWT saved in AuthContext
export default function Signin() {
  const [values, setValues] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await signin(values);
      // Go back to the page that asked for sign in, or Home
      navigate(location.state?.from || '/', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-wrap">
      <form className="card form auth-card" onSubmit={handleSubmit}>
        <span className="eyebrow">Welcome back</span>
        <h1>Sign In</h1>
        {location.state?.signedUp && (
          <div className="notice" role="status">Account created – please sign in.</div>
        )}
        {error && <div className="alert-error" role="alert">{error}</div>}
        <label>
          Email
          <input type="email" name="email" value={values.email} onChange={handleChange} required autoComplete="email" />
        </label>
        <label>
          Password
          <input type="password" name="password" value={values.password} onChange={handleChange} required autoComplete="current-password" />
        </label>
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Signing in…' : 'Sign In'}
        </button>
        <p className="muted small">No account yet? <Link to="/signup">Sign up</Link></p>
      </form>
    </div>
  );
}
