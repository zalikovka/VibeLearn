import React, { useState } from 'react';

const LoginPage = ({ onLogin, onNavigate }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (isRegister) {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      // TODO: API call for registration
      console.log('Register:', formData);
    } else {
      // TODO: API call for login
      console.log('Login:', formData);
    }

    // Mock login for now
    onLogin({
      username: formData.username,
      email: formData.email || `${formData.username}@example.com`,
      spellCount: 0,
      savedCount: 0
    });
    onNavigate('editor');
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
                />
              </div>
            )}

            {error && <div className="form-error">{error}</div>}

            <button type="submit" className="submit-btn">
              {isRegister ? '✨ Create Account' : '⚡ Enter'}
            </button>
          </form>

          <div className="auth-switch">
            {isRegister ? (
              <p>
                Already a wizard?{' '}
                <button onClick={() => setIsRegister(false)}>Login</button>
              </p>
            ) : (
              <p>
                New to the guild?{' '}
                <button onClick={() => setIsRegister(true)}>Register</button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

