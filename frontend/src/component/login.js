import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Divider } from 'primereact/divider';
import { login } from '../api'; // Import the login API
import './login.css'; // Import the new CSS file
import background from './media/back.mp4';

export function Login() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e, field) => {
    setCredentials(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call the login API
      const response = await login(credentials);
      console.log('Login successful:', response);

      // Handle "Remember Me" functionality (e.g., store token in localStorage)
      if (rememberMe) {
        localStorage.setItem('authToken', response.token); // Store token in localStorage
      } else {
        sessionStorage.setItem('authToken', response.token); // Store token in sessionStorage
      }

      // Redirect to the profile or dashboard page
      navigate('/home');
    } catch (error) {
      console.error('Login failed:', error);
      alert(error.message || 'Login failed. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Video Background */}
      <div className="video-container">
        <video autoPlay muted loop className="video-background">
           <source src={background} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Fixed Header with Transparent Background */}
      <header className="fixed-header">
        <div className="transparent-menubar">
          <Link to="/" className="brand-logo">StyleYourType</Link>
        </div>
      </header>

      <div className="login-content">
        <div className="transparent-card login-card">
          <div className="text-center mb-6">
            <div className="login-icon-container">
              <i className="pi pi-user login-icon"></i>
            </div>
            <h1 className="login-title">Welcome Back</h1>
            <p className="login-subtitle">Please sign in to continue your style journey</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="field mb-4">
              <span className="p-float-label p-input-icon-left w-full">
                <i className="pi pi-envelope"></i>
                <InputText
                  id="email"
                  type="email"
                  value={credentials.email}
                  onChange={(e) => handleChange(e, 'email')}
                  className="styled-input"
                  required
                />
                <label htmlFor="email">Email address</label>
              </span>
            </div>

            <div className="field mb-4">
              <span className="p-float-label p-input-icon-left w-full">
                <i className="pi pi-lock"></i>
                <Password
                  id="password"
                  value={credentials.password}
                  onChange={(e) => handleChange(e, 'password')}
                  toggleMask
                  feedback={false}
                  className="styled-password w-full"
                  inputClassName="styled-input w-full"
                  required
                />
                <label htmlFor="password">Password</label>
              </span>
            </div>

            <div className="login-options">
              <div className="remember-me">
                <Checkbox
                  inputId="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.checked)}
                  className="remember-checkbox"
                />
                <label htmlFor="rememberMe" className="remember-label">
                  Remember me
                </label>
              </div>
              <Link 
                to="/forgotpassword" 
                className="forgot-password"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              label="Sign In"
              icon="pi pi-sign-in"
              loading={loading}
              loadingIcon="pi pi-spin pi-spinner"
              className="custom-button w-full mt-4"
            />

            <Divider align="center" className="login-divider">
              <span className="divider-text">OR</span>
            </Divider>

            <div className="signup-option">
              <span>Don't have an account? </span>
              <Link 
                to="/signup" 
                className="signup-link"
              >
                Sign up now
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;