import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { resetPassword } from '../api';
import background from './media/back.mp4';
import './login.css';

export function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const response = await resetPassword({ token, newPassword });
      console.log('Password reset successful:', response);
      setMessage('Password reset successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      console.error('Error resetting password:', error);
      setMessage(error.message || 'Error resetting password. Please try again.');
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
              <i className="pi pi-shield login-icon"></i>
            </div>
            <h1 className="login-title">Reset Password</h1>
            <p className="login-subtitle">Enter your new password</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="field mb-4">
              <span className="p-float-label w-full">
                <Password
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  toggleMask
                  className="styled-password w-full"
                  inputClassName="styled-input w-full"
                  required
                />
                <label htmlFor="newPassword">New Password</label>
              </span>
            </div>

            <div className="field mb-4">
              <span className="p-float-label w-full">
                <Password
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  toggleMask
                  feedback={false}
                  className="styled-password w-full"
                  inputClassName="styled-input w-full"
                  required
                />
                <label htmlFor="confirmPassword">Confirm Password</label>
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
              label="Reset Password"
              icon="pi pi-check"
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

export default ResetPassword;