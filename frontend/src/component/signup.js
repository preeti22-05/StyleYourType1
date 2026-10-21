import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { signup, verifyOTP } from '../api';
import './login.css'; // Using the same CSS as login page
import background from './media/back.mp4';

export function Signup() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    otp: '',
  });
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e, field) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await signup({
        email: formData.email,
        username: formData.username,
        password: formData.password,
      });
      console.log('Signup successful:', response);
      setToken(response.token);
      setStep(2);
    } catch (error) {
      console.error('Signup failed:', error);
      alert(error.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await verifyOTP({
        otp: formData.otp,
        token: token,
      });
      console.log('OTP verification successful:', response);
      alert('Email verified successfully!');
      navigate('/login');
    } catch (error) {
      console.error('OTP verification failed:', error);
      alert(error.message || 'OTP verification failed. Please try again.');
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
              <i className={`pi ${step === 1 ? 'pi-user-plus' : 'pi-key'} login-icon`}></i>
            </div>
            <h1 className="login-title">{step === 1 ? 'Create Account' : 'Verify Email'}</h1>
            <p className="login-subtitle">
              {step === 1 ? 'Sign up to begin your style journey' : 'Enter the OTP sent to your email'}
            </p>
          </div>

          {step === 1 ? (
            <form onSubmit={handleSignup} className="login-form">
              <div className="field mb-4">
                <span className="p-float-label p-input-icon-left w-full">
                  <i className="pi pi-envelope"></i>
                  <InputText
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange(e, 'email')}
                    className="styled-input"
                    required
                  />
                  <label htmlFor="email">Email address</label>
                </span>
              </div>

              <div className="field mb-4">
                <span className="p-float-label p-input-icon-left w-full">
                  <i className="pi pi-user"></i>
                  <InputText
                    id="username"
                    value={formData.username}
                    onChange={(e) => handleChange(e, 'username')}
                    className="styled-input"
                    required
                  />
                  <label htmlFor="username">Username</label>
                </span>
              </div>

              <div className="field mb-4">
                <span className="p-float-label p-input-icon-left w-full">
                  <i className="pi pi-lock"></i>
                  <Password
                    id="password"
                    value={formData.password}
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

              <Button
                type="submit"
                label="Sign Up"
                icon="pi pi-user-plus"
                loading={loading}
                loadingIcon="pi pi-spin pi-spinner"
                className="custom-button w-full mt-4"
              />

              <Divider align="center" className="login-divider">
                <span className="divider-text">OR</span>
              </Divider>

              <div className="signup-option">
                <span>Already have an account? </span>
                <Link 
                  to="/login" 
                  className="signup-link"
                >
                  Sign in
                </Link>
              </div>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="login-form">
              <div className="field mb-4">
                <span className="p-float-label p-input-icon-left w-full">
                  <i className="pi pi-key"></i>
                  <InputText
                    id="otp"
                    value={formData.otp}
                    onChange={(e) => handleChange(e, 'otp')}
                    className="styled-input"
                    required
                  />
                  <label htmlFor="otp">Enter OTP</label>
                </span>
              </div>

              <Button
                type="submit"
                label="Verify OTP"
                icon="pi pi-check"
                loading={loading}
                loadingIcon="pi pi-spin pi-spinner"
                className="custom-button w-full mt-4"
              />

              <div className="text-center mt-3">
                <Button
                  type="button"
                  label="Resend OTP"
                  link
                  className="p-button-text text-white"
                  onClick={() => {
                    console.log('Resend OTP clicked');
                  }}
                />
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Signup;