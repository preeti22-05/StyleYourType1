import React, { useState, useEffect } from 'react';
import { login, fetchProfile, signup } from '../api';
import { Link, useNavigate } from 'react-router-dom';

import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import background from './media/back.mp4';
import './auth.css';

const AuthTest = () => {
  const [authStatus, setAuthStatus] = useState({
    isLoggedIn: false,
    message: '',
    userData: null,
    loading: false,
    error: null
  });
  
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    username: ''
  });
  
  const [isSignup, setIsSignup] = useState(false);

  const handleChange = (e, field) => {
    setCredentials({
      ...credentials,
      [field]: e.target.value
    });
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setAuthStatus(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      if (isSignup) {
        const response = await signup(credentials);
        setAuthStatus({
          isLoggedIn: false,
          message: response.msg || 'Signup successful! Please verify your email.',
          userData: null,
          loading: false,
          error: null
        });
      } else {
        const response = await login({
          email: credentials.email,
          password: credentials.password
        });
        
        setAuthStatus({
          isLoggedIn: true,
          message: response.msg || 'Login successful!',
          userData: null,
          loading: false,
          error: null
        });
        
        fetchUserProfile();
      }
    } catch (error) {
      setAuthStatus({
        isLoggedIn: false,
        message: '',
        userData: null,
        loading: false,
        error: error.msg || 'Authentication failed'
      });
    }
  };

  const fetchUserProfile = async () => {
    try {
      const userData = await fetchProfile();
      setAuthStatus(prev => ({
        ...prev,
        userData,
        isLoggedIn: true,
        error: null
      }));
    } catch (error) {
      setAuthStatus(prev => ({
        ...prev,
        error: error.msg || 'Failed to fetch profile',
        isLoggedIn: false
      }));
    }
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        await fetchUserProfile();
      } catch (error) {
        console.log('Not logged in or session expired');
      }
    };
    
    checkLoginStatus();
  }, []);

  return (
    <div className="auth-container">
      {/* Video Background */}
      <div className="video-container">
        <video autoPlay muted loop className="video-background">
          <source src={background} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Fixed Header */}
      <header className="fixed-header">
        <div className="transparent-menubar">
          <Link to="/" className="brand-logo">StyleYourType</Link>
        </div>
      </header>

      <div className="auth-content">
        <div className="transparent-card auth-card">
          <div className="text-center mb-6">
            <div className="auth-icon-container">
              <i className={`pi ${isSignup ? 'pi-user-plus' : 'pi-user'} auth-icon`}></i>
            </div>
            <h1 className="auth-title">{isSignup ? 'Create Account' : 'Welcome Back'}</h1>
            <p className="auth-subtitle">
              {isSignup ? 'Start your style journey' : 'Sign in to continue'}
            </p>
          </div>

          {/* Status Messages */}
          {authStatus.message && (
            <div className="success-message">
              {authStatus.message}
            </div>
          )}
          
          {authStatus.error && (
            <div className="error-message">
              {authStatus.error}
            </div>
          )}

          {/* Profile Display */}
          {authStatus.isLoggedIn && authStatus.userData && (
            <div className="profile-display">
              <h2>Profile Data</h2>
              <div className="profile-info">
                <p><span>Email:</span> {authStatus.userData.email}</p>
                <p><span>Username:</span> {authStatus.userData.username}</p>
                <p><span>Verified:</span> {authStatus.userData.isVerified ? 'Yes' : 'No'}</p>
              </div>
              <Button 
                label="Refresh Profile" 
                icon="pi pi-refresh"
                className="custom-button secondary-button"
                onClick={fetchUserProfile}
              />
            </div>
          )}

          {/* Auth Form */}
          {!authStatus.isLoggedIn && (
            <form onSubmit={handleAuth} className="auth-form">
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

              {isSignup && (
                <div className="field mb-4">
                  <span className="p-float-label p-input-icon-left w-full">
                    <i className="pi pi-user"></i>
                    <InputText
                      id="username"
                      value={credentials.username}
                      onChange={(e) => handleChange(e, 'username')}
                      className="styled-input"
                      required
                    />
                    <label htmlFor="username">Username</label>
                  </span>
                </div>
              )}

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

              <Button
                type="submit"
                label={authStatus.loading ? 'Processing...' : isSignup ? 'Sign Up' : 'Log In'}
                icon={authStatus.loading ? 'pi pi-spin pi-spinner' : isSignup ? 'pi pi-user-plus' : 'pi pi-sign-in'}
                loading={authStatus.loading}
                className="custom-button w-full mt-4"
              />

              <Divider align="center" className="auth-divider">
                <span className="divider-text">OR</span>
              </Divider>

              <div className="text-center">
                <Button
                  type="button"
                  label={isSignup ? 'Log In Instead' : 'Create Account'}
                  className="p-button-text text-white"
                  onClick={() => setIsSignup(!isSignup)}
                />
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthTest;