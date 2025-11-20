import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError('Please enter username and password');
      return;
    }

    setLoading(true);

    try {
      // Call backend login endpoint
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: username,
          password: password
        })
      });

      const data = await response.json();

      if (data.success) {
        // Store in localStorage
        localStorage.setItem('admin-user', JSON.stringify({
          email: username,
          id: data.userId || Date.now()
        }));
        localStorage.setItem('auth-token', data.token || 'admin-token-' + Date.now());
        
        setError('');
        setLoading(false);
        navigate('/');
      } else {
        setError(data.message || 'Invalid credentials');
        setLoading(false);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Connection error. Try demo: admin / admin123');
      
      // Fallback demo login
      if (username === 'admin' && password === 'admin123') {
        const user = { username: 'admin' };
        localStorage.setItem('admin-user', JSON.stringify(user));
        setError('');
        setLoading(false);
        navigate('/');
      } else {
        setLoading(false);
      }
    }
  };

  return (
    <div className="admin-login">
      <div className="login-container">
        <div className="login-box">
          <div className="login-header">
            <div className="login-icon">🔐</div>
            <h2>Admin Login</h2>
            <p className="login-subtitle">Shri Prati Ramraj Cloth Shop</p>
          </div>

          <form onSubmit={handleSubmit}>
            {error && <div className="login-error">{error}</div>}

            <div className="form-group">
              <label htmlFor="username">
                <span className="label-icon">👤</span>
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">
                <span className="label-icon">🔑</span>
                Password
              </label>
              <div className="password-input-wrapper">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? '⏳ Signing In...' : '✓ Sign In'}
            </button>
          </form>

          <p className="signup-link">
            Don't have an account? <a href="/signup">Sign up here</a>
          </p>

          <div className="demo-credentials">
            <p className="demo-title">Demo Credentials:</p>
            <p>Username: <strong>admin</strong></p>
            <p>Password: <strong>admin123</strong></p>
          </div>
        </div>

        <div className="login-visual">
          <div className="visual-content">
            <div className="visual-icon">📦</div>
            <h3>Welcome Back!</h3>
            <p>Manage your shop inventory with ease</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;