import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { forgotPassword } from '../api';
import background from './media/back.mp4';
import './login.css';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await forgotPassword(email);
      console.log('Reset link sent:', response);
      setMessage('Reset link has been sent to your email address.');
    } catch (error) {
      console.error('Error sending reset link:', error);
      setMessage(error.message || 'Error sending reset link. Please try again.');
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
              <i className="pi pi-lock login-icon"></i>
            </div>
            <h1 className="login-title">Forgot Password</h1>
            <p className="login-subtitle">Enter your email to reset your password</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="field mb-4">
              <span className="p-float-label p-input-icon-left w-full">
                <i className="pi pi-envelope"></i>
                <InputText
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="styled-input"
                  required
                />
                <label htmlFor="email">Email address</label>
              </span>
            </div>

            {message && (
              <div className={`message-container ${
                message.includes('Error') ? 'error-message' : 'success-message'
              }`}>
                {message}
              </div>
            )}

            <Button
              type="submit"
              label="Send Reset Link"
              icon="pi pi-send"
              loading={loading}
              loadingIcon="pi pi-spin pi-spinner"
              className="custom-button w-full mt-4"
            />

            <Divider align="center" className="login-divider">
              <span className="divider-text">OR</span>
            </Divider>

            <div className="text-center">
              <Link 
                to="/login" 
                className="text-primary font-medium no-underline hover:underline"
              >
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;