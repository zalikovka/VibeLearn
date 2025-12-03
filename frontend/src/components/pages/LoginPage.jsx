import React, { useState } from 'react';
import { authApi } from '../../services/api';

const LoginPage = ({ onLogin, onNavigate }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegister) {
        // Validation
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }

        // Register API call
        const response = await authApi.register(
          formData.username,
          formData.email,
          formData.password,
          formData.confirmPassword
        );

        // Auto-login after registration
        const loginResponse = await authApi.login(formData.username, formData.password);
        onLogin(loginResponse.user);
        onNavigate('editor');
      } else {
        // Login API call
        const response = await authApi.login(formData.username, formData.password);
        onLogin(response.user);
        onNavigate('editor');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="page-container">
      <div className="page-content login-page">
        <div className="auth-form-card">
          <div className="auth-header">
            <span className="auth-icon">🔮</span>
            <h2>{isRegister ? 'Join the Guild' : 'Welcome Back'}</h2>
            <p>{isRegister ? 'Create your wizard account' : 'Enter the magical realm'}</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your wizard name"
                required
                disabled={loading}
              />
            </div>

            {isRegister && (
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  disabled={loading}
                />
              </div>
            )}

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Your secret spell"
                required
                disabled={loading}
              />
            </div>

            {isRegister && (
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat the spell"
                  required
                  disabled={loading}
                />
              </div>
            )}

            {error && <div className="form-error">{error}</div>}

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? '⏳ Please wait...' : (isRegister ? '✨ Create Account' : '⚡ Enter')}
            </button>
          </form>

          <div className="auth-switch">
            {isRegister ? (
              <p>
                Already a wizard?{' '}
                <button onClick={() => setIsRegister(false)} disabled={loading}>Login</button>
              </p>
            ) : (
              <p>
                New to the guild?{' '}
                <button onClick={() => setIsRegister(true)} disabled={loading}>Register</button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
