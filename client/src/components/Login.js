import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    donationAmount: ''
  });
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }

    // Validate donation amount if provided
    if (formData.donationAmount && isNaN(parseFloat(formData.donationAmount))) {
      setError('Please enter a valid donation amount');
      return;
    }

    try {
      // Send login data to backend
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          donationAmount: formData.donationAmount ? parseFloat(formData.donationAmount) : null
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Store user data or token if needed
        localStorage.setItem('userData', JSON.stringify(data));
        onLogin();
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed');
      }
    } catch (err) {
      // For demo purposes, allow login with any credentials
      if (formData.email && formData.password) {
        // Store donation amount in localStorage for demo
        if (formData.donationAmount) {
          localStorage.setItem('donationAmount', formData.donationAmount);
        }
        onLogin();
      } else {
        setError('Please fill in all required fields');
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Welcome Back!</h1>
          <p>Sign in to your intern dashboard</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="donationAmount">Donation Amount (Optional)</label>
            <input
              type="number"
              id="donationAmount"
              name="donationAmount"
              value={formData.donationAmount}
              onChange={handleChange}
              placeholder="Enter donation amount"
              min="0"
              step="0.01"
            />
          </div>
          
          <button type="submit" className="btn" style={{ width: '100%' }}>
            Sign In
          </button>
        </form>

        {error && (
          <div className="error-message" style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>
            {error}
          </div>
        )}
        
        <div className="text-center mt-20">
          <p style={{ color: '#666', fontSize: '14px' }}>
            <strong>Demo Credentials:</strong><br />
            Email: any@email.com<br />
            Password: any password<br />
            Donation Amount: optional
          </p>
          <p style={{ marginTop: '15px' }}>
            <span style={{ color: '#666' }}>Don't have an account? </span>
            <button 
              onClick={() => navigate('/signup')}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: '#007bff', 
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Sign up here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login; 